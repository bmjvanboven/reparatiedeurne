export type Vestiging = {
  plaats: string;
  naam: string;
  straat: string;
  postcode: string;
  telefoon: string;
  email: string;
  mapsUrl?: string;
};

export const VESTIGINGEN: Vestiging[] = [
  {
    plaats: "Deurne",
    naam: "Telecombinatie Deurne",
    straat: "Wolfsberg 1",
    postcode: "5751 GX Deurne",
    telefoon: "0493 313307",
    email: "repair@telecombinatiedeurne.nl",
    mapsUrl: "https://goo.gl/maps/DtrqRUCKTE5Ufvwm8",
  },
  {
    plaats: "Gemert",
    naam: "Telecombinatie Gemert",
    straat: "Nieuwstraat 40a",
    postcode: "5421 KP Gemert",
    telefoon: "0492 368 826",
    email: "repair@telecombinatiegemert.nl",
    mapsUrl: "https://g.page/telecombinatiegemert?share",
  },
  {
    plaats: "Veghel",
    naam: "Telecombinatie Veghel",
    straat: "Kalverstraat 12",
    postcode: "5461 JL Veghel",
    telefoon: "0413 321 111",
    email: "info@telecombinatieveghel.nl",
    mapsUrl: "https://maps.app.goo.gl/HX5isguQkHaXVvpV8",
  },
  {
    plaats: "Geldrop",
    naam: "Telecombinatie Geldrop",
    straat: "Langstraat 16",
    postcode: "5664 GG Geldrop",
    telefoon: "040 286 8020",
    email: "info@telecombinatiegeldrop.nl",
    mapsUrl: "https://g.page/telecombinatie-geldrop?share",
  },
];

/** Zet de vestiging van `plaats` vooraan, voor lokale relevantie op stad-specifieke domeinen. */
export function sorteerVestigingenVoor(plaats: string): Vestiging[] {
  const index = VESTIGINGEN.findIndex(v => v.plaats === plaats);
  if (index <= 0) return VESTIGINGEN;
  return [VESTIGINGEN[index], ...VESTIGINGEN.slice(0, index), ...VESTIGINGEN.slice(index + 1)];
}
