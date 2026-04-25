"use client";
import { useState } from "react";
import { Search, Loader2, Sparkles } from "lucide-react";
import ComparisonCard, { CourseData } from "@/components/ComparisonCard";

interface AIResult {
  courses: CourseData[];
  comparisonSummary: string;
  overallWinnerIndex: number;
}

/**
 * Main dashboard component with accessibility considerations and strict typing.
 */
export default function Home() {
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!urls.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    const urlList = urls.split(/[\s,]+/).filter(u => u.startsWith("http"));
    if (urlList.length === 0) {
      setError("Please enter valid URLs starting with http:// or https://.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: urlList }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data as AIResult);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to analyze.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900 tracking-tight">LearnSpace</h1>
        <p className="text-gray-500 text-lg">Compare courses instantly with AI intelligence.</p>
      </header>

      <section className="max-w-2xl mx-auto mb-16" aria-label="Course Input Area">
        <div className="flex flex-col md:flex-row gap-3 p-2 bg-gray-50 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500">
          <label htmlFor="courseUrls" className="sr-only">Paste course URLs to compare</label>
          <textarea
            id="courseUrls"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            placeholder="Paste multiple course URLs here (one per line)..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 px-4 py-3 min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAnalyze();
              }
            }}
            aria-invalid={!!error}
          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="btn-primary disabled:opacity-50 flex items-center justify-center gap-2 transition-opacity"
            aria-label={loading ? "Analyzing courses, please wait" : "Analyze courses"}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <><Search className="w-4 h-4" aria-hidden="true" /> Analyze</>}
          </button>
        </div>
        
        {/* Accessibility: aria-live ensures screen readers announce errors/status */}
        <div aria-live="polite" className="mt-4 text-center h-6">
          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
          {loading && <p className="text-indigo-600 text-sm font-medium">AI is reading the course syllabus...</p>}
        </div>
      </section>

      {result && (
        <section aria-label="Analysis Results" className="space-y-12 animate-in fade-in duration-500">
          <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100 shadow-sm">
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" aria-hidden="true" /> AI Comparison Verdict
            </h2>
            <p className="text-indigo-900 text-lg font-medium leading-relaxed italic">"{result.comparisonSummary}"</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.courses.map((course, idx) => (
              <ComparisonCard key={idx} course={course} isWinner={idx === result.overallWinnerIndex} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
