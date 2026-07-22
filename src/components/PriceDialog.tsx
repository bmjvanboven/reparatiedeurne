"use client";

import { useEffect, useRef } from "react";
import type { ReparatieModel } from "@/lib/toolbox";

export function PriceDialog({
  model,
  onClose,
}: {
  model: ReparatieModel | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (model) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [model]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={e => {
        if (e.target === ref.current) onClose();
      }}
      className="fixed inset-0 m-auto h-fit max-h-[85vh] w-[90vw] max-w-[420px] overflow-y-auto rounded-2xl border-none p-6 shadow-[0_10px_40px_rgba(0,0,0,0.2)] backdrop:bg-black/50"
    >
      {model && (
        <>
          <div className="mb-3.5 flex items-start justify-between gap-4">
            <h3 className="text-lg font-bold text-tc-paars">{model.label}</h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Sluiten"
              className="text-2xl leading-none text-neutral-400 hover:text-tc-paars"
            >
              &times;
            </button>
          </div>
          <table className="w-full border-none text-sm">
            <thead>
              <tr>
                <th className="border-b border-neutral-100 pb-1.5 text-left font-semibold text-neutral-400">
                  Reparatie
                </th>
                <th className="border-b border-neutral-100 pb-1.5 text-right font-semibold text-neutral-400">
                  Prijs
                </th>
              </tr>
            </thead>
            <tbody>
              {model.reparaties.map(r => (
                <tr key={r.naam}>
                  <td className="border-b border-neutral-100 py-2">{r.naam}</td>
                  <td className="border-b border-neutral-100 py-2 text-right font-bold">
                    € {r.prijs.toFixed(2).replace(".", ",")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-6 text-sm text-neutral-500">
            Prijzen onder voorbehoud van diagnose. Neem contact op voor een afspraak.
          </p>
        </>
      )}
    </dialog>
  );
}
