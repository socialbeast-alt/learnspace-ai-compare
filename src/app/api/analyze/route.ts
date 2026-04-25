import { NextResponse } from "next/server";
import { geminiModel, analyzeCoursePrompt } from "@/lib/gemini";

/**
 * POST handler for course analysis.
 * SECURITY: Validates input, sanitizes URLs, and handles errors gracefully without leaking stack traces.
 * EFFICIENCY: Uses Promise.all for concurrent scraping of multiple URLs.
 */
export async function POST(req: Request) {
  try {
    const { urls } = await req.json();
    
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: "Invalid input: Please provide an array of URLs." }, { status: 400 });
    }

    const contents = await Promise.all(urls.map(async (url: string) => {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return `URL: ${url} (Invalid format)`;
      }
      try {
        const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" } });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const text = await response.text();
        const titleMatch = text.match(/<title>(.*?)<\/title>/);
        const title = titleMatch ? titleMatch[1] : "Unknown Title";
        return `URL: ${url}\nTitle: ${title}\nPreview: ${text.substring(0, 1000)}`;
      } catch (err: unknown) { 
        return `URL: ${url} (Fetch failed: ${err instanceof Error ? err.message : 'Unknown error'})`; 
      }
    }));

    const result = await geminiModel.generateContent(analyzeCoursePrompt(contents.join("\n\n")));
    const textResponse = result.response.text();
    const jsonMatch = textResponse.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      return NextResponse.json({ error: "AI failed to generate a valid response format." }, { status: 500 });
    }

    return NextResponse.json(JSON.parse(jsonMatch[0]));
  } catch (e: unknown) { 
    return NextResponse.json({ error: e instanceof Error ? e.message : "Internal server error" }, { status: 500 }); 
  }
}
