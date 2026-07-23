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

const KLEUR = { bg: "bg-tc-oranje", zacht: "bg-tc-oranje/10", tekst: "text-tc-oranje" };

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7-5.4-4.7 7.1-.6z" />
    </svg>
  );
}

export function ReviewsBlok() {
  return (
    <section className="pb-16">
      <div className="rounded-2xl border border-neutral-200 bg-white/90 p-8 shadow-sm backdrop-blur-sm sm:p-12">
        <h2 className="text-center text-2xl font-bold text-neutral-900 sm:text-3xl">
          Wat klanten over ons zeggen
        </h2>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3">
          {REVIEWS.map(review => (
            <div key={review.naam} className="overflow-hidden rounded-2xl bg-white shadow-md">
              <div className={`h-1.5 w-full ${KLEUR.bg}`} />
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-bold ${KLEUR.zacht} ${KLEUR.tekst}`}
                  >
                    {review.naam.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900">{review.naam}</p>
                    <div className={`flex gap-0.5 ${KLEUR.tekst}`}>
                      {Array.from({ length: 5 }).map((_, j) => (
                        <StarIcon key={j} className="h-3 w-3" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-neutral-600">{review.tekst}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
