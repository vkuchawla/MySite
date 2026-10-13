import type { Metadata } from "next";
import {
  Geist,
  Bricolage_Grotesque,
  Instrument_Serif,
  Space_Mono,
} from "next/font/google";
import "./globals.css";

// Body — clean, neutral, lets the warm palette do the talking
const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

// Display — contemporary grotesque with real character (not the serif cliché)
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

// Accent — an editorial serif italic for eyebrows + human asides
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

// Utility — mono for timecodes, track numbers, data (the DJ-set voice)
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

const SITE_URL = "https://vedant-chawla.vercel.app";
const TITLE = "Vedant Chawla — Product Manager & Music Curator";
const DESCRIPTION =
  "Product Manager with 5+ years building enterprise platforms across aviation and technology — and a drummer, DJ, and electronic-music curator. Based in Atlanta, GA.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Vedant Chawla",
  },
  description: DESCRIPTION,
  keywords: [
    "Vedant Chawla",
    "Product Manager",
    "Atlanta",
    "aviation",
    "DJ",
    "drummer",
    "music curator",
    "portfolio",
  ],
  authors: [{ name: "Vedant Chawla", url: SITE_URL }],
  creator: "Vedant Chawla",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Vedant Chawla",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${display.variable} ${serif.variable} ${mono.variable} scroll-smooth`}
    >
      <body>{children}</body>
    </html>
  );
}
