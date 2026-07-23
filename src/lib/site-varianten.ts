import { headers } from "next/headers";

export type SiteVariant = {
  domein: string;
  siteNaam: string;
  stad: string;
  /** Voert deze stad zelf reparaties uit? Zo niet, dan claimt de reparatie-tekst dat niet. */
  directeReparaties: boolean;
  /** Code uit Google Search Console (per domein een eigen property/code). */
  googleSiteVerificatie?: string;
};

const VARIANTEN: SiteVariant[] = [
  { domein: "reparatiegemert.nl", siteNaam: "reparatiegemert", stad: "Gemert", directeReparaties: true },
  {
    domein: "reparatiegeldrop.nl",
    siteNaam: "reparatiegeldrop",
    stad: "Geldrop",
    directeReparaties: true,
    googleSiteVerificatie: "WzqqSVXCWrCEtnthQl6sXeGDsfzRTrmS15zr5ercgxE",
  },
  { domein: "reparatieveghel.nl", siteNaam: "reparatieveghel", stad: "Veghel", directeReparaties: false },
  { domein: "reparatieasten.nl", siteNaam: "reparatieasten", stad: "Asten", directeReparaties: false },
];

const STANDAARD: SiteVariant = {
  domein: "reparatiedeurne.nl",
  siteNaam: "reparatiedeurne",
  stad: "Deurne",
  directeReparaties: true,
  googleSiteVerificatie: "wKhBsIkWR49Mc_RrbFj5ukZ7H94_-PaLGUvku-SrNOM",
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

/** Steden met een eigen iPhone-reparatie SEO-landingspagina (src/app/iphone-reparatie-<slug>). */
export const IPHONE_LANDINGSPAGINAS: Record<string, string> = {
  Deurne: "iphone-reparatie-deurne",
  Geldrop: "iphone-reparatie-geldrop",
  Gemert: "iphone-reparatie-gemert",
};

export function naarLijst(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} & ${items[items.length - 1]}`;
}

/** Zet de eigen stad vooraan in de lijst reparatiesteden (voor de paginatitel). */
export function reparatieStedenVolgorde(variant: SiteVariant, reparatieSteden: string[]): string[] {
  return [variant.stad, ...reparatieSteden.filter(p => p !== variant.stad)];
}

/** Eén gedeelde afbeelding voor Open Graph/Twitter-previews (public/og-image.png, 1200x1200). */
const OG_AFBEELDING = { url: "/og-image.png", width: 1200, height: 1200, alt: "Telecombinatie" };

/** Open Graph + Twitter-metadata voor een pagina, met dezelfde titel/omschrijving als de gewone metadata. */
export function socialMetadata(variant: SiteVariant, titel: string, beschrijving: string) {
  return {
    openGraph: {
      type: "website" as const,
      locale: "nl_NL",
      siteName: `Telecombinatie ${variant.stad}`,
      title: titel,
      description: beschrijving,
      images: [OG_AFBEELDING],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: titel,
      description: beschrijving,
      images: [OG_AFBEELDING.url],
    },
  };
}
