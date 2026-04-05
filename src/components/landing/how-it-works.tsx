"use client";

import { motion } from "framer-motion";
import { Plus, Share2, Code, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: Plus,
    title: "Create your wall",
    description:
      "Sign up, give your wall a name, and choose a theme. Takes less than 2 minutes to get your unique collection link.",
    color: "from-indigo-500 to-violet-500",
    glowColor: "bg-indigo-500/20",
    borderColor: "border-indigo-500/30",
    detail: "Name → Theme → Done",
  },
  {
    number: "02",
    icon: Share2,
    title: "Share & collect",
    description:
      "Share your magic link with customers via email, social, or embedded form. They submit text or video testimonials in seconds.",
    color: "from-purple-500 to-pink-500",
    glowColor: "bg-purple-500/20",
    borderColor: "border-purple-500/30",
    detail: "Email · Social · Embed",
  },
  {
    number: "03",
    icon: Code,
    title: "Embed & convert",
    description:
      "Copy one script tag. Your beautiful wall appears on your site instantly, loading async so it never slows you down.",
    color: "from-pink-500 to-rose-500",
    glowColor: "bg-pink-500/20",
    borderColor: "border-pink-500/30",
    detail: "<script> → Live in seconds",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-purple-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm font-medium mb-4">
            Simple by design
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Up and running{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              in minutes
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
            No dev required. No complicated setup. Just three steps from zero to a live testimonials wall.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[16.66%] right-[16.66%] h-px">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-pink-500/40" />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step icon */}
                  <div className="relative mb-6 z-10">
                    {/* Glow */}
                    <div
                      className={cn(
                        "absolute inset-0 rounded-2xl blur-xl scale-150",
                        step.glowColor
                      )}
                    />
                    {/* Icon container */}
                    <div
                      className={cn(
                        "relative w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center",
                        "border",
                        step.color,
                        step.borderColor,
                        "shadow-2xl"
                      )}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    {/* Number badge */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#0a0a0a] border border-white/20 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white/60">{i + 1}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-xs">
                    {step.description}
                  </p>

                  {/* Detail tag */}
                  <div
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold",
                      "border bg-white/[0.03]",
                      step.borderColor,
                      `text-transparent bg-gradient-to-r ${step.color} bg-clip-text`
                    )}
                  >
                    {step.detail}
                  </div>

                  {/* Arrow between steps (mobile) */}
                  {i < steps.length - 1 && (
                    <div className="lg:hidden mt-8 mb-2">
                      <ArrowRight className="w-5 h-5 text-white/20 rotate-90" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom call to action strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <p className="text-white/30 text-sm">
            Average setup time: <span className="text-white/60 font-semibold">4 minutes 32 seconds</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
