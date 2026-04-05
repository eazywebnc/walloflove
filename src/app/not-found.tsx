import type { Metadata } from "next";
import Link from "next/link";
import { Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found — WallOfLove",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[50%] translate-x-[-50%] w-[600px] h-[400px] rounded-full bg-pink-500/8 blur-[120px]" />
      </div>

      <div className="relative text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/25">
          <Heart className="w-8 h-8 text-white fill-white" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-2">404</h1>
        <p className="text-lg text-white/60 mb-8">
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/20"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
