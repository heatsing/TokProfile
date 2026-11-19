import type { Metadata, Viewport } from "next";
import "@/app/globals.css";

import { publicEnv } from "@/config/env";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: {
    default: "TokProfile — Clear TikTok Link & Engagement Tools",
    template: "%s | TokProfile",
  },
  description:
    "Check supported public TikTok video links and calculate an estimated engagement rate with clear inputs, formulas and limitations.",
  applicationName: siteConfig.name,
  keywords: [
    "TikTok video link checker",
    "TikTok URL validator",
    "TikTok engagement calculator",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "TokProfile",
    title: "TokProfile — Clear TikTok Link & Engagement Tools",
    description:
      "Validate supported public video links and calculate an estimated engagement rate.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TokProfile — Clear TikTok Link & Engagement Tools",
    description: "Validate supported public video links and show engagement formulas.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFFCF5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
