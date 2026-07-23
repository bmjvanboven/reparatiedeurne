import { headers } from "next/headers";

export type SiteVariant = {
  domein: string;
  siteNaam: string;
  stad: string;
};

const VARIANTEN: SiteVariant[] = [
  { domein: "reparatiegemert.nl", siteNaam: "reparatiegemert", stad: "Gemert" },
  { domein: "reparatiegeldrop.nl", siteNaam: "reparatiegeldrop", stad: "Geldrop" },
];

const STANDAARD: SiteVariant = {
  domein: "reparatiedeurne.nl",
  siteNaam: "reparatiedeurne",
  stad: "Deurne",
};

export function bepaalSiteVariant(host: string | null): SiteVariant {
  if (!host) return STANDAARD;
  const schoneHost = host.replace(/^www\./, "").split(":")[0].toLowerCase();
  return VARIANTEN.find(v => schoneHost === v.domein || schoneHost.endsWith(`.${v.domein}`)) ?? STANDAARD;
}

export async function huidigeSiteVariant(): Promise<SiteVariant> {
  const h = await headers();
  return bepaalSiteVariant(h.get("host"));
}

export function naarLijst(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} & ${items[items.length - 1]}`;
}
