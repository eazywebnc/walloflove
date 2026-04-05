"use client";


import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const testimonialCards = [
  {
    name: "Sarah M.",
    role: "Founder @ LaunchPad",
    text: "WallOfLove doubled our conversion rate in 2 weeks. Absolute game changer!",
    stars: 5,
    color: "from-indigo-500/20 to-purple-500/20",
    border: "border-indigo-500/30",
  },
  {
    name: "James K.",
    role: "CTO @ DevFlow",
    text: "The embed is insanely fast. Under 5kb and looks stunning on our site.",
    stars: 5,
    color: "from-purple-500/20 to-pink-500/20",
    border: "border-purple-500/30",
  },
  {
    name: "Amina L.",
    role: "Marketing @ Bloom",
    text: "Collecting video testimonials was never this easy. Our audience loves it.",
    stars: 5,
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/30",
  },
  {
    name: "Carlos R.",
    role: "CEO @ SaaSify",
    text: "Setup took 5 minutes. Now we have a stunning testimonials page that converts.",
    stars: 5,
    color: "from-violet-500/20 to-indigo-500/20",
    border: "border-violet-500/30",
  },
  {
    name: "Yuki T.",
    role: "Designer @ Pixel",
    text: "The themes are gorgeous. Matched our brand perfectly with zero CSS tweaks.",
    stars: 5,
    color: "from-cyan-500/20 to-indigo-500/20",
    border: "border-cyan-500/30",
  },
];

const floatingVariants = [
  { x: -320, y: -80, rotate: -6, delay: 0 },
  { x: 300, y: -120, rotate: 5, delay: 0.2 },
  { x: -280, y: 140, rotate: 4, delay: 0.4 },
  { x: 320, y: 100, rotate: -4, delay: 0.6 },
  { x: 0, y: 220, rotate: 2, delay: 0.8 },
];

function FloatingCard({
  card,
  position,
}: {
  card: (typeof testimonialCards)[0];
  position: (typeof floatingVariants)[0];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: position.x, y: position.y }}
      animate={{
        opacity: 0.85,
        scale: 1,
        x: [position.x - 8, position.x + 8, position.x - 8],
        y: [position.y - 10, position.y + 6, position.y - 10],
        rotate: [position.rotate - 1, position.rotate + 1, position.rotate - 1],
      }}
      transition={{
        opacity: { duration: 0.6, delay: position.delay + 0.4 },
        scale: { duration: 0.6, delay: position.delay + 0.4 },
        x: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: position.delay },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: position.delay },
        rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: position.delay },
      }}
      className={cn(
        "absolute w-64 p-4 rounded-2xl border bg-gradient-to-br backdrop-blur-sm",
        "pointer-events-none select-none hidden lg:block",
        card.color,
        card.border
      )}
      style={{ rotate: position.rotate }}
    >
      <div className="flex gap-0.5 mb-2">
        {Array.from({ length: card.stars }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-xs text-white/80 leading-relaxed mb-3">{card.text}</p>
      <div>
        <p className="text-xs font-semibold text-white">{card.name}</p>
        <p className="text-xs text-white/50">{card.role}</p>
      </div>
    </motion.div>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full bg-pink-600/10 blur-[120px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating testimonial cards */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {testimonialCards.map((card, i) => (
          <FloatingCard key={i} card={card} position={floatingVariants[i]} />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>The #1 Testimonial Platform in 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6"
        >
          <span className="text-white">Turn Happy Customers</span>
          {' '}<br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Into Your Best Marketing
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Collect, manage, and showcase stunning testimonials.{" "}
          <span className="text-white/80">
            Embed a beautiful wall of love on your site in one line of code.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button
            size="lg"
            className="relative group h-14 px-8 text-base font-semibold rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 border-0 text-white shadow-lg shadow-indigo-500/25 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 text-base font-semibold rounded-2xl border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300"
          >
            See Demo
          </Button>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-white/40"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {["bg-indigo-500", "bg-purple-500", "bg-pink-500", "bg-violet-500", "bg-cyan-500"].map((c, i) => (
                <div key={i} className={cn("w-7 h-7 rounded-full border-2 border-[#0a0a0a]", c)} />
              ))}
            </div>
            <span>2,400+ teams trust us</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/20" />
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span>4.9/5 average rating</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/20" />
          <div className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
            <span>No credit card required</span>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          variants={itemVariants}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-indigo-500/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
            <Image
              src="/images/dashboard.webp"
              alt="WallOfLove testimonial dashboard"
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 z-20" />
          </div>
        </motion.div>
      </motion.div>


      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
    </section>
  );
}
