type Review = {
  naam: string;
  wanneer: string;
  tekst: string;
};

/** Ingekorte, echte Google-reviews, qua lengte iets gelijkgetrokken. */
const REVIEWS: Review[] = [
  {
    naam: "Veronique van Oosterom",
    wanneer: "1 jaar geleden",
    tekst: "Mijn scherm laten repareren, erg goede service. Achteraf bleek het geluid niet in orde, maar we mochten gelijk terugkomen. Kosteloos en snel verholpen.",
  },
  {
    naam: "Pieter Berkers",
    wanneer: "2 jaar geleden",
    tekst: "Het scherm van mijn dochters telefoon netjes vervangen. Haar toestel was geblokkeerd, dus er was wat extra werk nodig om alles weer te laten werken. Prima service.",
  },
  {
    naam: "Mario Martens",
    wanneer: "2 jaar geleden",
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

export function ReviewsBlok() {
  return (
    <section className="pb-16">
      <div className="rounded-2xl border border-neutral-200 bg-white/90 p-8 shadow-sm backdrop-blur-sm sm:p-12">
        <h2 className="text-center text-2xl font-bold text-neutral-900 sm:text-3xl">
          Wat klanten over ons zeggen
        </h2>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 sm:grid-cols-3">
          {REVIEWS.map(review => (
            <div key={review.naam} className="rounded-xl border border-neutral-200 p-5">
              <div className="flex gap-0.5 text-tc-oranje">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4" />
                ))}
              </div>
              <p className="mt-3 text-sm text-neutral-600">&ldquo;{review.tekst}&rdquo;</p>
              <p className="mt-4 text-sm font-bold text-neutral-900">{review.naam}</p>
              <p className="text-xs text-neutral-400">{review.wanneer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
