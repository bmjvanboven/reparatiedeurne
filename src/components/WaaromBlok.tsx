import { naarLijst } from "@/lib/site-varianten";
import type { SiteVariant } from "@/lib/site-varianten";
import { VESTIGINGEN } from "@/lib/locations";

/** Eigen tekst per stad, zodat elk domein unieke content heeft i.p.v. enkel een verwisselde stadsnaam. */
const WAAROM_TEKST: Record<string, string> = {
  Deurne:
    "Bij Telecombinatie Deurne repareren we dagelijks tientallen smartphones en tablets — van een gebarsten scherm tot een lege batterij. Loop binnen op Wolfsberg 1 of maak van tevoren een afspraak.",
  Gemert:
    "Bij Telecombinatie Gemert helpt ons vakkundige team je snel weer verder, of het nu om een kapot scherm, een trage accu of een andere storing gaat. Kom langs op Nieuwstraat 40a.",
  Geldrop:
    "Bij Telecombinatie Geldrop kun je terecht voor reparatie van vrijwel elk smartphone- en tabletmerk, met oog voor kwaliteit en een eerlijke prijs. Je vindt ons aan de Langstraat 16.",
  Veghel:
    "Voor reparatie van je smartphone of tablet ben je in Veghel bij Telecombinatie aan het juiste adres — we regelen het snel voor je via onze vestiging in de regio.",
  Asten:
    "Voor reparatie van je smartphone of tablet ben je in Asten bij Telecombinatie aan het juiste adres — we regelen het snel voor je via onze vestiging in de regio.",
};

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SwapIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
      <path d="M11 7h6M17 7l-2-2M17 7l-2 2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 17H7M7 17l2-2M7 17l2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className} aria-hidden="true">
      <path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

export function WaaromBlok({ variant }: { variant: SiteVariant }) {
  const tekst =
    WAAROM_TEKST[variant.stad] ??
    `Telecombinatie ${variant.stad} helpt je graag met de reparatie van je smartphone of tablet.`;

  const usps = [
    {
      icon: ClockIcon,
      titel: variant.directeReparaties ? "Vaak dezelfde dag klaar" : "Snel geregeld via ons netwerk",
      tekst: variant.directeReparaties
        ? "Voor de meeste reparaties hoef je niet lang te wachten."
        : "We zorgen dat je toestel snel bij de juiste vestiging terechtkomt.",
    },
    {
      icon: ShieldCheckIcon,
      titel: "Vakkundig gerepareerd",
      tekst: "Onze monteurs repareren dagelijks tientallen toestellen en kennen vrijwel elk merk en model.",
    },
    {
      icon: SwapIcon,
      titel: "Origineel of voordelig",
      tekst: "Kies zelf: een origineel onderdeel of een voordeligere kwaliteitsvariant — jij bepaalt.",
    },
    {
      icon: MapPinIcon,
      titel: "Dichtbij in de buurt",
      tekst: `Met vestigingen in ${naarLijst(VESTIGINGEN.map(v => v.plaats))} ben je nooit ver van Telecombinatie vandaan.`,
    },
  ];

  return (
    <section className="pb-16">
      <div className="rounded-2xl border border-neutral-200 bg-white/90 p-8 shadow-sm backdrop-blur-sm sm:p-12">
        <h2 className="text-center text-2xl font-bold text-neutral-900 sm:text-3xl">
          Waarom Reparatie {variant.stad}?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-neutral-600">{tekst}</p>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map(usp => (
            <div key={usp.titel} className="rounded-xl border border-neutral-200 p-5 text-center">
              <usp.icon className="mx-auto h-8 w-8 text-tc-paars" />
              <h3 className="mt-3 font-bold text-neutral-900">{usp.titel}</h3>
              <p className="mt-1.5 text-sm text-neutral-600">{usp.tekst}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
