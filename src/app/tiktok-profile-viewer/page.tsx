import type { Metadata } from "next";
import { UserRound } from "lucide-react";

import { ProfileViewerResult } from "@/components/profile-viewer/profile-result";
import { ToolInput } from "@/components/utility-tool/tool-input";
import { ToolLanding } from "@/components/utility-tool/tool-landing";
import { publicEnv } from "@/config/env";
import { profileViewerContent } from "@/data/navigation-tool-content";
import { createProfileViewerState, resolveProfileViewTab } from "@/lib/profile-viewer";
import {
  buildToolPageMetadata,
  buildToolPageStructuredData,
} from "@/services/content/tool-page-seo";
import { requireToolPage } from "@/services/content/tool-pages";
import { tiktokToolEngine } from "@/services/tiktok";

export async function generateMetadata(): Promise<Metadata> {
  const page = await requireToolPage("tiktok-profile-viewer");
  return {
    ...buildToolPageMetadata(page, { noindex: true, route: "/profile-viewer" }),
    description: profileViewerContent.description,
  };
}

export default async function TikTokProfileViewerPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[]; tab?: string | string[] }>;
}) {
  const { q, tab } = await searchParams;
  const page = await requireToolPage("tiktok-profile-viewer");
  const structuredData = buildToolPageStructuredData(
    { ...page, intro: profileViewerContent.description, faq: profileViewerContent.faq },
    publicEnv.siteUrl,
    { route: "/profile-viewer" },
  );
  const input = typeof q === "string" ? q.trim() : "";
  const result = input
    ? await tiktokToolEngine.run({ input, tool: "profile" })
    : undefined;
  const viewerState = createProfileViewerState(result);
  const activeTab = resolveProfileViewTab(typeof tab === "string" ? tab : undefined);

  return (
    <ToolLanding
      content={profileViewerContent}
      icon={UserRound}
      workspace={<ToolInput kind="profile" defaultValue={input} key={input} />}
      result={
        input ? (
          <ProfileViewerResult activeTab={activeTab} input={input} state={viewerState} />
        ) : undefined
      }
    >
      {structuredData.map((entry) => (
        <script
          key={entry["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entry).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </ToolLanding>
  );
}
