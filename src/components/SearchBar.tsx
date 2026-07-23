"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { ToestelZoekResultaat } from "@/lib/toolbox";

export function SearchBar({ toestellen }: { toestellen: ToestelZoekResultaat[] }) {
  const router = useRouter();
  const [term, setTerm] = useState("");
  const [navigatingNaar, setNavigatingNaar] = useState<string | null>(null);

  const suggesties = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return [];
    return toestellen.filter(t => t.modelLabel.toLowerCase().includes(q)).slice(0, 8);
  }, [term, toestellen]);

  function kiesToestel(t: ToestelZoekResultaat) {
    const sleutel = `${t.merkKey}__${t.modelKey}`;
    setNavigatingNaar(sleutel);
    router.push(`/reparatieprijzen?toestel=${encodeURIComponent(sleutel)}`);
  }

  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        value={term}
        onChange={e => setTerm(e.target.value)}
        disabled={navigatingNaar !== null}
        placeholder="Zoek je toestel, bijv. iPhone 13 of Galaxy S22…"
        className="block w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base outline-none focus:border-tc-paars disabled:opacity-60"
      />
      {suggesties.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
          {suggesties.map(t => {
            const sleutel = `${t.merkKey}__${t.modelKey}`;
            const bezig = navigatingNaar === sleutel;
            const anderBezig = navigatingNaar !== null && !bezig;
            return (
              <li key={sleutel}>
                <button
                  type="button"
                  disabled={navigatingNaar !== null}
                  onMouseDown={e => {
                    e.preventDefault();
                    kiesToestel(t);
                  }}
                  className={`flex w-full items-center gap-2 border-b border-neutral-100 px-4 py-2.5 text-left text-sm last:border-b-0 ${
                    bezig
                      ? "bg-tc-paars-licht font-semibold text-tc-paars"
                      : anderBezig
                        ? "opacity-40"
                        : "text-neutral-700 hover:bg-tc-paars-licht hover:text-tc-paars"
                  }`}
                >
                  {bezig && (
                    <span className="h-3.5 w-3.5 flex-shrink-0 animate-spin rounded-full border-2 border-tc-paars-rand border-t-tc-paars" />
                  )}
                  {t.modelLabel}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
