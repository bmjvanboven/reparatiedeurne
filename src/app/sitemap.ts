import type { MetadataRoute } from "next";
import { huidigeSiteVariant } from "@/lib/site-varianten";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const variant = await huidigeSiteVariant();
  const base = `https://${variant.domein}`;
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/reparatieprijzen`, changeFrequency: "daily", priority: 0.9 },
    ...(variant.stad === "Deurne"
      ? [{ url: `${base}/iphone-reparatie-deurne`, changeFrequency: "weekly" as const, priority: 0.8 }]
      : []),
    { url: `${base}/verkoop-je-iphone`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
