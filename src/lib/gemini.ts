import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Initializes the Google Generative AI SDK.
 * SECURITY: Uses GEMINI_API_KEY for strict server-side secrets,
 * falling back to NEXT_PUBLIC_ for backward compatibility with current deployment.
 */
const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

/**
 * Generates the prompt for the AI to analyze and compare courses.
 * LearnSpace 2.0: Deep Pedagogical Evaluation Prompt
 * @param content - The extracted text content from the course URLs.
 * @returns The formatted prompt string.
 */
export const analyzeCoursePrompt = (content: string) => `
You are an expert Educational Data Analyst and Career Counselor. 
Analyze the following course information extracted from live website scraping and provide a structured JSON response.
Evaluate them strictly on pedagogy, syllabus depth, pricing value, and pacing.

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
      "verdict": "Brief evaluation of quality",
      "vibeBadges": ["Tag1", "Tag2", "Tag3"],
      "outdatedWarning": {
        "isOutdated": false,
        "message": "Warning message if reviews complain about outdated content, or empty string"
      },
      "uniqueTopics": ["Topic 1 that ONLY this course teaches", "Topic 2"],
      "timeToValue": "Description of when the first practical project is built or key milestone is reached"
    }
  ],
  "comparisonSummary": "If multiple courses, summarize which is best for what purpose. If one course, give a final recommendation.",
  "overallWinnerIndex": 0
}
`;
