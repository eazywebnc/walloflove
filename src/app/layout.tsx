import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "WallOfLove — Collect & Display Testimonials That Convert",
  description:
    "Collect and showcase stunning customer testimonials. Embed a beautiful wall of love on your site in one line of code. Free to start.",
  keywords: [
    "testimonials",
    "social proof",
    "customer reviews",
    "wall of love",
    "embed testimonials",
    "testimonial widget",
    "testimonials widget free",
    "social proof widget",
    "social proof wall",
    "collect testimonials",
    "customer review embed",
    "testimonial collection tool",
    "embed reviews on website",
  ],
  authors: [{ name: "EazyWebNC", url: "https://eazyweb.nc" }],
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  metadataBase: new URL("https://walloflove.eazyweb.nc"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WallOfLove — Collect & Display Testimonials That Convert",
    description:
      "Collect, manage, and showcase stunning customer testimonials. Embed a beautiful wall of love on your site in one line of code.",
    url: "https://walloflove.eazyweb.nc",
    siteName: "WallOfLove",
    type: "website",
    locale: "en_US",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WallOfLove — Collect & Display Testimonials That Convert",
    description:
      "Collect, manage, and showcase stunning customer testimonials. Embed a beautiful wall of love on your site in one line of code.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "WallOfLove",
      url: "https://walloflove.eazyweb.nc",
      publisher: {
        "@type": "Organization",
        name: "EazyWebNC",
        url: "https://eazyweb.nc",
        logo: { "@type": "ImageObject", url: "https://eazyweb.nc/logo.png" },
        sameAs: [
          "https://www.facebook.com/eazywebnc",
          "https://www.linkedin.com/company/eazywebnc",
          "https://x.com/eazywebnc",
        ],
      },
    },
    {
      "@type": "SoftwareApplication",
      name: "WallOfLove",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Testimonial Management",
      operatingSystem: "Web",
      url: "https://walloflove.eazyweb.nc",
      description:
        "Collect, manage, and showcase stunning customer testimonials. Embed a beautiful wall of love on your site in one line of code.",
      featureList:
        "Testimonial collection forms, Embeddable wall widget, Social proof display, Video testimonials, Custom branding, Analytics dashboard",
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "0",
        highPrice: "49",
        priceCurrency: "USD",
        offerCount: "3",
      },
      creator: {
        "@type": "Organization",
        name: "EazyWebNC",
        url: "https://eazyweb.nc",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is WallOfLove?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "WallOfLove is a testimonial collection and display platform that lets you embed a beautiful wall of customer reviews on your website with a single line of code.",
          },
        },
        {
          "@type": "Question",
          name: "Is WallOfLove free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes! WallOfLove offers a free plan to get started. You can upgrade to Pro or Scale plans for more features and higher limits.",
          },
        },
        {
          "@type": "Question",
          name: "How do I embed testimonials on my website?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Simply create a wall, collect testimonials, and copy the embed code. Paste it into your website HTML and your testimonials will display automatically.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dmSerifDisplay.variable} dark h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-pink-500 focus:text-white focus:rounded-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <main id="main-content" role="main" aria-label="Main content">
          {children}
        </main>
      </body>
    </html>
  );
}
