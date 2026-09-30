import Image from "next/image";
import Link from "next/link";
import { Icon } from "./icon";

const groups = [
  { title: "Producto", links: [["Minecraft", "/minecraft"], ["VPS", "/vps"], ["Precios", "/pricing"], ["Dashboard demo", "/dashboard-demo"]] },
  { title: "Infraestructura", links: [["Network", "/network"], ["Status", "/status"], ["Empresa", "/company"]] },
  { title: "Ayuda", links: [["Contacto", "/contact"], ["Cuenta", "/account"], ["Panel", "https://panel.nexusnodes.lat"]] }
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand-lockup" aria-label="NexusNodes home">
            <Image src="/logo-mark.png" width={42} height={42} alt="" />
            <span>NexusNodes</span>
          </Link>
          <p>Hosting de Minecraft y VPS con una idea simple: que entiendas qué recursos, nodo y plataforma estás contratando antes de pagar.</p>
          <div className="footer-status"><i /> Catálogo operativo · status configurable</div>
        </div>
        <div className="footer-links">
          {groups.map((group) => <div key={group.title}><strong>{group.title}</strong>{group.links.map(([label, href]) => href.startsWith("http") ? <a key={label} href={href} target="_blank" rel="noreferrer">{label}<Icon name="external"/></a> : <Link key={label} href={href}>{label}</Link>)}</div>)}
        </div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} NexusNodes.</span><span>Next.js platform experience · v4.0.0</span></div>
    </footer>
  );
}
