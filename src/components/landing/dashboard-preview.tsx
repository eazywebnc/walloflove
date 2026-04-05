"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Star, Heart, ThumbsUp, Video, MoreHorizontal, TrendingUp, Users, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  { name: "Sarah M.", company: "LaunchPad", text: "Doubled our conversion rate in 2 weeks!", rating: 5, type: "text", avatar: "S", color: "bg-indigo-500" },
  { name: "James K.", company: "DevFlow", text: "Widget loads in under 50ms. Blazing fast.", rating: 5, type: "video", avatar: "J", color: "bg-purple-500" },
  { name: "Amina L.", company: "Bloom", text: "Our audience loves the video testimonials.", rating: 5, type: "text", avatar: "A", color: "bg-pink-500" },
  { name: "Carlos R.", company: "SaaSify", text: "Setup took 5 minutes. Converts like crazy.", rating: 5, type: "text", avatar: "C", color: "bg-emerald-500" },
  { name: "Yuki T.", company: "Pixel", text: "Themes matched our brand perfectly.", rating: 5, type: "video", avatar: "Y", color: "bg-cyan-500" },
];

const stats = [
  { label: "Total Views", value: "24,891", change: "+18%", icon: Eye },
  { label: "Conversions", value: "1,247", change: "+32%", icon: TrendingUp },
  { label: "Testimonials", value: "156", change: "+12", icon: Heart },
  { label: "Active Walls", value: "8", change: "+2", icon: Users },
];

function MiniTestimonialCard({ t, delay }: { t: typeof testimonials[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + 1.2, duration: 0.5 }}
      className="p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
    >
      <div className="flex items-start gap-2.5">
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0", t.color)}>
          {t.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold text-white truncate">{t.name}</p>
              <p className="text-[10px] text-white/40">{t.company}</p>
            </div>
            <div className="flex items-center gap-0.5">
              {t.type === "video" && <Video className="w-3 h-3 text-pink-400 mr-1" />}
              {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <p className="text-[10px] text-white/60 mt-1.5 leading-relaxed">{t.text}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -2]);
  const yImage = useTransform(scrollYProgress, [0, 1], [60, -30]);
  const rotateXImage = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -3]);

  return (
    <section ref={ref} className="relative py-8 px-4">
      <motion.div
        style={{ y, rotateX, perspective: 1200 }}
        className="max-w-5xl mx-auto"
      >
        {/* Browser frame */}
        <div className="relative rounded-2xl border border-white/15 bg-[#111111] shadow-2xl shadow-black/60 overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#0d0d0d]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 px-4 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/40 font-mono">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                app.walloflove.io/dashboard
              </div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-white/30" />
          </div>

          {/* Dashboard content */}
          <div className="flex">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="hidden md:flex flex-col w-48 border-r border-white/10 bg-[#0a0a0a] p-3"
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 text-white fill-white" />
                </div>
                <span className="text-xs font-bold text-white">WallOfLove</span>
              </div>
              {[
                { label: "Dashboard", active: true },
                { label: "Testimonials", active: false },
                { label: "Walls", active: false },
                { label: "Analytics", active: false },
                { label: "Settings", active: false },
              ].map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "px-3 py-2 rounded-lg text-[11px] font-medium mb-0.5 transition-colors",
                    item.active ? "bg-white/10 text-white" : "text-white/40 hover:text-white/60"
                  )}
                >
                  {item.label}
                </div>
              ))}
            </motion.div>

            {/* Main area */}
            <div className="flex-1 p-4 space-y-4">
              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
                      className="p-3 rounded-xl border border-white/10 bg-white/[0.02]"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="w-3.5 h-3.5 text-white/40" />
                        <span className="text-[10px] font-semibold text-emerald-400">{stat.change}</span>
                      </div>
                      <p className="text-lg font-black text-white">{stat.value}</p>
                      <p className="text-[10px] text-white/40">{stat.label}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Testimonials list */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-white/70">Recent Testimonials</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">All</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium text-white/30 hover:text-white/50 cursor-pointer">Text</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium text-white/30 hover:text-white/50 cursor-pointer">Video</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {testimonials.map((t, i) => (
                    <MiniTestimonialCard key={i} t={t} delay={i * 0.1} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#111111] to-transparent pointer-events-none" />
        </div>

        {/* Reflection glow */}
        <div className="absolute -bottom-8 left-[10%] right-[10%] h-16 bg-rose-500/10 blur-3xl rounded-full" />
      </motion.div>

      {/* Actual dashboard screenshot with 3D perspective */}
      <motion.div
        style={{ y: yImage, rotateX: rotateXImage, perspective: 1400 }}
        className="max-w-5xl mx-auto mt-16"
      >
        <div className="relative rounded-2xl border border-white/15 bg-[#111111] shadow-2xl shadow-black/60 overflow-hidden">
          {/* Browser title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#0d0d0d]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 px-4 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-white/40 font-mono">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                app.walloflove.io/dashboard
              </div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-white/30" />
          </div>

          {/* Dashboard image */}
          <div className="relative">
            <Image
              src="/images/dashboard.webp"
              alt="WallOfLove dashboard — manage testimonials, analytics, and walls"
              width={1920}
              height={1080}
              className="w-full h-auto"
              priority={false}
            />
            {/* Gradient overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#111111] to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Reflection glow */}
        <div className="absolute -bottom-8 left-[10%] right-[10%] h-16 bg-pink-500/10 blur-3xl rounded-full" />
      </motion.div>
    </section>
  );
}
