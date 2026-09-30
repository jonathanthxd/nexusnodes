import Image from "next/image";
import Link from "next/link";
import { Icon } from "./icon";

const groups = [
  { title: "Products", links: [["Minecraft", "/minecraft"], ["Cloud VPS", "/vps"], ["Configurator", "/pricing"], ["Nexus Control", "/dashboard-demo"]] },
  { title: "Infrastructure", links: [["Network", "/network"], ["Status", "/status"], ["Company", "/company"]] },
  { title: "Support", links: [["Contact", "/contact"], ["Account", "/account"], ["Panel", "https://panel.nexusnodes.lat"]] }
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand-lockup" aria-label="NexusNodes home"><span className="brand-mark"><Image src="/logo-mark.png" width={34} height={34} alt="" /></span><span>NexusNodes</span></Link>
          <p>Minecraft hosting and cloud infrastructure with resources, region and pricing context visible before checkout.</p>
          <div className="footer-status"><i /> Platform catalog available · live telemetry integration-ready</div>
        </div>
        <div className="footer-links">
          {groups.map((group) => <div key={group.title}><strong>{group.title}</strong>{group.links.map(([label, href]) => href.startsWith("http") ? <a key={label} href={href} target="_blank" rel="noreferrer">{label}<Icon name="external"/></a> : <Link key={label} href={href}>{label}</Link>)}</div>)}
        </div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} NexusNodes.</span><span>Product experience · Next.js App Router</span></div>
    </footer>
  );
}
