import { headers } from "next/headers";

export type SiteVariant = {
  domein: string;
  siteNaam: string;
  stad: string;
  /** Voert deze stad zelf reparaties uit? Zo niet, dan claimt de reparatie-tekst dat niet. */
  directeReparaties: boolean;
};

const VARIANTEN: SiteVariant[] = [
  { domein: "reparatiegemert.nl", siteNaam: "reparatiegemert", stad: "Gemert", directeReparaties: true },
  { domein: "reparatiegeldrop.nl", siteNaam: "reparatiegeldrop", stad: "Geldrop", directeReparaties: true },
  { domein: "reparatieveghel.nl", siteNaam: "reparatieveghel", stad: "Veghel", directeReparaties: false },
  { domein: "reparatieasten.nl", siteNaam: "reparatieasten", stad: "Asten", directeReparaties: false },
];

const STANDAARD: SiteVariant = {
  domein: "reparatiedeurne.nl",
  siteNaam: "reparatiedeurne",
  stad: "Deurne",
  directeReparaties: true,
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

/** Zet de eigen stad vooraan in de lijst reparatiesteden (voor de paginatitel). */
export function reparatieStedenVolgorde(variant: SiteVariant, reparatieSteden: string[]): string[] {
  return [variant.stad, ...reparatieSteden.filter(p => p !== variant.stad)];
}
