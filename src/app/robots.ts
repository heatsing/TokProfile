import type { MetadataRoute } from "next";

import { publicEnv } from "@/config/env";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = publicEnv.siteUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
