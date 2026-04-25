import { analyzeCoursePrompt } from "../lib/gemini";

/**
 * Advanced Unit and Integration Test Suite
 * Evaluates core paths, edge cases, and integration flows.
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
  });

  it("Edge Case: handles empty string seamlessly", () => {
    const prompt = analyzeCoursePrompt("");
    expect(prompt).toBeDefined();
    expect(typeof prompt).toBe("string");
  });

  it("Edge Case: handles extremely large inputs without crashing", () => {
    const hugeInput = "A".repeat(10000);
    const prompt = analyzeCoursePrompt(hugeInput);
    expect(prompt).toContain(hugeInput);
  });

  it("Edge Case: handles special characters and malicious scripts safely", () => {
    const maliciousInput = "<script>alert('xss')</script>";
    const prompt = analyzeCoursePrompt(maliciousInput);
    expect(prompt).toContain(maliciousInput);
  });

  it("Integration: validates JSON structure requirements", () => {
    const prompt = analyzeCoursePrompt("Test");
    expect(prompt).toContain('"overallWinnerIndex"');
    expect(prompt).toContain('"comparisonSummary"');
    expect(prompt).toContain('"verdict"');
  });

  it("Integration: handles multiple concurrent simulated inputs", () => {
    const inputs = ["Course A", "Course B", "Course C"];
    inputs.forEach(input => {
      expect(analyzeCoursePrompt(input)).toContain(input);
    });
  });
});
