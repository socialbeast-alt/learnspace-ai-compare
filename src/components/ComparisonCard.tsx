import { Check, X, Star, User, Trophy } from "lucide-react";

/**
 * Interface defining the expected structure of course data from the AI.
 */
export interface CourseData {
  title: string;
  instructor: string;
  price: string;
  rating: string;
  duration: string;
  level: string;
  skills: string[];
  pros: string[];
  cons: string[];
  verdict: string;
}

interface ComparisonCardProps {
  course: CourseData;
  isWinner: boolean;
}

/**
 * Accessible, responsive card component for displaying course comparison data.
 */
export default function ComparisonCard({ course, isWinner }: ComparisonCardProps) {
  return (
    <article 
      className={`card p-6 flex flex-col h-full relative ${isWinner ? "border-indigo-600 ring-2 ring-indigo-50" : ""}`}
      aria-label={`Comparison card for ${course.title}`}
    >
      {isWinner && (
        <div className="absolute -top-3 left-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1" aria-hidden="true">
          <Trophy className="w-3 h-3" /> Top Pick
        </div>
      )}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 leading-tight">{course.title}</h3>
        <p className="text-gray-500 text-sm flex items-center gap-1"><User className="w-3 h-3" aria-hidden="true" /> {course.instructor}</p>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-gray-50 p-2 rounded"><p className="text-[10px] text-gray-400 font-bold uppercase">Price</p><p className="font-bold">{course.price}</p></div>
        <div className="bg-gray-50 p-2 rounded"><p className="text-[10px] text-gray-400 font-bold uppercase">Rating</p><p className="font-bold text-yellow-600 flex items-center gap-1"><Star className="w-3 h-3 fill-current" aria-hidden="true" /> {course.rating}</p></div>
      </div>
      <div className="flex-1 space-y-4">
        <div>
          <p className="text-xs font-bold text-green-600 flex items-center gap-1 mb-1"><Check className="w-3 h-3" aria-hidden="true" /> Pros</p>
          <ul className="text-xs text-gray-600 space-y-1" aria-label="Course pros">{course.pros.map((p, i) => <li key={i}>• {p}</li>)}</ul>
        </div>
        <div>
          <p className="text-xs font-bold text-red-600 flex items-center gap-1 mb-1"><X className="w-3 h-3" aria-hidden="true" /> Cons</p>
          <ul className="text-xs text-gray-600 space-y-1" aria-label="Course cons">{course.cons.map((c, i) => <li key={i}>• {c}</li>)}</ul>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100"><p className="text-xs text-gray-500 italic leading-relaxed">"{course.verdict}"</p></div>
    </article>
  );
}
