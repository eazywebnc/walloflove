"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect to get started",
    badge: null,
    features: [
      "1 testimonial wall",
      "Up to 10 testimonials",
      "Basic themes (3)",
      "Text testimonials only",
      "WallOfLove branding",
      "Share link",
    ],
    cta: "Start Free",
    ctaVariant: "outline" as const,
    highlighted: false,
    gradient: null,
    borderClass: "border-white/10",
    bgClass: "bg-white/[0.02]",
  },
  {
    name: "Pro",
    monthlyPrice: 15,
    yearlyPrice: 12,
    description: "For growing businesses",
    badge: "Most Popular",
    features: [
      "Up to 5 testimonial walls",
      "Up to 100 testimonials",
      "All themes (12+)",
      "Video testimonials",
      "Custom branding & colors",
      "Priority email support",
      "CSV export",
      "Advanced analytics",
    ],
    cta: "Start Pro Trial",
    ctaVariant: "default" as const,
    highlighted: true,
    gradient: "from-indigo-600 to-purple-600",
    borderClass: "border-indigo-500/50",
    bgClass: "bg-gradient-to-b from-indigo-950/50 to-purple-950/30",
  },
  {
    name: "Business",
    monthlyPrice: 39,
    yearlyPrice: 31,
    description: "For teams & agencies",
    badge: null,
    features: [
      "Unlimited walls",
      "Unlimited testimonials",
      "White-label (remove branding)",
      "Video testimonials",
      "Full API access",
      "Priority support (< 2h)",
      "Custom domain",
      "Team seats (5 users)",
      "Zapier & webhook integrations",
    ],
    cta: "Get Business",
    ctaVariant: "outline" as const,
    highlighted: false,
    gradient: null,
    borderClass: "border-white/10",
    bgClass: "bg-white/[0.02]",
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="relative py-32 px-4 overflow-hidden" id="pricing">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/6 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-sm font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Simple, transparent pricing
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-4">
            Start free,{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              scale when ready
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto leading-relaxed">
            No hidden fees. No surprises. Cancel anytime.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span className={cn("text-sm font-medium transition-colors", !yearly ? "text-white" : "text-white/40")}>
            Monthly
          </span>
          <button
            onClick={() => setYearly(!yearly)}
            className={cn(
              "relative w-14 h-7 rounded-full transition-colors duration-300",
              yearly ? "bg-gradient-to-r from-indigo-600 to-purple-600" : "bg-white/10"
            )}
            role="switch"
            aria-checked={yearly}
            aria-label="Toggle yearly billing"
          >
            <motion.div
              animate={{ x: yearly ? 28 : 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
            />
          </button>
          <span className={cn("text-sm font-medium transition-colors", yearly ? "text-white" : "text-white/40")}>
            Yearly
          </span>
          <AnimatePresence>
            {yearly && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -10 }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold"
              >
                <Zap className="w-3 h-3" />
                Save 20%
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6 transition-all duration-300",
                plan.bgClass,
                plan.borderClass,
                plan.highlighted && "shadow-2xl shadow-indigo-500/20 scale-[1.02]"
              )}
            >
              {/* Gradient border glow for highlighted */}
              {plan.highlighted && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-indigo-500/20 to-purple-500/10 pointer-events-none" />
              )}

              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/40">
                    <Sparkles className="w-3 h-3" />
                    {plan.badge}
                  </div>
                </div>
              )}

              <div className="relative z-10 flex flex-col h-full">
                {/* Plan name & description */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-white/40 text-sm">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={yearly ? "yearly" : "monthly"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-4xl font-black text-white"
                      >
                        ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-white/40 text-sm mb-1">/mo</span>
                  </div>
                  {yearly && plan.yearlyPrice > 0 && (
                    <p className="text-white/30 text-xs mt-1">
                      Billed as ${plan.yearlyPrice * 12}/year
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <div
                        className={cn(
                          "mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0",
                          plan.highlighted
                            ? "bg-gradient-to-br from-indigo-500 to-purple-500"
                            : "bg-white/10"
                        )}
                      >
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span className="text-white/70 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  size="lg"
                  className={cn(
                    "w-full h-12 rounded-xl font-semibold group transition-all duration-300",
                    plan.highlighted
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 shadow-lg shadow-indigo-500/25"
                      : "bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/25"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-white/30 text-sm mt-8"
        >
          All plans include SSL encryption, GDPR compliance, and 99.9% uptime SLA.
        </motion.p>
      </div>
    </section>
  );
}
