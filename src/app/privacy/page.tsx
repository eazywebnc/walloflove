import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — WallOfLove",
  description:
    "WallOfLove privacy policy. Learn how we collect, use, and protect your data.",
  metadataBase: new URL("https://walloflove.eazyweb.nc"),
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "**Account data:** When you sign up, we collect your email address and display name via Supabase Auth. You may optionally provide a profile picture.",
      "**Testimonial data:** Content submitted through your collection forms — text, name, photo, star rating, and video testimonials — is stored in our Supabase database.",
      "**Usage data:** We collect anonymised analytics (page views, feature interactions) to improve the product. No personally identifiable information is included.",
      "**Technical data:** IP address, browser type, device type, and referral source collected automatically when you use the service.",
    ],
  },
  {
    title: "2. How We Use Your Data",
    content: [
      "To provide and operate the WallOfLove service, including your testimonial walls and embed widgets.",
      "To authenticate you securely and maintain your session.",
      "To send transactional emails (new testimonial alerts, account notifications). You may opt out at any time.",
      "To improve product features based on aggregated usage patterns.",
      "To comply with legal obligations.",
    ],
  },
  {
    title: "3. Data Storage & Security",
    content: [
      "All data is stored in Supabase (PostgreSQL) hosted on secure cloud infrastructure. Data is encrypted at rest and in transit via TLS/HTTPS.",
      "Testimonial media files (images, videos) are stored in Supabase Storage with access controls per wall.",
      "We apply row-level security policies to ensure users can only access their own data.",
      "We retain your data for as long as your account is active. You may request deletion at any time.",
    ],
  },
  {
    title: "4. Cookies",
    content: [
      "**Authentication cookies:** We use secure, HTTP-only cookies to maintain your login session via Supabase Auth.",
      "**Preference cookies:** We may store UI preferences (theme, language) in localStorage.",
      "**Analytics cookies:** We use privacy-respecting analytics that do not track individuals across sites.",
      "You can disable cookies in your browser settings, but this may affect functionality.",
    ],
  },
  {
    title: "5. Data Sharing",
    content: [
      "We do not sell, rent, or trade your personal data.",
      "We share data only with trusted subprocessors required to operate the service: Supabase (database & auth), Cloudflare (CDN & edge), and Stripe (payments).",
      "We may disclose data if required by law or to protect our legal rights.",
    ],
  },
  {
    title: "6. Your Rights (GDPR & Privacy)",
    content: [
      "**Access:** Request a copy of all personal data we hold about you.",
      "**Rectification:** Correct inaccurate or incomplete data.",
      "**Erasure:** Request deletion of your account and all associated data.",
      "**Portability:** Export your testimonial data in JSON or CSV format.",
      "**Objection:** Object to processing based on legitimate interests.",
      "To exercise these rights, email us at contact@eazyweb.nc. We respond within 30 days.",
    ],
  },
  {
    title: "7. Third-Party Embeds",
    content: [
      "WallOfLove embed widgets are served from our CDN. When visitors view an embedded wall, their IP and browser data are processed by Cloudflare.",
      "Embedded walls do not set third-party tracking cookies on your visitors' browsers.",
    ],
  },
  {
    title: "8. Children's Privacy",
    content: [
      "WallOfLove is not directed at children under 16. We do not knowingly collect personal data from minors. If you believe a child has submitted data, contact us immediately.",
    ],
  },
  {
    title: "9. Changes to This Policy",
    content: [
      "We may update this policy to reflect changes in our practices or legal requirements. We will notify you via email or in-app notice at least 14 days before material changes take effect.",
    ],
  },
  {
    title: "10. Contact",
    content: [
      "EazyWebNC — contact@eazyweb.nc",
      "Nouméa, New Caledonia",
      "eazyweb.nc",
    ],
  },
];

export default function PrivacyPage() {
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
          Privacy{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Policy
          </span>
        </h1>
        <p className="text-lg text-white/60 max-w-2xl">
          WallOfLove is operated by EazyWebNC. This policy explains what data we
          collect, how we use it, and your rights as a user.
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
                  <li key={i} className="text-white/70 leading-relaxed text-sm">
                    {item.startsWith("**") ? (
                      <span>
                        <span className="font-semibold text-white/90">
                          {item.match(/\*\*(.*?)\*\*/)?.[1]}
                        </span>
                        {item.replace(/\*\*(.*?)\*\*/, "")}
                      </span>
                    ) : (
                      item
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-center">
          <p className="text-white/70 mb-4">
            Questions about your privacy? We&apos;re happy to help.
          </p>
          <a
            href="mailto:contact@eazyweb.nc"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium text-sm hover:from-indigo-500 hover:to-purple-500 transition-all"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
