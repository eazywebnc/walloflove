"use client";

import { motion } from "framer-motion";
import { MessageSquare, Circle } from "lucide-react";

interface WallCardProps {
  id: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  createdAt: string;
  testimonialCount: number;
}

export function WallCard({
  name,
  description,
  isActive,
  createdAt,
  testimonialCount,
}: WallCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative rounded-xl border border-white/10 bg-[#111111] p-5 cursor-pointer overflow-hidden hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/5 transition-colors duration-200"
    >
      {/* Subtle gradient glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-rose-600/0 group-hover:from-pink-500/5 group-hover:to-rose-600/5 transition-all duration-300 pointer-events-none rounded-xl" />

      {/* Status badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
            isActive
              ? "bg-emerald-500/15 text-emerald-400"
              : "bg-white/10 text-white/40"
          }`}
        >
          <Circle
            className={`w-1.5 h-1.5 fill-current ${
              isActive ? "text-emerald-400" : "text-white/40"
            }`}
          />
          {isActive ? "Active" : "Inactive"}
        </span>

        <span className="text-xs text-white/30">{formattedDate}</span>
      </div>

      {/* Wall name */}
      <h3 className="text-base font-semibold text-white mb-1.5 group-hover:text-pink-100 transition-colors">
        {name}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm text-white/50 line-clamp-2 mb-4">{description}</p>
      )}
      {!description && <div className="mb-4" />}

      {/* Footer */}
      <div className="flex items-center gap-1.5 text-xs text-white/40">
        <MessageSquare className="w-3.5 h-3.5" />
        <span>
          {testimonialCount}{" "}
          {testimonialCount === 1 ? "testimonial" : "testimonials"}
        </span>
      </div>
    </motion.div>
  );
}
