"use client";
import { useState } from "react";
import { Search, Loader2, Sparkles, LogIn, GitMerge } from "lucide-react";
import ComparisonCard, { CourseData } from "@/components/ComparisonCard";

interface AIResult {
  courses: CourseData[];
  comparisonSummary: string;
  overallWinnerIndex: number;
}

/**
 * Main dashboard component with LearnSpace 2.0 Auth and Matrix features.
 */
export default function Home() {
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResult | null>(null);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    // In production, this would trigger Firebase GoogleAuthProvider
    alert("Firebase Auth Provider would trigger here. Logging you in!");
    setIsAuthenticated(true);
  };

  const handleAnalyze = async () => {
    if (!isAuthenticated) {
      setError("Please sign in to run a live AI comparison.");
      return;
    }
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
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">LearnSpace 2.0</h1>
          <p className="text-gray-500 text-lg">Compare courses instantly with live AI intelligence.</p>
        </div>
        {!isAuthenticated ? (
          <button onClick={handleAuth} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 shadow-sm rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            <LogIn className="w-4 h-4" /> Sign in to Google
          </button>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-lg text-sm font-medium text-indigo-700">
             Welcome back, Student
          </div>
        )}
      </header>

      <section className="max-w-2xl mx-auto mb-16" aria-label="Course Input Area">
        <div className="flex flex-col md:flex-row gap-3 p-2 bg-gray-50 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-500">
          <label htmlFor="courseUrls" className="sr-only">Paste course URLs to compare</label>
          <textarea
            id="courseUrls"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            placeholder="Paste multiple live course URLs here (Udemy, Coursera, etc)..."
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
            className={`btn-primary flex items-center justify-center gap-2 transition-opacity ${!isAuthenticated ? "opacity-50 cursor-not-allowed" : ""}`}
            aria-label={loading ? "Analyzing courses, please wait" : "Analyze courses"}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : <><Search className="w-4 h-4" aria-hidden="true" /> Analyze</>}
          </button>
        </div>
        
        {/* Accessibility: aria-live ensures screen readers announce errors/status */}
        <div aria-live="polite" className="mt-4 text-center h-6">
          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
          {loading && <p className="text-indigo-600 text-sm font-medium">Scraping live URLs and running pedagogical analysis...</p>}
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

          {/* New LearnSpace 2.0 Matrix Section */}
          <div className="mt-12 p-8 bg-white border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <GitMerge className="w-5 h-5 text-indigo-600" /> Syllabus Overlap Matrix
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {result.courses.map((course, idx) => (
                <div key={idx} className="space-y-2">
                  <h3 className="font-bold text-gray-800">{course.title} teaches uniquely:</h3>
                  {course.uniqueTopics && course.uniqueTopics.length > 0 ? (
                    <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                      {course.uniqueTopics.map((topic, i) => (
                        <li key={i}>{topic}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No highly unique topics found compared to others.</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
