import type { Metadata } from "next";
import Link from "next/link";
import { haalReparatieData } from "@/lib/toolbox";
import { VESTIGINGEN } from "@/lib/locations";
import { huidigeSiteVariant, socialMetadata } from "@/lib/site-varianten";

const STAD = "Geldrop";
const VESTIGING = VESTIGINGEN.find(v => v.plaats === STAD)!;

export async function generateMetadata(): Promise<Metadata> {
  const variant = await huidigeSiteVariant();
  const titel = "iPhone Reparatie Geldrop – Scherm, Batterij & Camera";
  const description =
    "iPhone reparatie in Geldrop: scherm vanaf €79, batterij vervangen vanaf €49. Vakkundig gerepareerd bij Telecombinatie, Langstraat 16. Bekijk direct de actuele prijzen.";

  return {
    title: titel,
    description,
    keywords: [
      "iPhone reparatie Geldrop",
      "iPhone scherm reparatie Geldrop",
      "iPhone scherm kapot Geldrop",
      "iPhone batterij vervangen Geldrop",
      "iPhone accu vervangen Geldrop",
      "telefoon reparatie Geldrop",
    ],
    alternates: {
      canonical: "/iphone-reparatie-geldrop",
    },
    ...socialMetadata(variant, titel, description),
  };
}

const FAQS = [
  {
    vraag: "Wat kost een iPhone scherm reparatie in Geldrop?",
    antwoord:
      "Een iPhone schermreparatie bij Telecombinatie Geldrop kost tussen de €79 en €449 met een origineel scherm, afhankelijk van je model. Voor de meeste modellen bieden we ook een voordeliger namaakscherm aan. Bekijk de prijs van jouw model op onze reparatieprijzenpagina.",
  },
  {
    vraag: "Hoe lang duurt een iPhone reparatie bij Telecombinatie Geldrop?",
    antwoord:
      "Je iPhone is bij Telecombinatie Geldrop vaak dezelfde dag gerepareerd. Loop binnen op Langstraat 16 of neem vooraf contact op, dan kijken we samen naar de snelste oplossing.",
  },
  {
    vraag: "Waar kan ik mijn iPhone laten repareren in Geldrop?",
    antwoord:
      "Bij Telecombinatie Geldrop, Langstraat 16, 5664 GG Geldrop. Je kunt gewoon binnenlopen of bellen via 040 286 8020.",
  },
  {
    vraag: "Kan ik ook mijn iPhone batterij laten vervangen in Geldrop?",
    antwoord:
      "Ja, een accu vervangen kost bij Telecombinatie Geldrop tussen de €49 en €99, afhankelijk van je iPhone-model. Merk je dat je iPhone sneller leeg is dan vroeger, dan is een nieuwe batterij vaak de oplossing.",
  },
  {
    vraag: "Welke iPhone-modellen repareren jullie in Geldrop?",
    antwoord:
      "We repareren vrijwel alle iPhone-modellen, van de iPhone 6S tot en met de nieuwste iPhone 16-serie. Staat jouw model er niet tussen? Neem gerust contact op.",
  },
];

export default async function IphoneReparatieGeldropPage() {
  const data = await haalReparatieData();
  const apple = data?.merken.find(m => m.key === "apple");
  const populair = apple?.modellen.slice(0, 12) ?? [];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map(f => ({
      "@type": "Question",
      name: f.vraag,
      acceptedAnswer: { "@type": "Answer", text: f.antwoord },
    })),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">iPhone reparatie in Geldrop</h1>
      <p className="mt-4 max-w-2xl text-neutral-600">
        Bij Telecombinatie Geldrop (Langstraat 16) is je iPhone vaak dezelfde dag gerepareerd. Een
        schermreparatie kost tussen de €79 en €449, een nieuwe batterij vanaf €49 —
        afhankelijk van je model.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/reparatieprijzen"
          className="rounded-lg bg-tc-paars px-5 py-2.5 text-sm font-semibold text-white hover:bg-tc-paars/90"
        >
          Bekijk alle reparatieprijzen
        </Link>
        <a
          href={`tel:${VESTIGING.telefoon.replace(/\s+/g, "")}`}
          className="rounded-lg border border-tc-paars px-5 py-2.5 text-sm font-semibold text-tc-paars hover:bg-tc-paars-licht"
        >
          Bel {VESTIGING.telefoon}
        </a>
      </div>

      {populair.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-neutral-900">Populaire iPhone reparaties &amp; prijzen</h2>
          <div className="overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Model</th>
                  <th className="px-4 py-3 font-semibold">Scherm (origineel)</th>
                  <th className="px-4 py-3 font-semibold">Batterij</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {populair.map(model => {
                  const scherm = model.reparaties.find(
                    r => r.categorie === "scherm" && r.naam.includes("origineel"),
                  );
                  const accu = model.reparaties.find(r => r.categorie === "accu");
                  return (
                    <tr key={model.key}>
                      <td className="px-4 py-3 font-semibold text-neutral-900">{model.label}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-neutral-600">
                        {scherm ? `€ ${scherm.prijs}` : "—"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-neutral-600">
                        {accu ? `€ ${accu.prijs}` : "—"}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/reparatieprijzen?toestel=apple__${model.key}`}
                          className="font-semibold text-tc-paars hover:underline"
                        >
                          Alle opties →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-neutral-500">
            Ouder model of een andere reparatie nodig?{" "}
            <Link href="/reparatieprijzen" className="font-semibold text-tc-paars hover:underline">
              Bekijk het volledige overzicht
            </Link>
            .
          </p>
        </section>
      )}

      <section className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
          { titel: "Vakkundig gerepareerd", tekst: "Onze monteurs repareren dagelijks tientallen iPhones en kennen elk model." },
          { titel: "Vaak dezelfde dag klaar", tekst: "Voor de meeste reparaties hoef je niet lang te wachten." },
          { titel: "Origineel of voordelig", tekst: "Kies zelf: een origineel onderdeel of een voordeligere namaakvariant." },
        ].map(item => (
          <div key={item.titel} className="rounded-xl border border-neutral-200 p-5">
            <h3 className="mb-1.5 font-bold text-neutral-900">{item.titel}</h3>
            <p className="text-sm text-neutral-600">{item.tekst}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="mb-4 text-xl font-bold text-neutral-900">Veelgestelde vragen</h2>
        <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200">
          {FAQS.map(faq => (
            <div key={faq.vraag} className="p-5">
              <h3 className="font-semibold text-neutral-900">{faq.vraag}</h3>
              <p className="mt-1.5 text-sm text-neutral-600">{faq.antwoord}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-tc-paars bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-lg font-bold text-tc-paars">Telecombinatie Geldrop</h2>
        <p className="text-sm text-neutral-600">
          {VESTIGING.straat}
          <br />
          {VESTIGING.postcode}
        </p>
        <p className="mt-3 text-sm text-neutral-600">
          <a href={`tel:${VESTIGING.telefoon.replace(/\s+/g, "")}`} className="hover:text-tc-paars">
            {VESTIGING.telefoon}
          </a>
          <br />
          <a href={`mailto:${VESTIGING.email}`} className="hover:text-tc-paars">
            {VESTIGING.email}
          </a>
        </p>
        {VESTIGING.mapsUrl && (
          <a
            href={VESTIGING.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm font-semibold text-tc-paars hover:underline"
          >
            Route via Google Maps
          </a>
        )}
      </section>
    </div>
  );
}
