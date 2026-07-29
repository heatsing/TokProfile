import type { Metadata, Viewport } from "next";
import "@/app/globals.css";

import { publicEnv } from "@/config/env";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: {
    default: "TokLens — TikTok Viewer & Creator Analytics",
    template: "%s | TokLens",
  },
  description:
    "Explore public TikTok profiles, understand creator growth, and research content performance with privacy-first creator intelligence.",
  applicationName: siteConfig.name,
  keywords: [
    "TikTok viewer",
    "TikTok analytics",
    "creator analytics",
    "TikTok profile viewer",
    "influencer research",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "TokLens",
    title: "TokLens — See what is moving on TikTok",
    description:
      "Public TikTok discovery and creator intelligence, in one focused workspace.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TokLens — TikTok Viewer & Creator Analytics",
    description: "Explore public content, compare creators, and spot growth signals.",
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
