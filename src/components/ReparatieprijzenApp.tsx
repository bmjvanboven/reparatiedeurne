"use client";

import { useMemo, useState } from "react";
import type { ReparatieData, ReparatieModel } from "@/lib/toolbox";
import { groepeerModellen } from "@/lib/toolbox";
import { DeviceCard } from "./DeviceCard";
import { PriceDialog } from "./PriceDialog";

type OpenToestel = { merkKey: string; modelKey: string };

function parseInitialToestel(
  data: ReparatieData,
  initialToestel: string | undefined,
): OpenToestel | null {
  if (!initialToestel) return null;
  const [merkKey, modelKey] = initialToestel.split("__");
  if (!merkKey || !modelKey) return null;
  const merk = data.merken.find(m => m.key === merkKey);
  if (!merk || !merk.modellen.some(m => m.key === modelKey)) return null;
  return { merkKey, modelKey };
}

export function ReparatieprijzenApp({
  data,
  initialToestel,
}: {
  data: ReparatieData;
  initialToestel?: string;
}) {
  const [zoekterm, setZoekterm] = useState("");
  const [activeMerk, setActiveMerk] = useState(
    () => parseInitialToestel(data, initialToestel)?.merkKey ?? data.merken[0]?.key ?? "",
  );
  const [open, setOpen] = useState<OpenToestel | null>(() =>
    parseInitialToestel(data, initialToestel),
  );

  const openModel: ReparatieModel | null = useMemo(() => {
    if (!open) return null;
    const merk = data.merken.find(m => m.key === open.merkKey);
    return merk?.modellen.find(m => m.key === open.modelKey) ?? null;
  }, [open, data]);

  const zoekresultaten = useMemo(() => {
    const term = zoekterm.trim().toLowerCase();
    if (!term) return null;
    return data.merken.flatMap(merk =>
      merk.modellen
        .filter(model => model.label.toLowerCase().includes(term))
        .map(model => ({ merkKey: merk.key, model })),
    );
  }, [zoekterm, data]);

  const huidigMerk = data.merken.find(m => m.key === activeMerk) ?? data.merken[0];

  return (
    <div className="w-full">
      <input
        type="text"
        value={zoekterm}
        onChange={e => setZoekterm(e.target.value)}
        placeholder="Zoek je toestel, bijv. iPhone 13 of Galaxy S22…"
        className="mb-6 block w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base outline-none focus:border-tc-paars"
      />

      {zoekresultaten ? (
        <DeviceGrid>
          {zoekresultaten.length === 0 && (
            <p className="col-span-full text-sm text-neutral-500">Geen toestellen gevonden.</p>
          )}
          {zoekresultaten.map(({ merkKey, model }) => (
            <DeviceCard
              key={`${merkKey}__${model.key}`}
              modelKey={model.key}
              label={model.label}
              onClick={() => setOpen({ merkKey, modelKey: model.key })}
            />
          ))}
        </DeviceGrid>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap gap-2 border-b border-neutral-200 pb-3">
            {data.merken.map(merk => (
              <button
                key={merk.key}
                type="button"
                onClick={() => setActiveMerk(merk.key)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  merk.key === activeMerk
                    ? "border-tc-paars bg-tc-paars text-white"
                    : "border-neutral-300 bg-white text-neutral-600 hover:border-tc-paars hover:text-tc-paars"
                }`}
              >
                {merk.label}
              </button>
            ))}
          </div>

          {huidigMerk &&
            groepeerModellen(huidigMerk.modellen).map((groep, i) => (
              <div key={`groep-${i}`} className={i === 0 ? "" : "mt-10"}>
                {groep.groep && (
                  <p className="mb-4 border-b-2 border-tc-paars-rand pb-1.5 text-xs font-bold uppercase tracking-wider text-tc-paars">
                    {groep.groep}
                  </p>
                )}
                <DeviceGrid>
                  {groep.modellen.map(model => (
                    <DeviceCard
                      key={model.key}
                      modelKey={model.key}
                      label={model.label}
                      onClick={() => setOpen({ merkKey: huidigMerk.key, modelKey: model.key })}
                    />
                  ))}
                </DeviceGrid>
              </div>
            ))}
        </>
      )}

      <PriceDialog model={openModel} onClose={() => setOpen(null)} />
    </div>
  );
}

function DeviceGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3.5">{children}</div>
  );
}
