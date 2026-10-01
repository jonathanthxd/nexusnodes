import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nexusnodes.lat"),
  title: { default: "NexusNodes — Minecraft Hosting & VPS", template: "%s · NexusNodes" },
  description: "Minecraft hosting y VPS con nodos en Norteamérica y LATAM, recursos transparentes y una plataforma preparada para crecer.",
  applicationName: "NexusNodes",
  keywords: ["minecraft hosting", "vps", "hosting latam", "pterodactyl", "minecraft server hosting"],
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: siteUrl("/"),
    siteName: "NexusNodes",
    title: "NexusNodes — Minecraft Hosting & VPS",
    description: "Infraestructura clara para Minecraft, VPS y comunidades de LATAM.",
  },
  twitter: { card: "summary_large_image", title: "NexusNodes — Minecraft Hosting & VPS", description: "Infraestructura clara para Minecraft y VPS." },
  icons: { icon: "/logo-mark.png", apple: "/apple-touch-icon.png" }
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#06070b", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#main">Saltar al contenido</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
