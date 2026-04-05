"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  Layers,
  Code,
  Video,
  LayoutDashboard,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: MessageSquare,
    title: "Collect Easily",
    description:
      "Share a magic link, embed a form on your site, or import directly from Google Reviews and Product Hunt.",
    gradient: "from-indigo-500 to-blue-500",
    glow: "indigo",
    highlight: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    icon: Layers,
    title: "Beautiful Walls",
    description:
      "Masonry grid, carousel, or minimal list. 12+ themes with full color and font customization to match your brand.",
    gradient: "from-purple-500 to-violet-500",
    glow: "purple",
    highlight: "bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: Code,
    title: "Embed Anywhere",
    description:
      "One line of code. Widget under 5kb. Works on any site — Webflow, Framer, WordPress, custom React apps.",
    gradient: "from-cyan-500 to-teal-500",
    glow: "cyan",
    highlight: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: Video,
    title: "Video Testimonials",
    description:
      "Let customers record 60-second video testimonials directly in their browser. No app download needed.",
    gradient: "from-pink-500 to-rose-500",
    glow: "pink",
    highlight: "bg-pink-500/10 border-pink-500/20",
  },
  {
    icon: LayoutDashboard,
    title: "Smart Dashboard",
    description:
      "Approve, tag, filter, and organize all testimonials in one place. Set up auto-approval rules to save time.",
    gradient: "from-orange-500 to-amber-500",
    glow: "orange",
    highlight: "bg-orange-500/10 border-orange-500/20",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description:
      "Track views, clicks, and conversion impact. Know exactly which testimonials drive the most revenue.",
    gradient: "from-emerald-500 to-green-500",
    glow: "emerald",
    highlight: "bg-emerald-500/10 border-emerald-500/20",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function Features() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
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

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={cn(
                  "group relative p-6 rounded-2xl border bg-white/[0.02] backdrop-blur-sm",
                  "hover:bg-white/[0.05] transition-all duration-300",
                  "border-white/10 hover:border-white/20"
                )}
              >
                {/* Gradient border on hover */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                    "border",
                    feature.highlight
                  )}
                />

                {/* Icon */}
                <div
                  className={cn(
                    "relative inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4",
                    "bg-gradient-to-br",
                    feature.gradient,
                    "shadow-lg"
                  )}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>

                {/* Corner glow on hover */}
                <div
                  className={cn(
                    "absolute bottom-0 right-0 w-24 h-24 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    `bg-gradient-to-br ${feature.gradient}`,
                    "blur-2xl"
                  )}
                  style={{ opacity: 0 }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
