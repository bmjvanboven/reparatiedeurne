import type { Metadata } from "next";
import { sorteerVestigingenVoor } from "@/lib/locations";
import { huidigeSiteVariant } from "@/lib/site-varianten";

export async function generateMetadata(): Promise<Metadata> {
  const variant = await huidigeSiteVariant();
  return {
    title: "Contact",
    description: `Neem contact op met Telecombinatie in ${variant.stad} en omgeving, of loop gewoon binnen.`,
    keywords: [
      "contact Telecombinatie",
      `reparatiewinkel ${variant.stad}`,
      "reparatiewinkel Deurne",
      "reparatiewinkel Gemert",
      "reparatiewinkel Veghel",
      "reparatiewinkel Geldrop",
      "openingstijden telefoonwinkel",
    ],
  };
}

export default async function ContactPage() {
  const variant = await huidigeSiteVariant();
  const vestigingen = sorteerVestigingenVoor(variant.stad);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-3 text-2xl font-bold text-neutral-900 sm:text-3xl">Contact</h1>
      <p className="mb-10 max-w-2xl text-neutral-600">
        Vragen over een reparatie, een afspraak maken of gewoon even langskomen? Onze vier
        vestigingen helpen je graag verder.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {vestigingen.map(v => (
          <div key={v.plaats} className="rounded-xl border border-neutral-200 p-5">
            <h2 className="mb-2 text-lg font-bold text-tc-paars leading-tight">
              Telecombinatie
              <br />
              {v.plaats}
            </h2>
            <p className="text-sm text-neutral-600">
              {v.straat}
              <br />
              {v.postcode}
            </p>
            <p className="mt-3 text-sm text-neutral-600">
              <a href={`tel:${v.telefoon.replace(/\s+/g, "")}`} className="hover:text-tc-paars">
                {v.telefoon}
              </a>
              <br />
              <a href={`mailto:${v.email}`} className="hover:text-tc-paars">
                {v.email}
              </a>
            </p>
            {v.mapsUrl && (
              <a
                href={v.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-semibold text-tc-paars hover:underline"
              >
                Route via Google Maps
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
