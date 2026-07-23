import { sorteerVestigingenVoor } from "@/lib/locations";

export function Footer({ stad }: { stad: string }) {
  const vestigingen = sorteerVestigingenVoor(stad);

  return (
    <footer className="mt-16 border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {vestigingen.map(v => {
            const isHuidig = v.plaats === stad;
            return (
              <div
                key={v.plaats}
                className={`rounded-xl border p-4 ${
                  isHuidig ? "border-tc-paars bg-white shadow-sm" : "border-transparent"
                }`}
              >
                {isHuidig && (
                  <span className="mb-2 inline-block rounded-full bg-tc-paars px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Jouw vestiging
                  </span>
                )}
                <h3 className="font-bold text-tc-paars mb-2 leading-tight">
                  Telecombinatie
                  <br />
                  {v.plaats}
                </h3>
                <p className="text-sm text-neutral-600">
                  {v.straat}
                  <br />
                  {v.postcode}
                </p>
                <p className="text-sm text-neutral-600 mt-2">
                  <a href={`tel:${v.telefoon.replace(/\s+/g, "")}`} className="hover:text-tc-paars">
                    {v.telefoon}
                  </a>
                  <br />
                  <a href={`mailto:${v.email}`} className="hover:text-tc-paars">
                    {v.email}
                  </a>
                </p>
                {v.mapsUrl && (
                  <a
                    href={v.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-semibold text-tc-paars hover:underline"
                  >
                    Route via Google Maps
                  </a>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-10 text-xs text-neutral-400">
          {`© ${new Date().getFullYear()} — Reparatie ${stad}`}
        </p>
      </div>
    </footer>
  );
}
