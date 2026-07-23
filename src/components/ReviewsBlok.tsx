type Review = {
  naam: string;
  tekst: string;
};

/** Ingekorte, echte Google-reviews, qua lengte iets gelijkgetrokken. */
const REVIEWS: Review[] = [
  {
    naam: "Veronique",
    tekst: "Mijn scherm laten repareren, erg goede service. Achteraf bleek het geluid niet in orde, maar we mochten gelijk terugkomen. Kosteloos en snel verholpen.",
  },
  {
    naam: "Pieter",
    tekst: "Het scherm van mijn dochters telefoon netjes vervangen. Haar toestel was geblokkeerd, dus er was wat extra werk nodig om alles weer te laten werken. Prima service.",
  },
  {
    naam: "Mario",
    tekst: "Moest mijn iPhone door een oude batterij meerdere keren per dag opladen. Afspraak gemaakt, batterij laten vervangen, klaar terwijl ik wachtte. Goede service en uitleg.",
  },
];

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7-5.4-4.7 7.1-.6z" />
    </svg>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M7.2 6.5C4.6 6.5 2.5 8.6 2.5 11.2v6.3h6.3v-6.3H6.1c0-1.6.9-2.9 2.5-3.2l-1.4-1.5zM17 6.5c-2.6 0-4.7 2.1-4.7 4.7v6.3h6.3v-6.3h-2.7c0-1.6.9-2.9 2.5-3.2L17 6.5z" />
    </svg>
  );
}

const STAGGER = ["", "sm:mt-10", "sm:mt-3"];

export function ReviewsBlok() {
  return (
    <section className="pb-16">
      <div className="rounded-2xl border border-neutral-200 bg-white/90 p-8 shadow-sm backdrop-blur-sm sm:p-12">
        <h2 className="text-center text-2xl font-bold text-neutral-900 sm:text-3xl">
          Wat klanten over ons zeggen
        </h2>

        <div className="mx-auto mt-10 grid max-w-5xl gap-x-10 gap-y-10 sm:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <div key={review.naam} className={STAGGER[i]}>
              <QuoteIcon className="h-7 w-7 text-tc-paars-rand" />
              <p className="mt-3 text-sm text-neutral-600">{review.tekst}</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex gap-0.5 text-tc-oranje">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <StarIcon key={j} className="h-3.5 w-3.5" />
                  ))}
                </div>
                <p className="text-sm font-bold text-neutral-900">{review.naam}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
