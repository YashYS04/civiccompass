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

/** SEO-optimized metadata for Civic Compass AI */
export const metadata: Metadata = {
  title: "Civic Compass AI | India Election Guide",
  description:
    "AI-powered guide to Indian election processes, voter eligibility, EVM education, and polling booth locations.",
  keywords: ["India elections", "voter guide", "EVM", "VVPAT", "ECI", "voter ID"],
};

/**
 * RootLayout — Wraps all pages with global fonts, CSS, and accessibility features.
 * Includes a skip-to-content link for keyboard navigation (WCAG 2.1 Level AA).
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
