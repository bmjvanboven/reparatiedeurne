import type { Metadata } from "next";
import { haalReparatieData } from "@/lib/toolbox";
import { ReparatieprijzenApp } from "@/components/ReparatieprijzenApp";
import { huidigeSiteVariant, naarLijst } from "@/lib/site-varianten";
import { REPARATIE_VESTIGINGEN } from "@/lib/locations";

export async function generateMetadata(): Promise<Metadata> {
  const variant = await huidigeSiteVariant();
  const reparatieSteden = REPARATIE_VESTIGINGEN.map(v => v.plaats);

  const description = variant.directeReparaties
    ? `Bekijk direct de actuele reparatieprijzen voor Apple, Samsung en overige smartphones en tablets bij Telecombinatie in ${variant.stad} en omgeving.`
    : `Bekijk direct de actuele reparatieprijzen van Telecombinatie in ${naarLijst(reparatieSteden)}.`;

  return {
    title: "Reparatieprijzen",
    description,
    keywords: [
      "reparatieprijzen",
      "iPhone reparatie prijzen",
      "Samsung reparatie prijzen",
      "scherm vervangen prijs",
      "accu vervangen prijs",
      "tablet reparatie prijzen",
    ],
  };
}

export default async function ReparatieprijzenPage({
  searchParams,
}: {
  searchParams: Promise<{ toestel?: string }>;
}) {
  const [data, params] = await Promise.all([haalReparatieData(), searchParams]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-neutral-900 sm:text-3xl">Reparatieprijzen</h1>
      {data ? (
        <ReparatieprijzenApp data={data} initialToestel={params.toestel} />
      ) : (
        <p className="text-sm text-red-700">
          De reparatieprijzen konden niet worden opgehaald. Neem contact met ons op voor de
          actuele prijzen.
        </p>
      )}
    </div>
  );
}
