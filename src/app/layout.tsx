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
    <html lang="en">
      <body className={`${outfit.className} bg-white text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}
