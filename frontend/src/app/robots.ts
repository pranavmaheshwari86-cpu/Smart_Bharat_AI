import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://smart-bharat-ai.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/vault/", "/credentials/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
