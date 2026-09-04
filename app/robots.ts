import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const preview = process.env.CONTEXT === "deploy-preview" || process.env.CONTEXT === "branch-deploy";
  if (preview) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: [
      { userAgent: "Googlebot", allow: "/" },
      { userAgent: "Bingbot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: "https://exwest.de/sitemap.xml",
    host: "https://exwest.de",
  };
}
