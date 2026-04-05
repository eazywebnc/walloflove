"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  MessageSquare,
  Layers,
  Code,
  Video,
  LayoutDashboard,
  BarChart3,
  Star,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: MessageSquare,
    title: "Collect Easily",
    description:
      "Magic link, embedded form, or import from Google Reviews and Product Hunt. Your customers submit in seconds.",
    gradient: "from-indigo-500 to-blue-500",
    glow: "bg-indigo-500/20",
    span: "md:col-span-2",
    visual: "collect",
  },
  {
    icon: Layers,
    title: "12+ Beautiful Themes",
    description:
      "Masonry grid, carousel, or minimal list. Full color and font customization to match your brand.",
    gradient: "from-purple-500 to-violet-500",
    glow: "bg-purple-500/20",
    span: "md:col-span-1",
    visual: "themes",
  },
  {
    icon: Video,
    title: "Video Testimonials",
    description:
      "60-second video testimonials recorded directly in the browser. No app download needed.",
    gradient: "from-pink-500 to-rose-500",
    glow: "bg-pink-500/20",
    span: "md:col-span-1",
    visual: "video",
  },
  {
    icon: Code,
    title: "One Line Embed",
    description:
      "Widget under 5kb. Works on Webflow, Framer, WordPress, or custom React apps. Zero performance impact.",
    gradient: "from-cyan-500 to-teal-500",
    glow: "bg-cyan-500/20",
    span: "md:col-span-2",
    visual: "embed",
  },
  {
    icon: LayoutDashboard,
    title: "Smart Dashboard",
    description:
      "Approve, tag, filter, and organize all testimonials in one place. Auto-approval rules save time.",
    gradient: "from-orange-500 to-amber-500",
    glow: "bg-orange-500/20",
    span: "md:col-span-1",
    visual: "dashboard",
  },
  {
    icon: BarChart3,
    title: "Conversion Analytics",
    description:
      "Track views, clicks, and revenue impact. Know which testimonials drive the most conversions.",
    gradient: "from-emerald-500 to-green-500",
    glow: "bg-emerald-500/20",
    span: "md:col-span-1",
    visual: "analytics",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Async loading, edge CDN, optimized images. Your wall loads in under 50ms worldwide.",
    gradient: "from-yellow-500 to-orange-500",
    glow: "bg-yellow-500/20",
    span: "md:col-span-1",
    visual: "speed",
  },
];

function CollectVisual() {
  return (
    <div className="mt-4 flex gap-2 flex-wrap">
      {["Google Reviews", "Product Hunt", "Magic Link", "Embed Form", "Email"].map((src, i) => (
        <motion.div
          key={src}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i, duration: 0.3 }}
          className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] text-white/60 font-medium"
        >
          {src}
        </motion.div>
      ))}
    </div>
  );
}

function ThemesVisual() {
  return (
    <div className="mt-4 flex gap-2">
      {[
        "bg-gradient-to-br from-indigo-500 to-purple-600",
        "bg-gradient-to-br from-pink-500 to-rose-600",
        "bg-gradient-to-br from-emerald-500 to-teal-600",
        "bg-gradient-to-br from-orange-500 to-amber-600",
      ].map((g, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, rotate: -10 }}
          whileInView={{ opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * i, duration: 0.4 }}
          whileHover={{ scale: 1.1, rotate: 2 }}
          className={cn("w-10 h-14 rounded-lg", g, "shadow-lg")}
        >
          <div className="p-1.5 space-y-1">
            <div className="w-full h-1 rounded-full bg-white/30" />
            <div className="w-3/4 h-1 rounded-full bg-white/20" />
            <div className="flex gap-0.5 mt-1">
              {[1, 2, 3].map(s => (
                <Star key={s} className="w-1.5 h-1.5 fill-white/40 text-white/40" />
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function EmbedVisual() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mt-4 p-3 rounded-lg bg-[#0a0a0a] border border-white/10 font-mono text-[10px]"
    >
      <span className="text-purple-400">&lt;script</span>{" "}
      <span className="text-cyan-400">src</span>=
      <span className="text-emerald-400">&quot;walloflove.io/w/abc&quot;</span>
      <span className="text-purple-400">/&gt;</span>
      <div className="mt-1 text-white/30">// That&apos;s it. One line.</div>
    </motion.div>
  );
}

function SpeedVisual() {
  return (
    <div className="mt-4 space-y-2">
      {[
        { label: "Load time", value: "48ms", pct: 12 },
        { label: "Bundle size", value: "4.2kb", pct: 8 },
        { label: "Lighthouse", value: "100", pct: 100 },
      ].map((m, i) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between text-[10px]">
            <span className="text-white/40">{m.label}</span>
            <span className="text-emerald-400 font-semibold">{m.value}</span>
          </div>
          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${m.pct}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function FeatureVisual({ type }: { type: string }) {
  switch (type) {
    case "collect": return <CollectVisual />;
    case "themes": return <ThemesVisual />;
    case "embed": return <EmbedVisual />;
    case "speed": return <SpeedVisual />;
    default: return null;
  }
}

export function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section ref={ref} className="relative py-32 px-4 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm font-medium mb-4">
            Everything you need
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Built for growth,{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              not complexity
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            Every feature you need to collect, manage, and leverage social proof — without the enterprise price tag.
          </p>
        </motion.div>

        {/* Bento grid */}
        <motion.div style={{ y }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ scale: 1.01, y: -2 }}
                className={cn(
                  "group relative p-6 rounded-2xl border bg-white/[0.02] backdrop-blur-sm",
                  "hover:bg-white/[0.05] transition-all duration-300",
                  "border-white/10 hover:border-white/20",
                  "overflow-hidden",
                  feature.span
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "relative inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3",
                    "bg-gradient-to-br",
                    feature.gradient,
                    "shadow-lg"
                  )}
                >
                  <Icon className="w-4.5 h-4.5 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-base font-bold text-white mb-1.5">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>

                {/* Visual element for wide cards */}
                <FeatureVisual type={feature.visual} />

                {/* Hover glow */}
                <div
                  className={cn(
                    "absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl",
                    feature.glow
                  )}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
