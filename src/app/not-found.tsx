import Link from "next/link";
import { Icon } from "@/components/icon";

export default function NotFound() {
  return <section className="not-found"><div className="hero-grid-bg"/><div className="not-found-card"><span className="error-code">404</span><span className="eyebrow">ROUTE NOT FOUND</span><h1>Este nodo no existe.</h1><p>La ruta que buscabas no forma parte del catálogo actual de NexusNodes.</p><div><Link href="/" className="button primary">Volver al inicio <Icon name="arrow"/></Link><Link href="/network" className="button ghost">Explorar network</Link></div></div></section>;
}
