import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VESTIGINGEN, REPARATIE_VESTIGINGEN } from "@/lib/locations";
import { huidigeSiteVariant, naarLijst, reparatieStedenVolgorde, socialMetadata } from "@/lib/site-varianten";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const variant = await huidigeSiteVariant();
  const reparatieSteden = REPARATIE_VESTIGINGEN.map(v => v.plaats);
  const stedenVolgorde = reparatieStedenVolgorde(variant, reparatieSteden);

  const description = variant.directeReparaties
    ? `Telecombinatie repareert smartphones en tablets van Apple, Samsung en overige merken in ${variant.stad} en omgeving. Bekijk direct de reparatieprijzen.`
    : `Telecombinatie in ${variant.stad} — voor reparaties van smartphones en tablets kun je terecht bij onze vestigingen in ${naarLijst(reparatieSteden)}. Bekijk direct de reparatieprijzen.`;
  const titel = `Reparatie ${naarLijst(stedenVolgorde)} | Telecombinatie`;

  return {
    metadataBase: new URL(`https://${variant.domein}`),
    title: {
      default: titel,
      template: "%s | Telecombinatie",
    },
    description,
    keywords: [
      "telefoon reparatie",
      "smartphone reparatie",
      "tablet reparatie",
      "iPhone reparatie",
      "Samsung reparatie",
      variant.directeReparaties ? `reparatie ${variant.stad}` : `Telecombinatie ${variant.stad}`,
      "reparatie Deurne",
      "reparatie Gemert",
      "reparatie Geldrop",
      "Telecombinatie",
    ],
    icons: {
      icon: "/reparatie-favicon.png",
    },
    alternates: {
      canonical: "/",
    },
    ...socialMetadata(variant, titel, description),
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const variant = await huidigeSiteVariant();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Telecombinatie",
    url: `https://${variant.domein}`,
    department: VESTIGINGEN.map(v => ({
      "@type": "ElectronicsStore",
      name: v.naam,
      address: {
        "@type": "PostalAddress",
        streetAddress: v.straat,
        postalCode: v.postcode.split(" ").slice(0, 2).join(" "),
        addressLocality: v.plaats,
        addressCountry: "NL",
      },
      telephone: v.telefoon,
      email: v.email,
    })),
  };

  return (
    <html lang="nl" className={montserrat.variable}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Header siteNaam={variant.siteNaam} directeReparaties={variant.directeReparaties} />
        <main className="flex-1">{children}</main>
        <Footer stad={variant.stad} />
      </body>
    </html>
  );
}
