import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://reparatiedeurne.nl";
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/reparatieprijzen`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/verkoop-je-iphone`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];
}
