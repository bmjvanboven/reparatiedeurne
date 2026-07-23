import type { Metadata } from "next";
import Link from "next/link";
import { sorteerVestigingenVoor } from "@/lib/locations";
import { huidigeSiteVariant, socialMetadata } from "@/lib/site-varianten";

export async function generateMetadata(): Promise<Metadata> {
  const variant = await huidigeSiteVariant();
  const titel = `Verkoop je iPhone in ${variant.stad}`;
  const description = `Verkoop je oude iPhone bij Telecombinatie in ${variant.stad} en omgeving. Kom langs voor een eerlijke inschatting.`;

  return {
    title: titel,
    description,
    keywords: [
      "iPhone verkopen",
      "iPhone inruilen",
      "oude iPhone verkopen",
      `telefoon verkopen ${variant.stad}`,
      "telefoon inkoop",
    ],
    alternates: {
      canonical: "/verkoop-je-iphone",
    },
    ...socialMetadata(variant, titel, description),
  };
}

const STAPPEN = [
  {
    titel: "Kom langs of neem contact op",
    tekst:
      "Loop binnen bij een van onze vestigingen of neem contact op, dan bekijken we je toestel samen.",
  },
  {
    titel: "Wij beoordelen je toestel",
    tekst:
      "We controleren de staat, werking en accu van je iPhone en doen op basis daarvan een eerlijk bod.",
  },
  {
    titel: "Uitbetaling binnen 2 weken",
    tekst: "Ga je akkoord met het bod? Dan maken we het bedrag binnen 2 weken over op je rekening.",
  },
];

const VOORWAARDEN = [
  "Toestel is niet vergrendeld met Find My / iCloud-activeringslot",
  "Toestel start op en werkt",
  "Je bent de rechtmatige eigenaar van het toestel",
];

export default async function VerkoopJeIphonePage() {
  const variant = await huidigeSiteVariant();
  const vestigingen = sorteerVestigingenVoor(variant.stad);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-3 text-2xl font-bold text-neutral-900 sm:text-3xl">
        Verkoop je iPhone
      </h1>
      <p className="mb-10 max-w-2xl text-neutral-600">
        Heb je een oude iPhone liggen? Bij Telecombinatie kun je die inruilen voor een eerlijke
        prijs. Omdat de waarde afhangt van het model, de staat en de accuconditie, doen we altijd
        een persoonlijke inschatting — kom langs of neem contact op voor een indicatie.
      </p>

      <div className="grid gap-6 sm:grid-cols-3">
        {STAPPEN.map((stap, i) => (
          <div key={stap.titel} className="rounded-xl border border-neutral-200 p-5">
            <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-tc-paars text-sm font-bold text-white">
              {i + 1}
            </span>
            <h2 className="mb-1.5 font-bold text-neutral-900">{stap.titel}</h2>
            <p className="text-sm text-neutral-600">{stap.tekst}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-xl bg-neutral-50 p-6">
        <h2 className="mb-3 font-bold text-neutral-900">Voorwaarden</h2>
        <ul className="space-y-1.5 text-sm text-neutral-600">
          {VOORWAARDEN.map(v => (
            <li key={v}>• {v}</li>
          ))}
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="mb-4 font-bold text-neutral-900">Kom langs of bel even</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vestigingen.map(v => {
            const isHuidig = v.plaats === variant.stad;
            return (
              <div
                key={v.plaats}
                className={`rounded-xl border p-5 ${
                  isHuidig ? "border-tc-paars bg-white shadow-sm" : "border-neutral-200"
                }`}
              >
                {isHuidig && (
                  <span className="mb-2 inline-block rounded-full bg-tc-paars px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Jouw vestiging
                  </span>
                )}
                <h3 className="mb-2 font-bold text-tc-paars leading-tight">
                  Telecombinatie
                  <br />
                  {v.plaats}
                </h3>
                <p className="text-sm text-neutral-600">{v.straat}</p>
                <a
                  href={`tel:${v.telefoon.replace(/\s+/g, "")}`}
                  className="mt-2 inline-block text-sm font-semibold text-tc-paars hover:underline"
                >
                  {v.telefoon}
                </a>
              </div>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-neutral-500">
          Liever eerst je vraag stellen?{" "}
          <Link href="/contact" className="font-semibold text-tc-paars hover:underline">
            Bekijk onze contactgegevens
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
