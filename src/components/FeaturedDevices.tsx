"use client";

import { useMemo, useState } from "react";
import type { ReparatieData, ReparatieModel } from "@/lib/toolbox";
import { DeviceCard } from "./DeviceCard";
import { PriceDialog } from "./PriceDialog";

type Toestel = { merkKey: string; modelKey: string };

export function FeaturedDevices({
  data,
  toestellen,
}: {
  data: ReparatieData;
  toestellen: Toestel[];
}) {
  const [open, setOpen] = useState<Toestel | null>(null);

  const kaarten = useMemo(() => {
    return toestellen
      .map(({ merkKey, modelKey }) => {
        const merk = data.merken.find(m => m.key === merkKey);
        const model = merk?.modellen.find(m => m.key === modelKey);
        return model ? { merkKey, model } : null;
      })
      .filter((x): x is { merkKey: string; model: ReparatieModel } => x !== null);
  }, [data, toestellen]);

  const openModel: ReparatieModel | null = useMemo(() => {
    if (!open) return null;
    const merk = data.merken.find(m => m.key === open.merkKey);
    return merk?.modellen.find(m => m.key === open.modelKey) ?? null;
  }, [open, data]);

  if (kaarten.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3.5">
        {kaarten.map(({ merkKey, model }) => (
          <DeviceCard
            key={`${merkKey}__${model.key}`}
            modelKey={model.key}
            label={model.label}
            onClick={() => setOpen({ merkKey, modelKey: model.key })}
          />
        ))}
      </div>
      <PriceDialog model={openModel} onClose={() => setOpen(null)} />
    </>
  );
}
