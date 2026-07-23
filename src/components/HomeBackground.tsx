"use client";

import { useState } from "react";

type Variant = "foto" | "creatief";

const OPTIES: { key: Variant; label: string }[] = [
  { key: "foto", label: "Foto" },
  { key: "creatief", label: "Creatief" },
];

function FotoAchtergrond() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 bg-[url('/background-reparatie-iphones.jpg')] bg-cover bg-center"
    />
  );
}

function CreatieveAchtergrond() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-white">
      <div className="absolute -left-24 -top-24 h-56 w-56 animate-[drift-a_16s_ease-in-out_infinite] rounded-full bg-tc-paars/15 blur-2xl sm:-left-[10%] sm:-top-[15%] sm:h-[32rem] sm:w-[32rem] sm:bg-tc-paars/25 sm:blur-3xl" />
      <div className="absolute -right-20 -top-28 h-48 w-48 animate-[drift-b_20s_ease-in-out_infinite] rounded-full bg-tc-accent/10 blur-2xl sm:-right-[15%] sm:-top-[10%] sm:h-[30rem] sm:w-[30rem] sm:bg-tc-accent/20 sm:blur-3xl" />
      <div className="absolute bottom-[-14%] left-4 h-48 w-48 animate-[drift-c_18s_ease-in-out_infinite] rounded-full bg-tc-oranje/10 blur-2xl sm:bottom-[-20%] sm:left-[10%] sm:h-[28rem] sm:w-[28rem] sm:bg-tc-oranje/20 sm:blur-3xl" />
      <div className="absolute -bottom-24 -right-20 h-48 w-48 animate-[drift-a_22s_ease-in-out_infinite] rounded-full bg-tc-paars/10 blur-2xl sm:-bottom-[15%] sm:-right-[10%] sm:h-[26rem] sm:w-[26rem] sm:bg-tc-paars/15 sm:blur-3xl" />
    </div>
  );
}

export function HomeBackground() {
  const [variant, setVariant] = useState<Variant>("foto");

  return (
    <>
      {variant === "foto" && <FotoAchtergrond />}
      {variant === "creatief" && <CreatieveAchtergrond />}

      <div className="fixed bottom-6 right-6 z-50 flex gap-1 rounded-full border border-neutral-200 bg-white/90 p-1 shadow-lg backdrop-blur">
        {OPTIES.map(optie => (
          <button
            key={optie.key}
            type="button"
            onClick={() => setVariant(optie.key)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              variant === optie.key
                ? "bg-tc-paars text-white"
                : "text-neutral-500 hover:text-tc-paars"
            }`}
          >
            {optie.label}
          </button>
        ))}
      </div>
    </>
  );
}
