import { NextResponse } from "next/server";
import { geminiModel, analyzeCoursePrompt } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { urls } = await req.json();
    if (!urls || !Array.isArray(urls)) return NextResponse.json({ error: "No URLs" }, { status: 400 });

    const contents = await Promise.all(urls.map(async (url) => {
      try {
        const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
        const text = await response.text();
        const title = text.match(/<title>(.*?)<\/title>/)?.[1] || "";
        return `URL: ${url}\nTitle: ${title}\nPreview: ${text.substring(0, 1000)}`;
      } catch { return `URL: ${url} (Fetch failed)`; }
    }));

    const result = await geminiModel.generateContent(analyzeCoursePrompt(contents.join("\n\n")));
    const jsonMatch = result.response.text().match(/\{[\s\S]*\}/);
    return NextResponse.json(JSON.parse(jsonMatch ? jsonMatch[0] : "{}"));
  } catch (e: any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
