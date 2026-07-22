import Image from "next/image";
import { afbeeldingVoor } from "@/lib/device-images";
import { DeviceIcon } from "./DeviceIcon";

export function DeviceCard({
  modelKey,
  label,
  onClick,
}: {
  modelKey: string;
  label: string;
  onClick: () => void;
}) {
  const afbeelding = afbeeldingVoor(modelKey);

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 rounded-xl border border-neutral-200 bg-white p-3.5 text-center transition-shadow hover:border-tc-paars hover:shadow-[0_4px_14px_rgba(132,5,98,0.12)]"
    >
      <span className="flex h-[70px] w-full items-center justify-center">
        {afbeelding ? (
          <Image src={afbeelding} alt={label} width={70} height={70} className="object-contain" />
        ) : (
          <DeviceIcon className="h-10 w-10 text-neutral-300" />
        )}
      </span>
      <span className="text-[13px] font-semibold leading-tight text-neutral-800">{label}</span>
    </button>
  );
}
