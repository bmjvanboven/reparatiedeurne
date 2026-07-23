import type { Metadata } from "next";
import Link from "next/link";
import { haalReparatieData, platteToestellenlijst } from "@/lib/toolbox";
import { SearchBar } from "@/components/SearchBar";
import { FeaturedDevices } from "@/components/FeaturedDevices";
import { HomeBackground } from "@/components/HomeBackground";
import { WaaromBlok } from "@/components/WaaromBlok";
import { ReviewsBlok } from "@/components/ReviewsBlok";
import {
  huidigeSiteVariant,
  naarLijst,
  reparatieStedenVolgorde,
  socialMetadata,
  IPHONE_LANDINGSPAGINAS,
} from "@/lib/site-varianten";
import { REPARATIE_VESTIGINGEN } from "@/lib/locations";

export async function generateMetadata(): Promise<Metadata> {
  const variant = await huidigeSiteVariant();
  const reparatieSteden = REPARATIE_VESTIGINGEN.map(v => v.plaats);
  const stedenVolgorde = reparatieStedenVolgorde(variant, reparatieSteden);

  const description = variant.directeReparaties
    ? `Reparatie van smartphones en tablets bij Telecombinatie in ${variant.stad} en omgeving. Zoek je toestel en bekijk direct de reparatieprijzen.`
    : `Telecombinatie in ${variant.stad} — bekijk de reparatieprijzen van onze vestigingen in ${naarLijst(reparatieSteden)}.`;
  const titel = `Reparatie ${naarLijst(stedenVolgorde)} | Telecombinatie`;

  return {
    description,
    keywords: [
      ...(variant.directeReparaties
        ? [`reparatiewinkel ${variant.stad}`, `telefoon reparatie ${variant.stad}`]
        : [`Telecombinatie ${variant.stad}`]),
      "smartphone reparatie Gemert",
      "iPhone reparatie Geldrop",
      "Samsung reparatie",
      "scherm reparatie",
      "accu vervangen",
    ],
    alternates: {
      canonical: "/",
    },
    ...socialMetadata(variant, titel, description),
  };
}

const UITGELICHT = [
  { merkKey: "apple", modelKey: "ip16pm" },
  { merkKey: "apple", modelKey: "ip16" },
  { merkKey: "apple", modelKey: "ip16p" },
  { merkKey: "apple", modelKey: "ip15" },
  { merkKey: "apple", modelKey: "ip14" },
  { merkKey: "apple", modelKey: "ip13" },
  { merkKey: "samsung", modelKey: "galaxys24ultra" },
  { merkKey: "samsung", modelKey: "galaxys24" },
  { merkKey: "samsung", modelKey: "galaxys23" },
  { merkKey: "samsung", modelKey: "galaxya55" },
  { merkKey: "samsung", modelKey: "galaxya35" },
  { merkKey: "overig", modelKey: "huaweip30" },
  { merkKey: "tablets", modelKey: "ipad2020" },
  { merkKey: "tablets", modelKey: "ipadair2" },
];

export default async function HomePage() {
  const [data, variant] = await Promise.all([haalReparatieData(), huidigeSiteVariant()]);

  return (
    <>
      <HomeBackground />
      <div className="mx-auto max-w-6xl px-4">
        <section className="py-14 sm:py-20 text-center">
          <h1 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
            Reparatie van je smartphone of tablet, snel en vakkundig
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-neutral-500">
            Telecombinatie repareert Apple, Samsung en overige toestellen bij een vestiging in de
            buurt.
          </p>
          <div className="mx-auto mt-8 flex justify-center">
            {data ? (
              <SearchBar toestellen={platteToestellenlijst(data)} />
            ) : (
              <p className="text-sm text-red-700">
                Zoeken is momenteel niet beschikbaar. Probeer het later opnieuw.
              </p>
            )}
          </div>
          <p className="mt-3 text-sm text-neutral-400">
            Niet zeker welk toestel je hebt? Neem contact op, wij helpen je graag verder.
          </p>
          {IPHONE_LANDINGSPAGINAS[variant.stad] && (
            <p className="mt-2 text-sm text-neutral-400">
              <Link
                href={`/${IPHONE_LANDINGSPAGINAS[variant.stad]}`}
                className="font-semibold text-tc-paars hover:underline"
              >
                Meer over iPhone reparatie in {variant.stad} →
              </Link>
            </p>
          )}
        </section>

        <section className="pb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-neutral-900">Uitgelichte toestellen</h2>
            <Link href="/reparatieprijzen" className="text-sm font-semibold text-tc-paars hover:underline">
              Alle reparatieprijzen →
            </Link>
          </div>
          {data ? (
            <FeaturedDevices data={data} toestellen={UITGELICHT} />
          ) : (
            <p className="text-sm text-neutral-500">Toestellen konden niet worden geladen.</p>
          )}
        </section>

        <WaaromBlok variant={variant} />
        <ReviewsBlok />
      </div>
    </>
  );
}
