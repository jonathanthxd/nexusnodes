import Image from "next/image";
import Link from "next/link";
import { HeroLaunchpad } from "@/components/hero-launchpad";
import { NetworkVisual } from "@/components/network-visual";
import { InfraConsole } from "@/components/infra-console";
import { SectionHeading } from "@/components/section-heading";
import { Icon } from "@/components/icon";
import { nodes } from "@/lib/catalog";

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-orb orb-one" aria-hidden="true" />
        <div className="hero-orb orb-two" aria-hidden="true" />
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <span className="status-badge"><i/> Minecraft + VPS · Norteamérica + LATAM</span>
            <h1>Infraestructura que<br/><span className="gradient-text">entiendes antes de pagar.</span></h1>
            <p>Configura recursos, compara nodos y entiende qué estás contratando. NexusNodes v4 convierte una web estática en una experiencia de producto completa sobre Next.js.</p>
            <div className="hero-actions"><Link href="/pricing" className="button primary large">Encontrar mi configuración <Icon name="arrow"/></Link><Link href="/network" className="button ghost large">Explorar network</Link></div>
            <div className="hero-trust-row"><span><Icon name="check"/> Java &amp; Bedrock</span><span><Icon name="check"/> Linux VPS</span><span><Icon name="check"/> Backend-ready</span></div>
          </div>
          <HeroLaunchpad />
        </div>
        <div className="container hero-bottom-strip"><div><span>5</span><p>Nodos de catálogo</p></div><div><span>2</span><p>Familias de producto</p></div><div><span>100%</span><p>Recursos visibles</p></div><div><span>Next.js</span><p>App Router · v16.3</p></div></div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="PRODUCTOS" title={<>Dos formas de desplegar.<br/><span className="text-muted">Un mismo control mental.</span></>} copy="No vendemos nombres abstractos de plan como argumento principal. Empieza por el tipo de carga, región y recursos que realmente necesitas." />
          <div className="product-bento">
            <article className="product-card minecraft-card">
              <div className="product-card-copy"><span className="eyebrow">MINECRAFT HOSTING</span><h3>Un servidor que puedes dimensionar.</h3><p>Paper, Purpur, Fabric, Forge, NeoForge, proxies y crossplay, con un sizer específico para jugadores y carga.</p><div className="pill-row"><span>Java</span><span>Bedrock</span><span>Modded</span><span>Proxy</span></div><Link href="/minecraft" className="inline-link">Explorar Minecraft <Icon name="arrow"/></Link></div>
              <InfraConsole />
            </article>
            <article className="product-card vps-card">
              <div className="product-card-copy"><span className="eyebrow">CLOUD VPS</span><h3>Compute general sin humo.</h3><p>Compón una instancia por workload, distribución, RAM, CPU, NVMe y región.</p><div className="pill-row"><span>Root</span><span>Linux</span><span>NVMe</span><span>IPv4*</span></div><Link href="/vps" className="inline-link">Explorar VPS <Icon name="arrow"/></Link></div>
              <InfraConsole mode="vps" />
            </article>
            <article className="product-card mini-card"><span className="icon-tile"><Icon name="spark"/></span><div><span className="eyebrow">SMART SIZING</span><h3>De workload a recursos.</h3><p>Una recomendación inicial explicable y luego ajustes manuales.</p></div><Link href="/pricing" aria-label="Abrir Smart Sizer"><Icon name="arrow"/></Link></article>
            <article className="product-card mini-card"><span className="icon-tile"><Icon name="map"/></span><div><span className="eyebrow">NODE EXPLORER</span><h3>Región antes que promesas de ping.</h3><p>Compara catálogo y valida rutas cuando conectes Looking Glass.</p></div><Link href="/network" aria-label="Abrir Node Explorer"><Icon name="arrow"/></Link></article>
          </div>
        </div>
      </section>

      <section className="section section-dim">
        <div className="container split-feature">
          <div className="split-copy"><span className="eyebrow">CONTROL PLANE</span><h2>No es solo una landing.<br/><span className="text-muted">Es la base de una plataforma.</span></h2><p>La v4 separa presentación, lógica de catálogo, validación server-side y futuras integraciones. Puedes conectar billing, auth y Pterodactyl sin volver a rehacer la web.</p><div className="feature-checks"><span><Icon name="check"/> Route Handler para cotizaciones</span><span><Icon name="check"/> App Router + Server Components</span><span><Icon name="check"/> Client Components solo donde aportan valor</span><span><Icon name="check"/> Build standalone para self-hosting</span></div><Link href="/dashboard-demo" className="button ghost">Abrir dashboard demo <Icon name="arrow"/></Link></div>
          <div className="control-plane-visual"><div className="plane-ring ring-1"/><div className="plane-ring ring-2"/><div className="plane-core"><Image src="/logo-mark.png" alt="" width={74} height={74}/><span>NEXUS<br/>CORE</span></div><div className="plane-node n1"><Icon name="user"/><span>Identity</span></div><div className="plane-node n2"><Icon name="database"/><span>Billing</span></div><div className="plane-node n3"><Icon name="server"/><span>Pterodactyl</span></div><div className="plane-node n4"><Icon name="activity"/><span>Status</span></div></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="NETWORK" title={<>Cinco puntos de partida.<br/><span className="text-muted">Un catálogo honesto.</span></>} copy="La UI muestra lo que sabemos: región, procesador, tier y precio por GB. Ping, stock y capacidad deben venir de fuentes reales antes de presentarse como live." action={<Link href="/network" className="button ghost">Ver todos los nodos</Link>} />
          <div className="home-network-layout"><NetworkVisual/><div className="network-cards">{nodes.slice(0,4).map((node) => <Link key={node.id} href={`/network/${node.id}`} className="network-mini-card"><span className="node-flag">{node.flag}</span><div><strong>{node.code}</strong><span>{node.city}</span></div><em>{node.tierLabel}</em><Icon name="chevron"/></Link>)}</div></div>
        </div>
      </section>

      <section className="section section-dim">
        <div className="container">
          <SectionHeading eyebrow="DESIGN PRINCIPLES" title="Menos promesas. Más control." align="center" />
          <div className="principle-grid"><article><span>01</span><Icon name="layers"/><h3>Datos centralizados</h3><p>Nodos, pricing y workloads viven en módulos tipados, no repetidos entre páginas.</p></article><article><span>02</span><Icon name="shield"/><h3>Secrets fuera del cliente</h3><p>El frontend describe intención; el servidor valida, cobra y provisiona.</p></article><article><span>03</span><Icon name="bolt"/><h3>Interacción donde importa</h3><p>Server Components por defecto; estado de cliente solo para configuradores y demos.</p></article><article><span>04</span><Icon name="activity"/><h3>Observabilidad real</h3><p>Status y capacidad están preparados para APIs reales, no para números decorativos.</p></article></div>
        </div>
      </section>

      <section className="section tight"><div className="container cta-mega"><div><span className="eyebrow">NEXUSNODES V4</span><h2>Convierte una idea en una configuración.</h2><p>Producto, workload, audiencia, nodo y recursos. Todo en una ruta compartible y preparada para billing.</p></div><div><Link href="/pricing" className="button primary large">Abrir configurador <Icon name="arrow"/></Link><Link href="/contact" className="button ghost large">Hablar de un caso especial</Link></div></div></section>
    </>
  );
}
