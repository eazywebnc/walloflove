"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Star, ArrowRight, Quote, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

interface TestimonialCard {
  name: string;
  role: string;
  text: string;
  rating: number;
  size: "sm" | "md" | "lg";
}

const testimonials: TestimonialCard[][] = [
  // Column 1
  [
    { name: "Sarah M.", role: "Founder, Bloom", text: "WallOfLove transformed how we showcase social proof. Conversions jumped 34% in the first month.", rating: 5, size: "lg" },
    { name: "James K.", role: "Head of Growth", text: "Dead simple to set up. Beautiful results.", rating: 5, size: "sm" },
    { name: "Priya R.", role: "Product Designer", text: "The masonry layout looks incredible on our landing page. Customers actually stop and read every testimonial now.", rating: 5, size: "md" },
    { name: "Tom B.", role: "CTO, Launchpad", text: "Finally, a testimonial tool that doesn't look like it's from 2015.", rating: 4, size: "sm" },
    { name: "Elena V.", role: "Marketing Lead", text: "We replaced three different tools with WallOfLove. The all-in-one approach saves us hours every week and the output is stunning.", rating: 5, size: "lg" },
    { name: "David C.", role: "Indie Hacker", text: "My landing page conversion rate doubled. Not exaggerating.", rating: 5, size: "sm" },
  ],
  // Column 2
  [
    { name: "Alex T.", role: "CEO, Nimbus", text: "Best investment we made this quarter.", rating: 5, size: "sm" },
    { name: "Maria L.", role: "Brand Manager", text: "Our testimonials finally feel alive. The animated wall creates this mesmerizing effect that keeps visitors engaged way longer than static quotes ever did.", rating: 5, size: "lg" },
    { name: "Chris W.", role: "Developer", text: "Integration took 5 minutes. The API is clean, docs are great, and the React component just works out of the box.", rating: 5, size: "md" },
    { name: "Nina S.", role: "Freelancer", text: "Clients are blown away every time.", rating: 5, size: "sm" },
    { name: "Oscar P.", role: "VP Sales", text: "Social proof on steroids. Our sales team embeds the wall in proposals now and close rates are up significantly.", rating: 5, size: "lg" },
    { name: "Lena H.", role: "Startup Founder", text: "Clean design, fast load times. Love it.", rating: 4, size: "sm" },
  ],
  // Column 3
  [
    { name: "Ryan D.", role: "Agency Owner", text: "We use WallOfLove for every client project now. The customization options let us match any brand perfectly without writing custom CSS.", rating: 5, size: "md" },
    { name: "Sophie G.", role: "E-commerce Lead", text: "Added it to our product pages. AOV went up 22%.", rating: 5, size: "sm" },
    { name: "Marcus J.", role: "SaaS Founder", text: "The automated collection flow is genius. Customers submit video and text testimonials without us chasing them. It just works.", rating: 5, size: "lg" },
    { name: "Aisha N.", role: "Content Creator", text: "Makes my portfolio look 10x more professional.", rating: 5, size: "sm" },
    { name: "Ben F.", role: "Growth Hacker", text: "I've tested every testimonial widget out there. WallOfLove is the only one that actually looks good and performs well on Core Web Vitals.", rating: 5, size: "md" },
    { name: "Carla M.", role: "Designer", text: "Pixel-perfect. The attention to detail is remarkable.", rating: 5, size: "sm" },
  ],
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-600"
          }`}
        />
      ))}
    </div>
  );
}

function Card({ card }: { card: TestimonialCard }) {
  const heightMap = { sm: "min-h-[140px]", md: "min-h-[190px]", lg: "min-h-[240px]" };
  return (
    <div
      className={`${heightMap[card.size]} rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm p-5 flex flex-col gap-3 hover:border-rose-500/30 hover:bg-white/[0.06] transition-all duration-500 group`}
    >
      <Quote className="h-4 w-4 text-rose-400/40 group-hover:text-rose-400/70 transition-colors shrink-0" />
      <p className="text-sm text-zinc-300 leading-relaxed flex-1">{card.text}</p>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/[0.06]">
        <div>
          <p className="text-xs font-semibold text-white">{card.name}</p>
          <p className="text-[11px] text-zinc-500">{card.role}</p>
        </div>
        <StarRating rating={card.rating} />
      </div>
    </div>
  );
}

function TestimonialColumn({
  cards,
  className,
  columnRef,
}: {
  cards: TestimonialCard[];
  className?: string;
  columnRef: React.RefObject<HTMLDivElement | null>;
}) {
  const allCards = [...cards, ...cards];
  return (
    <div className={`overflow-hidden ${className ?? ""}`} style={{ height: "700px" }}>
      <div ref={columnRef} className="flex flex-col gap-4">
        {allCards.map((card, i) => (
          <Card key={`${card.name}-${i}`} card={card} />
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cols = [col1Ref.current, col2Ref.current, col3Ref.current];
    if (cols.some((c) => !c)) return;

    const ctx = gsap.context(() => {
      // Infinite auto-scroll for each column at different base speeds
      const baseDurations = [45, 35, 50];

      cols.forEach((col, i) => {
        if (!col) return;
        const totalHeight = col.scrollHeight / 2;

        // Stagger starting positions
        const offsets = [0, -totalHeight * 0.3, -totalHeight * 0.15];
        gsap.set(col, { y: offsets[i] });

        gsap.to(col, {
          y: `-=${totalHeight}`,
          duration: baseDurations[i],
          ease: "none",
          repeat: -1,
          modifiers: {
            y: gsap.utils.unitize((y: string) => {
              return parseFloat(y) % totalHeight;
            }),
          },
        });
      });

      // ScrollTrigger parallax: each column responds differently to page scroll
      const parallaxSpeeds = [0.15, -0.25, 0.1];
      cols.forEach((col, i) => {
        if (!col) return;
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const offset = self.progress * 300 * parallaxSpeeds[i];
            gsap.set(col, { marginTop: offset });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-zinc-950 pt-24 pb-16 lg:pt-32 lg:pb-24"
    >
      {/* Noise/grain texture overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.035]">
        <svg width="100%" height="100%">
          <filter id="hero-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-noise)" />
        </svg>
      </div>

      {/* Radial dot pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.12]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(244,114,182,0.35) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Background gradient blurs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-rose-600/10 blur-[160px]" />
        <div className="absolute top-1/2 left-1/3 h-[400px] w-[400px] rounded-full bg-pink-600/[0.08] blur-[120px]" />
        <div className="absolute -bottom-20 right-0 h-[500px] w-[500px] rounded-full bg-fuchsia-600/[0.08] blur-[140px]" />
      </div>

      {/* Glowing heart accent behind the wall */}
      <div className="pointer-events-none absolute right-[10%] top-1/2 -translate-y-1/2 z-0">
        <Heart className="h-[500px] w-[500px] text-rose-500/[0.04] fill-rose-500/[0.02]" strokeWidth={0.5} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-60 w-60 rounded-full bg-rose-500/[0.06] blur-[80px]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16 gap-16">
          {/* LEFT: Copy & CTA */}
          <div className="flex-1 flex flex-col justify-center lg:sticky lg:top-32 lg:max-w-xl lg:py-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/[0.08] px-4 py-1.5 mb-8">
                <Sparkles className="h-3.5 w-3.5 text-rose-400" />
                <span className="text-xs font-medium text-rose-300 tracking-wide">
                  Social proof that converts
                </span>
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]"
              style={{ fontFamily: "var(--font-display), serif" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {"Turn your ".split("").map((char, i) => (
                <motion.span
                  key={`a-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + i * 0.02 }}
                >
                  {char}
                </motion.span>
              ))}
              <br />
              {"happiest customers".split("").map((char, i) => (
                <motion.span
                  key={`b-${i}`}
                  className="bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.35, delay: 0.3 + i * 0.025 }}
                >
                  {char}
                </motion.span>
              ))}
              <br />
              {"into your best marketing".split("").map((char, i) => (
                <motion.span
                  key={`c-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.02 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-md"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              Collect, curate, and display stunning testimonial walls that build
              trust and drive conversions. No code required.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row items-start gap-4"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-lg shadow-rose-500/25 px-8 h-12 text-base font-semibold rounded-xl"
              >
                Start for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.06] hover:text-white px-8 h-12 text-base rounded-xl"
              >
                See examples
              </Button>
            </motion.div>

            <motion.div
              className="mt-12 flex items-center gap-6 text-sm text-zinc-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
                <span>2,400+ walls created</span>
              </div>
              <div className="h-4 w-px bg-zinc-800" />
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span>4.9/5 rating</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Living Testimonial Masonry Wall */}
          <motion.div
            className="flex-1 lg:max-w-[560px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Fade overlays top/bottom */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24 bg-gradient-to-b from-zinc-950 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-t from-zinc-950 to-transparent" />

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <TestimonialColumn
                  cards={testimonials[0]}
                  columnRef={col1Ref}
                />
                <TestimonialColumn
                  cards={testimonials[1]}
                  columnRef={col2Ref}
                  className="hidden sm:block"
                />
                <TestimonialColumn
                  cards={testimonials[2]}
                  columnRef={col3Ref}
                  className="hidden lg:block"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
