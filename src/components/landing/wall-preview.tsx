"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, Quote, Play, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const wallCards = [
  { name: "Emily Chen", role: "CEO @ TechStart", text: "We switched from a static testimonials page to WallOfLove and our demo requests went up 47%. The social proof is real.", rating: 5, type: "text" as const, avatar: "E", gradient: "from-violet-500 to-indigo-500" },
  { name: "Marcus B.", role: "Marketing @ Relay", text: "Finally a tool that makes collecting testimonials effortless.", rating: 5, type: "video" as const, avatar: "M", gradient: "from-pink-500 to-rose-500" },
  { name: "Priya S.", role: "Founder @ DesignLab", text: "The themes are stunning. Zero CSS needed. Our landing page looks 10x better now with the testimonial wall.", rating: 5, type: "text" as const, avatar: "P", gradient: "from-emerald-500 to-teal-500" },
  { name: "Tom W.", role: "CTO @ BuildFast", text: "Under 5kb widget. Lightning fast. Does not impact our Core Web Vitals at all.", rating: 5, type: "text" as const, avatar: "T", gradient: "from-orange-500 to-amber-500" },
  { name: "Luna K.", role: "Growth @ Elevate", text: "Video testimonials converted 3x better than text. Game changer.", rating: 5, type: "video" as const, avatar: "L", gradient: "from-cyan-500 to-blue-500" },
  { name: "Alex R.", role: "PM @ FlowState", text: "Setup was 5 minutes. Literally copy-paste one script tag and done.", rating: 5, type: "text" as const, avatar: "A", gradient: "from-purple-500 to-fuchsia-500" },
  { name: "Jordan M.", role: "Sales @ Closr", text: "We embed walls on every pricing page. Conversion lift was immediate and measurable.", rating: 5, type: "text" as const, avatar: "J", gradient: "from-red-500 to-pink-500" },
  { name: "Nadia F.", role: "Designer @ Pixel+", text: "Beautiful design out of the box. Our clients love it.", rating: 5, type: "video" as const, avatar: "N", gradient: "from-indigo-500 to-violet-500" },
];

function WallCard({ card, index }: { card: typeof wallCards[0]; index: number }) {
  const isLarge = index === 0 || index === 3;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={cn(
        "group relative p-5 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm",
        "hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300",
        isLarge && "row-span-2"
      )}
    >
      {/* Quote icon */}
      <Quote className="w-6 h-6 text-white/10 mb-3" />

      {/* Text */}
      <p className={cn(
        "text-white/80 leading-relaxed mb-4",
        isLarge ? "text-base" : "text-sm"
      )}>
        &ldquo;{card.text}&rdquo;
      </p>

      {/* Video play indicator */}
      {card.type === "video" && (
        <div className="flex items-center gap-2 mb-4">
          <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center", card.gradient)}>
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          </div>
          <div>
            <p className="text-[10px] text-white/50">Video testimonial</p>
            <p className="text-[10px] text-white/30">0:42</p>
          </div>
        </div>
      )}

      {/* Rating */}
      <div className="flex gap-0.5 mb-3">
        {[1, 2, 3, 4, 5].map(i => (
          <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Author */}
      <div className="flex items-center gap-2.5">
        <div className={cn("w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-xs font-bold", card.gradient)}>
          {card.avatar}
        </div>
        <div>
          <p className="text-xs font-semibold text-white">{card.name}</p>
          <p className="text-[10px] text-white/40">{card.role}</p>
        </div>
      </div>

      {/* Hover glow */}
      <div className={cn(
        "absolute -bottom-2 -right-2 w-20 h-20 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl",
        `bg-gradient-to-br ${card.gradient}`
      )} />
    </motion.div>
  );
}

export function WallPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  return (
    <section ref={ref} className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-[20%] w-[600px] h-[400px] bg-pink-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-[10%] w-[500px] h-[400px] bg-indigo-600/8 rounded-full blur-[120px]" />
      </div>

      <motion.div style={{ opacity }} className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/10 text-pink-300 text-sm font-medium mb-4">
            <Heart className="w-3.5 h-3.5 fill-pink-400" />
            See it in action
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Your wall of love,{" "}
            <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              beautiful by default
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            This is what your customers will see. A stunning, responsive testimonial wall that works everywhere.
          </p>
        </motion.div>

        {/* Masonry wall preview */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {wallCards.map((card, i) => (
            <div key={i} className="break-inside-avoid">
              <WallCard card={card} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom fade + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-white/30 text-sm">
            Masonry, carousel, list, minimal — <span className="text-white/50">12+ layouts</span> to match your brand.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
