import Link from "next/link";
import type { SiteVariant } from "@/lib/site-varianten";

/** Gemiddelde Google-beoordeling per stad (alleen bekend voor de directe-reparatie-vestigingen). */
const GOOGLE_RATING: Record<string, number> = {
  Deurne: 4.8,
  Gemert: 4.8,
  Geldrop: 4.8,
};

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7-5.4-4.7 7.1-.6z" />
    </svg>
  );
}

export function TrustCta({ variant }: { variant: SiteVariant }) {
  const rating = GOOGLE_RATING[variant.stad];

  return (
    <section className="text-center">
      {rating && (
        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm">
          <StarIcon className="h-4 w-4 text-tc-oranje" />
          {rating} gemiddeld op Google
        </p>
      )}
      <h2 className="text-xl font-bold text-neutral-900 sm:text-2xl">
        Klaar om je toestel te laten repareren?
      </h2>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <Link
          href="/reparatieprijzen"
          className="rounded-lg bg-tc-paars px-5 py-2.5 text-sm font-semibold text-white hover:bg-tc-paars/90"
        >
          Bekijk reparatieprijzen
        </Link>
        <Link
          href="/contact"
          className="rounded-lg border border-tc-paars bg-white/90 px-5 py-2.5 text-sm font-semibold text-tc-paars hover:bg-tc-paars-licht"
        >
          Neem contact op
        </Link>
      </div>
    </section>
  );
}
