"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, BookOpen, Sparkles } from "lucide-react";
import ComparisonCard from "@/components/ComparisonCard";

export default function Home() {
  const [urls, setUrls] = useState<string>("");
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
      setError("Please enter valid course URLs starting with http:// or https://");
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
      setError(err.message || "Failed to analyze courses. Check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-20 min-h-screen">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6"
        >
          <Sparkles className="w-4 h-4" />
          AI-Powered Learning Intelligence
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
        >
          LearnSpace:<br />Master Any Skill.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg max-w-2xl mx-auto"
        >
          Paste course links from Udemy, Coursera, or edX. Our AI analyzes syllabus, quality, and value to find your perfect learning path.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-3xl mx-auto mb-20"
      >
        <div className="glass p-2 rounded-2xl flex flex-col md:flex-row gap-2 relative group focus-within:border-purple-500/50 transition-colors">
          <div className="flex-1 flex items-center px-4">
            <BookOpen className="w-5 h-5 text-gray-500 mr-3" />
            <input
              type="text"
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              placeholder="Paste course URLs (separate by space)..."
              className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 py-4"
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
            />
          </div>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Search className="w-5 h-5" /> Analyze</>}
          </button>
        </div>
        {error && <p className="text-red-400 text-sm mt-4 text-center">{error}</p>}
      </motion.div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="glass p-8 rounded-3xl border-purple-500/20 bg-purple-500/5">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-600 rounded-xl"><Sparkles className="w-6 h-6 text-white" /></div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">AI Comparison Verdict</h2>
                  <p className="text-gray-300 leading-relaxed italic">"{result.comparisonSummary}"</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {result.courses.map((course: any, idx: number) => (
                <ComparisonCard key={idx} course={course} index={idx} isWinner={idx === result.overallWinnerIndex} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
