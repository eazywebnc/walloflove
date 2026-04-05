import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — WallOfLove",
  description:
    "WallOfLove terms of service. Read the rules and conditions governing your use of the platform.",
  metadataBase: new URL("https://walloflove.eazyweb.nc"),
  alternates: { canonical: "/terms" },
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      'By creating an account or using WallOfLove ("the Service"), you agree to these Terms of Service. If you do not agree, do not use the Service.',
      "These terms are governed by the laws of New Caledonia (French legal framework). Disputes shall be resolved in the courts of Nouméa.",
    ],
  },
  {
    title: "2. Description of Service",
    content: [
      "WallOfLove is a SaaS platform that enables businesses to collect customer testimonials via shareable forms, manage them in a dashboard, and display them on their website via an embed widget.",
      "The Service is operated by EazyWebNC, based in Nouméa, New Caledonia.",
    ],
  },
  {
    title: "3. Account Responsibilities",
    content: [
      "You must provide accurate information when creating an account.",
      "You are responsible for maintaining the security of your account credentials. Do not share your password.",
      "You are responsible for all activity that occurs under your account.",
      "You must be at least 16 years old to use the Service.",
      "One person or legal entity may not maintain more than one free account.",
    ],
  },
  {
    title: "4. Acceptable Use",
    content: [
      "You may use WallOfLove only for lawful purposes and in compliance with these Terms.",
      "You must not use the Service to collect fake, fabricated, or misleading testimonials.",
      "You must not use the Service to collect testimonials from individuals without their genuine consent.",
      "You must not attempt to reverse-engineer, scrape, or abuse the platform or its API.",
      "You must not use the Service for any activity that violates applicable laws or regulations.",
    ],
  },
  {
    title: "5. Content & Intellectual Property",
    content: [
      "You retain ownership of testimonials and other content you collect through the Service.",
      "By using the Service, you grant EazyWebNC a limited license to store, process, and display your content solely to provide the Service.",
      "WallOfLove's branding, UI, codebase, and proprietary technology remain the exclusive property of EazyWebNC.",
      "You may not reproduce or redistribute WallOfLove's interface, embed code, or assets without written permission.",
    ],
  },
  {
    title: "6. Plans, Billing & Cancellation",
    content: [
      "WallOfLove offers Free, Pro, and Scale plans. Plan details and pricing are listed on the pricing page.",
      "Paid plans are billed monthly or annually via Stripe. All prices are in USD unless stated otherwise.",
      "You may cancel your subscription at any time. Access continues until the end of the billing period. No refunds are issued for partial periods.",
      "We reserve the right to change pricing with 30 days' notice. Existing subscribers will not be affected mid-period.",
    ],
  },
  {
    title: "7. Free Plan Limits",
    content: [
      "Free accounts are subject to usage limits (number of testimonials, walls, and monthly submissions) as defined on the pricing page.",
      "We reserve the right to adjust free plan limits with reasonable notice.",
    ],
  },
  {
    title: "8. Service Availability & SLA",
    content: [
      "We aim for 99.9% uptime but do not guarantee uninterrupted service. Scheduled maintenance will be announced in advance.",
      "We are not liable for downtime caused by third-party infrastructure providers (Supabase, Cloudflare, etc.).",
    ],
  },
  {
    title: "9. Termination",
    content: [
      "We reserve the right to suspend or terminate accounts that violate these Terms, with or without notice.",
      "You may delete your account at any time from your dashboard settings. Data is permanently deleted within 30 days.",
      "Upon termination, your embed widgets will stop functioning. We recommend exporting your testimonial data before deleting your account.",
    ],
  },
  {
    title: "10. Disclaimer of Warranties",
    content: [
      'The Service is provided "as is" without warranty of any kind. EazyWebNC disclaims all warranties, express or implied, including merchantability and fitness for a particular purpose.',
      "We do not warrant that testimonials collected are authentic, accurate, or representative.",
    ],
  },
  {
    title: "11. Limitation of Liability",
    content: [
      "To the maximum extent permitted by law, EazyWebNC shall not be liable for indirect, incidental, or consequential damages arising from your use of the Service.",
      "Our total liability shall not exceed the amount you paid in the 12 months preceding the claim.",
    ],
  },
  {
    title: "12. Changes to Terms",
    content: [
      "We may update these Terms at any time. Material changes will be communicated by email or in-app notice at least 14 days in advance.",
      "Continued use of the Service after changes constitutes acceptance of the new Terms.",
    ],
  },
  {
    title: "13. Contact",
    content: [
      "EazyWebNC — contact@eazyweb.nc",
      "Nouméa, New Caledonia",
      "eazyweb.nc",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to WallOfLove
          </Link>
          <div className="text-sm text-white/40">Last updated: April 2026</div>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-6">
          Legal
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Terms of{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Service
          </span>
        </h1>
        <p className="text-lg text-white/60 max-w-2xl">
          Please read these terms carefully before using WallOfLove. They govern
          your access to and use of the platform operated by EazyWebNC.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        <div className="space-y-10">
          {sections.map((section) => (
            <div
              key={section.title}
              className="border border-white/10 rounded-2xl p-8 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <h2 className="text-xl font-semibold mb-5 text-white">
                {section.title}
              </h2>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li
                    key={i}
                    className="text-white/70 leading-relaxed text-sm flex gap-3"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500/60 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="mt-12 flex flex-wrap gap-4 items-center justify-between p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <p className="text-white/50 text-sm">
            Also review our{" "}
            <Link
              href="/privacy"
              className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2"
            >
              Privacy Policy
            </Link>
          </p>
          <a
            href="mailto:contact@eazyweb.nc"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            contact@eazyweb.nc
          </a>
        </div>
      </div>
    </div>
  );
}
