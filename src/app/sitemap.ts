import type { MetadataRoute } from "next";
import { huidigeSiteVariant, IPHONE_LANDINGSPAGINAS } from "@/lib/site-varianten";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const variant = await huidigeSiteVariant();
  const base = `https://${variant.domein}`;
  const iphonePagina = IPHONE_LANDINGSPAGINAS[variant.stad];
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/reparatieprijzen`, changeFrequency: "daily", priority: 0.9 },
    ...(iphonePagina
      ? [{ url: `${base}/${iphonePagina}`, changeFrequency: "weekly" as const, priority: 0.8 }]
      : []),
    { url: `${base}/verkoop-je-iphone`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
