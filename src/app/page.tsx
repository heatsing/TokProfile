import type { Metadata } from "next";

import { DownloaderLandingPage } from "@/components/downloader/downloader-landing-page";
import { buildToolPageMetadata } from "@/services/content/tool-page-seo";
import { requireToolPage } from "@/services/content/tool-pages";

export async function generateMetadata(): Promise<Metadata> {
  return buildToolPageMetadata(await requireToolPage("tiktok-video-downloader"), {
    route: "/",
  });
}

export default function HomePage() {
  return <DownloaderLandingPage canonicalRoute="/" showBreadcrumb={false} />;
}
