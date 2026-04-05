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
  ],
  openGraph: {
    title: "WallOfLove — Collect & Display Testimonials That Convert",
    description:
      "Collect, manage, and showcase stunning customer testimonials. Embed a beautiful wall of love on your site in one line of code.",
    type: "website",
  },
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
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        {children}
      </body>
    </html>
  );
}
