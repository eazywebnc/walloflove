"use client";

import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "mailto:contact@eazyweb.nc" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] py-12 px-4">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Star className="w-4 h-4 fill-white text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              WallOf<span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Love</span>
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-white/40 hover:text-white/80 text-sm transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Built by */}
          <div className="flex items-center gap-1.5 text-white/30 text-sm">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500 animate-pulse" />
            <span>by</span>
            <a
              href="https://eazyweb.nc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white/80 font-semibold transition-colors"
            >
              EazyWebNC
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/[0.05] text-center">
          <p className="text-white/20 text-xs">
            © 2026 WallOfLove. All rights reserved. A product by{" "}
            <a href="https://eazyweb.nc" className="hover:text-white/40 transition-colors">
              EazyWebNC
            </a>{" "}
            — New Caledonia.
          </p>
        </div>
      </div>
    </footer>
  );
}
