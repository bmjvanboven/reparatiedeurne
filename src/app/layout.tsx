import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VESTIGINGEN } from "@/lib/locations";
import { huidigeSiteVariant, naarLijst } from "@/lib/site-varianten";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const variant = await huidigeSiteVariant();
  const stedenVolgorde = [variant.stad, ...VESTIGINGEN.map(v => v.plaats).filter(p => p !== variant.stad)];

  return {
    metadataBase: new URL(`https://${variant.domein}`),
    title: {
      default: `Reparatie ${naarLijst(stedenVolgorde)} | Telecombinatie`,
      template: "%s | Telecombinatie",
    },
    description: `Telecombinatie repareert smartphones en tablets van Apple, Samsung en overige merken in ${variant.stad} en omgeving. Bekijk direct de reparatieprijzen.`,
    keywords: [
      "telefoon reparatie",
      "smartphone reparatie",
      "tablet reparatie",
      "iPhone reparatie",
      "Samsung reparatie",
      `reparatie ${variant.stad}`,
      "reparatie Deurne",
      "reparatie Gemert",
      "reparatie Veghel",
      "reparatie Geldrop",
      "Telecombinatie",
    ],
    icons: {
      icon: "/reparatie-favicon.png",
    },
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
        <Header siteNaam={variant.siteNaam} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
