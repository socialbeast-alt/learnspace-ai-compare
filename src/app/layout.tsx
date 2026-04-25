import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LearnSpace AI | Evaluate & Compare Courses Instantly",
  description: "Use Google Gemini AI to analyze course quality, value, and syllabus to find the best learning path for you with LearnSpace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.className} bg-[#0a0a0c] text-white antialiased`}>
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0a0a0c] to-[#0a0a0c]"></div>
        {children}
      </body>
    </html>
  );
}
