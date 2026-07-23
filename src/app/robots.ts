import type { MetadataRoute } from "next";
import { huidigeSiteVariant } from "@/lib/site-varianten";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const variant = await huidigeSiteVariant();
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `https://${variant.domein}/sitemap.xml`,
  };
}
