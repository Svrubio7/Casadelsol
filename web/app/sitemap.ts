import type { MetadataRoute } from "next";
import { getProperties, mediaUrl } from "@/lib/api";

const SITE = "https://casadelsolholidays.es";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/properties`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE}/cookie-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  let properties: MetadataRoute.Sitemap = [];
  try {
    const list = await getProperties();
    properties = list.map((p) => ({
      url: `${SITE}/apartments/${p.id}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: p.main_image ? [mediaUrl(p.main_image)] : undefined,
    }));
  } catch {
    // If Supabase is unreachable at build time, still emit the static routes.
  }

  return [...staticRoutes, ...properties];
}
