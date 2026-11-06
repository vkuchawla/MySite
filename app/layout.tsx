import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";

// Display — a characterful grotesque, set huge and tight.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

// Body — a quiet, precise humanist sans.
const sans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Spec — monospace, the measurement voice shared across every craft.
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const SITE_URL = "https://vedant-chawla.vercel.app";
const TITLE = "Vedant Chawla — Product Manager & DJ (V.C. Beats)";
const DESCRIPTION =
  "Product manager by day; producer and live DJ the rest of the time. As V.C. Beats, I make the mixtapes collegiate South Asian dance teams compete to. Based in Atlanta.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: "%s · Vedant Chawla" },
  description: DESCRIPTION,
  keywords: [
    "Vedant Chawla",
    "V.C. Beats",
    "DJ",
    "producer",
    "Raas",
    "Garba",
    "Bhangra",
    "Bollywood fusion",
    "Product Manager",
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
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
