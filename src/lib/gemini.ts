import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Initializes the Google Generative AI SDK.
 * SECURITY: Uses GEMINI_API_KEY for strict server-side secrets,
 * falling back to NEXT_PUBLIC_ for backward compatibility with current deployment.
 */
const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-pro",
});

/**
 * Generates the prompt for the AI to analyze and compare courses.
 * @param content - The extracted text content from the course URLs.
 * @returns The formatted prompt string.
 */
export const analyzeCoursePrompt = (content: string) => `
Analyze the following course information extracted from a URL and provide a structured JSON response.
If multiple courses are provided, compare them.

Content:
${content}

Return ONLY a JSON object with the following structure:
{
  "courses": [
    {
      "title": "Course Title",
      "instructor": "Instructor Name",
      "price": "Price or 'Free'",
      "rating": "Rating (e.g. 4.5/5)",
      "duration": "Total Duration",
      "level": "Beginner/Intermediate/Advanced",
      "skills": ["Skill 1", "Skill 2"],
      "pros": ["Pro 1", "Pro 2"],
      "cons": ["Con 1", "Con 2"],
      "verdict": "Brief evaluation of quality"
    }
  ],
  "comparisonSummary": "If multiple courses, summarize which is best for what purpose. If one course, give a final recommendation.",
  "overallWinnerIndex": 0
}
`;
