import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WallOfLove — Collect & Display Testimonials That Convert",
  description:
    "Collect, manage, and showcase stunning customer testimonials. Embed a beautiful wall of love on your site in one line of code. Turn happy customers into your best marketing.",
  keywords: [
    "testimonials",
    "social proof",
    "customer reviews",
    "wall of love",
    "embed testimonials",
    "testimonial widget",
    "testimonials widget free",
    "social proof widget",
    "customer review embed",
  ],
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
      "@type": "SoftwareApplication",
      name: "WallOfLove",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://walloflove.eazyweb.nc",
      description:
        "Collect, manage, and showcase stunning customer testimonials. Embed a beautiful wall of love on your site in one line of code.",
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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
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
