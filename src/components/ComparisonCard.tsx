"use client";
import { motion } from "framer-motion";
import { Check, X, Star, Clock, User, Award, Trophy } from "lucide-react";

export default function ComparisonCard({ course, isWinner, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`glass relative p-6 rounded-2xl flex flex-col h-full ${isWinner ? "border-purple-500/50 purple-glow" : "border-white/10"}`}
    >
      {isWinner && <div className="absolute -top-4 -right-4 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg animate-bounce"><Trophy className="w-4 h-4" /> Top Pick</div>}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">{course.title}</h3>
        <p className="text-purple-400 text-sm flex items-center gap-1"><User className="w-3 h-3" /> {course.instructor}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 rounded-lg p-3"><p className="text-xs text-gray-400 mb-1 font-bold">Price</p><p className="text-lg font-semibold">{course.price}</p></div>
        <div className="bg-white/5 rounded-lg p-3"><p className="text-xs text-gray-400 mb-1 font-bold">Rating</p><p className="text-lg font-semibold text-yellow-400 flex items-center gap-1"><Star className="w-4 h-4 fill-current" /> {course.rating}</p></div>
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold mb-2 text-green-400 flex items-center gap-2"><Check className="w-4 h-4" /> Pros</p>
        <ul className="text-xs text-gray-400 space-y-1 mb-4">{course.pros.map((p: any, i: any) => <li key={i}>• {p}</li>)}</ul>
        <p className="text-sm font-bold mb-2 text-red-400 flex items-center gap-2"><X className="w-4 h-4" /> Cons</p>
        <ul className="text-xs text-gray-400 space-y-1">{course.cons.map((c: any, i: any) => <li key={i}>• {c}</li>)}</ul>
      </div>
      <div className="mt-auto pt-6 border-t border-white/10"><p className="text-sm text-gray-300 italic">"{course.verdict}"</p></div>
    </motion.div>
  );
}
