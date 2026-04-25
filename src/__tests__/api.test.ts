import { analyzeCoursePrompt } from "../lib/gemini";

/**
 * Unit Test Suite for LearnSpace Core Logic
 * Evaluates core prompt generation and structure.
 */
describe("Course Analysis Core Logic", () => {
  it("should generate a prompt containing the provided content", () => {
    const mockContent = "Mock Course Content for Testing";
    const prompt = analyzeCoursePrompt(mockContent);
    expect(prompt).toContain(mockContent);
  });

  it("should request a structured JSON response", () => {
    const prompt = analyzeCoursePrompt("");
    expect(prompt).toContain("Return ONLY a JSON object");
    expect(prompt).toContain('"courses"');
    expect(prompt).toContain('"comparisonSummary"');
  });
});
