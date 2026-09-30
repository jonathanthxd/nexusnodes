import Link from "next/link";
import { DeployStudio } from "@/components/deploy-studio";
import { NetworkVisual } from "@/components/network-visual";
import { PlatformPreview } from "@/components/platform-preview";
import { SectionHeading } from "@/components/section-heading";
import { Icon } from "@/components/icon";
import { nodes } from "@/lib/catalog";

export default function HomePage() {
  return (
    <>
      <section className="home-hero home-hero-v5">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-orb orb-one" aria-hidden="true" />
        <div className="hero-orb orb-two" aria-hidden="true" />
        <div className="hero-noise" aria-hidden="true" />
        <div className="container home-hero-grid">
          <div className="home-hero-copy">
            <span className="hero-kicker"><i/><span>Infrastructure for Minecraft &amp; cloud workloads</span><Icon name="arrow-up-right"/></span>
            <h1>Deploy closer.<br/><span className="gradient-text">Control everything.</span></h1>
            <p>NexusNodes une Minecraft Hosting, Cloud VPS y regiones LATAM/Norteamérica en una experiencia clara: configura recursos, entiende el precio y despliega desde un mismo flujo.</p>
            <div className="hero-actions">
              <Link href="/pricing" className="button primary large">Start deploying <Icon name="arrow"/></Link>
              <Link href="/dashboard-demo" className="button ghost large"><Icon name="layout"/> Explore Nexus Control</Link>
            </div>
            <div className="hero-proof">
              <div><span className="proof-icon"><Icon name="shield"/></span><span><strong>Protected by design</strong><small>Provisioning stays server-side</small></span></div>
              <div><span className="proof-icon"><Icon name="network"/></span><span><strong>5 catalog regions</strong><small>LATAM + North America</small></span></div>
              <div><span className="proof-icon"><Icon name="sliders"/></span><span><strong>Transparent sizing</strong><small>RAM · CPU · NVMe · region</small></span></div>
            </div>
          </div>
          <DeployStudio />
        </div>
        <div className="container hero-signal-strip">
          <span><Icon name="gamepad"/> Paper · Purpur · Fabric · Forge</span>
          <span><Icon name="cloud"/> Linux VPS</span>
          <span><Icon name="disk"/> NVMe storage</span>
          <span><Icon name="network"/> Multi-region catalog</span>
          <span><Icon name="command"/> Nexus Control</span>
        </div>
      </section>

      <section className="section product-section-v5">
        <div className="container">
          <SectionHeading eyebrow="PRODUCT PLATFORM" title={<>Hosting that behaves like<br/><span className="text-muted">software, not a brochure.</span></>} copy="Cada producto tiene una experiencia propia, pero comparte la misma lógica de sizing, región, pricing y control." />
          <div className="product-bento-v5">
            <article className="bento-product bento-minecraft">
              <div className="bento-top"><span className="bento-icon"><Icon name="gamepad"/></span><span className="bento-tag">GAME SERVERS</span></div>
              <div><h3>Minecraft Hosting</h3><p>Configura por jugadores, software, carga y región. Java, Bedrock, modded y proxies desde el mismo flujo.</p></div>
              <div className="bento-stack"><span>Paper</span><span>Purpur</span><span>Fabric</span><span>NeoForge</span><span>Velocity</span></div>
              <Link href="/minecraft">Explore Minecraft <Icon name="arrow"/></Link>
              <div className="bento-glow"/>
            </article>

            <article className="bento-product bento-vps">
              <div className="bento-top"><span className="bento-icon"><Icon name="cloud"/></span><span className="bento-tag">COMPUTE</span></div>
              <div><h3>Cloud VPS</h3><p>Instancias Linux para bots, APIs, databases y stacks completos con recursos visibles antes de desplegar.</p></div>
              <div className="vps-mini-terminal"><span><i/> nx-vps-01</span><code>$ systemctl status nexus-api</code><code className="ok">● active (running)</code></div>
              <Link href="/vps">Explore VPS <Icon name="arrow"/></Link>
            </article>

            <article className="bento-small bento-network-card"><span className="bento-icon"><Icon name="waypoints"/></span><div><strong>Node Explorer</strong><p>Región, hardware y precio base en una vista comparable.</p></div><Link href="/network" aria-label="Abrir Network"><Icon name="arrow-up-right"/></Link></article>
            <article className="bento-small bento-control-card"><span className="bento-icon"><Icon name="layout"/></span><div><strong>Nexus Control</strong><p>Una superficie de operación para servidores y servicios.</p></div><Link href="/dashboard-demo" aria-label="Abrir Nexus Control"><Icon name="arrow-up-right"/></Link></article>
            <article className="bento-small bento-pricing-card"><span className="bento-icon"><Icon name="sliders"/></span><div><strong>Smart Configurator</strong><p>Dimensiona, ajusta y valida una cotización server-side.</p></div><Link href="/pricing" aria-label="Abrir Pricing"><Icon name="arrow-up-right"/></Link></article>
          </div>
        </div>
      </section>

      <section className="section control-showcase-section">
        <div className="container control-showcase-grid">
          <div className="control-showcase-copy">
            <span className="eyebrow">NEXUS CONTROL</span>
            <h2>From landing page<br/><span className="gradient-text">to product surface.</span></h2>
            <p>La misma experiencia visual puede convertirse en el panel real: métricas, consola, archivos, backups, schedules, team access y acciones sobre cada servicio.</p>
            <div className="control-feature-list">
              <span><Icon name="activity"/><b>Observability</b><small>CPU, RAM, storage y eventos.</small></span>
              <span><Icon name="terminal"/><b>Console</b><small>Comandos y logs desde el navegador.</small></span>
              <span><Icon name="archive"/><b>Backups</b><small>Snapshots, retention y recovery.</small></span>
              <span><Icon name="workflow"/><b>Automations</b><small>Schedules y tareas operativas.</small></span>
            </div>
            <Link href="/dashboard-demo" className="button primary">Open interactive preview <Icon name="arrow"/></Link>
          </div>
          <PlatformPreview />
        </div>
      </section>

      <section className="section section-dim network-showcase-v5">
        <div className="container">
          <SectionHeading eyebrow="NEXUS NETWORK" title={<>Choose a region with context.<br/><span className="text-muted">Not with invented latency.</span></>} copy="Explora nodos por ubicación, hardware, tier y tarifa. Ping, stock y capacidad se reservan para fuentes reales cuando estén conectadas." action={<Link href="/network" className="button ghost">Open Node Explorer <Icon name="arrow"/></Link>} />
          <div className="network-showcase-grid">
            <NetworkVisual />
            <div className="node-stack-v5">
              {nodes.map((node, index) => <Link key={node.id} href={`/network/${node.id}`} className="node-row-v5"><span className="node-order">0{index + 1}</span><span className="node-location"><b>{node.flag}</b><span><strong>{node.code}</strong><small>{node.city}</small></span></span><span className="node-cpu">{node.processor}</span><span className={`node-tier tier-${node.tier}`}>{node.tierLabel}</span><Icon name="chevron"/></Link>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section deploy-flow-section">
        <div className="container">
          <SectionHeading eyebrow="DEPLOYMENT FLOW" title={<>Four decisions.<br/><span className="text-muted">One clean path to production.</span></>} align="center" />
          <div className="deploy-flow-v5">
            <article><span className="flow-step">01</span><i><Icon name="blocks"/></i><h3>Choose workload</h3><p>Minecraft, VPS, plugins, modded, API, database o stack.</p></article>
            <div className="flow-connector"><span/></div>
            <article><span className="flow-step">02</span><i><Icon name="sliders"/></i><h3>Size resources</h3><p>RAM, vCPU y NVMe con presets editables y precio explicable.</p></article>
            <div className="flow-connector"><span/></div>
            <article><span className="flow-step">03</span><i><Icon name="map-pin"/></i><h3>Select region</h3><p>Elige el nodo con contexto de hardware y audiencia.</p></article>
            <div className="flow-connector"><span/></div>
            <article><span className="flow-step">04</span><i><Icon name="rocket"/></i><h3>Deploy</h3><p>Billing y provisioning validan el pedido antes de crear el servicio.</p></article>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container cta-mega cta-mega-v5">
          <div className="cta-orb"/>
          <div><span className="eyebrow">READY TO BUILD</span><h2>Turn requirements into infrastructure.</h2><p>Empieza con un preset o controla cada recurso manualmente.</p></div>
          <div><Link href="/pricing" className="button primary large">Launch Configurator <Icon name="rocket"/></Link><Link href="/contact" className="button ghost large">Talk to us <Icon name="message"/></Link></div>
        </div>
      </section>
    </>
  );
}
