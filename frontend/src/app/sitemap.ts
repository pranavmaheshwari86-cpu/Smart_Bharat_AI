import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://smart-bharat-ai.vercel.app";

  const staticRoutes = [
    "",
    "/assistant",
    "/schemes",
    "/id",
    "/complaints",
    "/credentials",
    "/tracker",
    "/ai",
    "/framework",
    "/standards",
    "/security",
    "/privacy",
    "/terms",
    "/login",
    "/signup",
  ];

  const schemeIds = [
    "pm-vidya-lakshmi",
    "central-sector-scholarship",
    "pm-yasasvi",
    "kisan-credit-card",
    "pm-fasal-bima-yojana",
    "sub-mission-agricultural-mechanization",
    "pm-krishi-sinchayee-yojana",
    "pm-kisan-samman-nidhi",
    "ayushman-bharat",
    "pm-awas-yojana",
    "digital-india-internship",
    "swachh-bharat-mission",
  ];

  const routes: MetadataRoute.Sitemap = [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1.0 : 0.8,
    })),
    ...schemeIds.map((id) => ({
      url: `${baseUrl}/schemes/${id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];

  return routes;
}
