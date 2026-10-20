import type { MetadataRoute } from "next";

import { legalNav, siteConfig } from "@/config/site";

const routes = ["", "/ozellikler", "/basvuru", "/hakkimizda", "/iletisim"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...routes.map((route) => ({
      url: `${siteConfig.url}${route}`,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...legalNav.map((item) => ({
      url: `${siteConfig.url}${item.href}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
