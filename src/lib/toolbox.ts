export type ReparatieItem = {
  categorie: string;
  naam: string;
  prijs: number;
};

export type ReparatieModel = {
  key: string;
  label: string;
  groep: string | null;
  reparaties: ReparatieItem[];
};

export type ReparatieMerk = {
  key: string;
  label: string;
  modellen: ReparatieModel[];
};

export type ReparatieData = {
  bijgewerkt: string;
  merken: ReparatieMerk[];
};

const TOOLBOX_API_URL = process.env.TOOLBOX_API_URL ?? "https://app.tctoolbox.nl";
const TOOLBOX_API_KEY = process.env.TOOLBOX_API_KEY;

/**
 * Server-side only: de publieke Toolbox-API kent geen CORS-headers, dus dit
 * moet altijd vanaf de server aangeroepen worden (Server Component), nooit
 * vanuit client-side JS in de browser.
 */
export async function haalReparatieData(): Promise<ReparatieData | null> {
  if (!TOOLBOX_API_KEY) {
    console.error("TOOLBOX_API_KEY ontbreekt in de environment variables");
    return null;
  }

  try {
    const res = await fetch(`${TOOLBOX_API_URL}/api/public/reparatieprijzen`, {
      headers: { "X-Api-Key": TOOLBOX_API_KEY },
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as ReparatieData;
  } catch {
    return null;
  }
}

export type ToestelZoekResultaat = {
  merkKey: string;
  merkLabel: string;
  modelKey: string;
  modelLabel: string;
};

export function platteToestellenlijst(data: ReparatieData): ToestelZoekResultaat[] {
  return data.merken.flatMap(merk =>
    merk.modellen.map(model => ({
      merkKey: merk.key,
      merkLabel: merk.label,
      modelKey: model.key,
      modelLabel: model.label,
    })),
  );
}

export type ModelGroep = {
  groep: string | null;
  modellen: ReparatieModel[];
};

export function groepeerModellen(modellen: ReparatieModel[]): ModelGroep[] {
  const groepen: ModelGroep[] = [];
  const perGroep = new Map<string | null, ModelGroep>();
  for (const model of modellen) {
    const bestaande = perGroep.get(model.groep);
    if (bestaande) {
      bestaande.modellen.push(model);
    } else {
      const nieuw: ModelGroep = { groep: model.groep, modellen: [model] };
      groepen.push(nieuw);
      perGroep.set(model.groep, nieuw);
    }
  }
  return groepen;
}
