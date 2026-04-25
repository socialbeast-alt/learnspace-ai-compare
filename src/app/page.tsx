"use client";
import { useState } from "react";
import { Search, Loader2, BookOpen, Sparkles } from "lucide-react";
import ComparisonCard from "@/components/ComparisonCard";

export default function Home() {
  const [urls, setUrls] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!urls.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    const urlList = urls.split(/[\s,]+/).filter(u => u.startsWith("http"));
    if (urlList.length === 0) {
      setError("Please enter valid URLs.");
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
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to analyze.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-900 tracking-tight">LearnSpace</h1>
        <p className="text-gray-500 text-lg">Compare courses instantly with AI intelligence.</p>
      </div>

      <div className="max-w-2xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row gap-3 p-2 bg-gray-50 rounded-xl border border-gray-200">
          <input
            type="text"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            placeholder="Paste URLs here..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 px-4 py-3"
            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
          />
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="btn-primary disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Search className="w-4 h-4" /> Analyze</>}
          </button>
        </div>
        {error && <p className="text-red-600 text-center text-sm mt-4">{error}</p>}
      </div>

      {result && (
        <div className="space-y-12">
          <div className="p-6 bg-indigo-50 rounded-xl border border-indigo-100">
            <h2 className="text-sm font-bold text-indigo-900 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> AI Comparison Verdict
            </h2>
            <p className="text-indigo-900 text-lg font-medium leading-relaxed italic">"{result.comparisonSummary}"</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.courses.map((course: any, idx: number) => (
              <ComparisonCard key={idx} course={course} isWinner={idx === result.overallWinnerIndex} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
