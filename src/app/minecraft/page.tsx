import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-shell";
import { MinecraftPlatformPreview } from "@/components/minecraft-platform-preview";
import { MinecraftSizer } from "@/components/minecraft-sizer";
import { SectionHeading } from "@/components/section-heading";
import { Icon } from "@/components/icon";
import { software } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Minecraft Hosting",
  description: "Minecraft hosting para Java, Bedrock, modded y networks con sizing por jugadores, recursos y región."
};

export default function MinecraftPage() {
  return (
    <>
      <PageHero
        eyebrow="MINECRAFT HOSTING"
        title={<>Build the server.<br/><span className="gradient-text">Keep the control.</span></>}
        copy="Desde un SMP pequeño hasta una network completa: dimensiona por jugadores, software y carga; después controla RAM, CPU, NVMe y región sin depender de nombres de plan arbitrarios."
        actions={<><Link href="/pricing?product=minecraft" className="button primary large">Configure Minecraft <Icon name="arrow"/></Link><Link href="#sizer" className="button ghost large"><Icon name="spark"/> Smart Size</Link></>}
        visual={<MinecraftPlatformPreview/>}
      />

      <section className="section product-value-strip"><div className="container value-strip-grid"><div><Icon name="gamepad"/><span><strong>Java + Bedrock</strong><small>Una experiencia de producto compartida.</small></span></div><div><Icon name="plug"/><span><strong>Plugins &amp; modded</strong><small>Paper, Purpur, Fabric, Forge y más.</small></span></div><div><Icon name="workflow"/><span><strong>Networks</strong><small>Proxy + múltiples backends.</small></span></div><div><Icon name="archive"/><span><strong>Operations</strong><small>Backups, schedules y file access.</small></span></div></div></section>

      <section className="section" id="sizer"><div className="container"><SectionHeading eyebrow="SMART SIZING" title={<>From player count<br/><span className="text-muted">to an editable baseline.</span></>} copy="El sizer traduce jugadores, tipo de servidor y carga a un punto de partida. Después tú decides cuánto margen quieres mantener."/><MinecraftSizer/></div></section>

      <section className="section section-dim"><div className="container"><SectionHeading eyebrow="SOFTWARE ECOSYSTEM" title={<>Choose your runtime.<br/><span className="text-muted">Not a locked template.</span></>} copy="La disponibilidad final debe venir del provisioning real, pero la interfaz ya está preparada para exponer runtimes como un catálogo de software."/><div className="software-grid software-grid-v5">{software.map(([name,family,tone]) => <article key={name} className={`software-card tone-${tone}`}><span className="software-glyph">{name.slice(0,2).toUpperCase()}</span><div><strong>{name}</strong><small>{family}</small></div><Icon name="check-circle"/></article>)}</div></div></section>

      <section className="section"><div className="container mc-ops-layout"><div className="mc-ops-copy"><span className="eyebrow">DAY-2 OPERATIONS</span><h2>Running the server should feel<br/><span className="gradient-text">as polished as buying it.</span></h2><p>Una buena landing consigue la venta. Una buena plataforma mantiene al usuario. Nexus Control está diseñado para que la experiencia continúe después del checkout.</p><div className="feature-checks"><span><Icon name="terminal"/> Real-time console surface</span><span><Icon name="folder"/> File manager</span><span><Icon name="archive"/> Backup lifecycle</span><span><Icon name="workflow"/> Schedules &amp; automations</span><span><Icon name="user"/> Team permissions</span><span><Icon name="activity"/> Resource telemetry</span></div><Link href="/dashboard-demo" className="button primary">Explore Nexus Control <Icon name="arrow"/></Link></div><div className="mc-ops-bento"><article className="ops-large"><span><Icon name="terminal"/></span><div><small>CONSOLE</small><strong>Operate without SSH.</strong><p>Logs, commands and live server state in a focused surface.</p></div><code>&gt; save-all<br/><em>[INFO] Saved the game</em></code></article><article><Icon name="archive"/><strong>Backups</strong><small>Snapshots + retention</small></article><article><Icon name="folder"/><strong>Files</strong><small>Configs + worlds</small></article><article><Icon name="workflow"/><strong>Schedules</strong><small>Automate tasks</small></article><article><Icon name="database"/><strong>Databases</strong><small>Persistent services</small></article></div></div></section>

      <section className="section section-dim"><div className="container"><SectionHeading eyebrow="MIGRATION FLOW" title="Move an existing server without guessing."/><div className="timeline-grid timeline-grid-v5"><article><span>01</span><i><Icon name="file"/></i><h3>Inventory</h3><p>Version, software, plugins/mods, worlds, databases and real disk size.</p></article><article><span>02</span><i><Icon name="sliders"/></i><h3>Size</h3><p>Choose a region and resource baseline with reasonable headroom.</p></article><article><span>03</span><i><Icon name="archive"/></i><h3>Transfer</h3><p>Move data and validate configuration before any public cutover.</p></article><article><span>04</span><i><Icon name="rocket"/></i><h3>Cut over</h3><p>Switch proxy/DNS only after functional and network checks.</p></article></div></div></section>

      <section className="section tight"><div className="container cta-mega cta-mega-v5"><div className="cta-orb"/><div><span className="eyebrow">CREATE YOUR SERVER</span><h2>Start with a workload. Tune everything else.</h2><p>Use Smart Sizer or configure every resource manually.</p></div><div><Link href="/pricing?product=minecraft" className="button primary large">Configure Minecraft <Icon name="rocket"/></Link><Link href="/contact" className="button ghost large">Migration help <Icon name="message"/></Link></div></div></section>
    </>
  );
}
