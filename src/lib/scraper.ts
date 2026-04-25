import axios from "axios";
import * as cheerio from "cheerio";

/**
 * Live Web Scraping Engine
 * Fetches HTML from course URLs and extracts plain text content for AI analysis.
 */
export async function scrapeCourseData(url: string): Promise<string> {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      timeout: 10000, // 10 seconds timeout
    });

    const $ = cheerio.load(data);
    
    // Remove unnecessary elements to save tokens
    $("script, style, nav, footer, img, svg, iframe").remove();
    
    // Extract remaining text, format it nicely
    let textContent = $("body").text().replace(/\s+/g, " ").trim();
    
    // Truncate to reasonable length to avoid exceeding LLM token limits (e.g., 20,000 chars)
    if (textContent.length > 20000) {
      textContent = textContent.substring(0, 20000) + "... [CONTENT TRUNCATED]";
    }

    return `Source URL: ${url}\n\nScraped Content:\n${textContent}`;
  } catch (error: any) {
    console.error(`Failed to scrape ${url}:`, error.message);
    // Fallback: If scraping fails, just return the URL so Gemini can rely on its internal knowledge base
    return `Failed to fetch live content for ${url}. Error: ${error.message}. Please rely on your internal knowledge base to evaluate this course URL: ${url}`;
  }
}
