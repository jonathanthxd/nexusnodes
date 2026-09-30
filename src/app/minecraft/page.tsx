import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-shell";
import { InfraConsole } from "@/components/infra-console";
import { MinecraftSizer } from "@/components/minecraft-sizer";
import { SectionHeading } from "@/components/section-heading";
import { Icon } from "@/components/icon";
import { software } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Minecraft Hosting",
  description: "Minecraft hosting para Java, Bedrock, modded y networks con recursos y región visibles antes de contratar."
};

export default function MinecraftPage() {
  return (
    <>
      <PageHero
        eyebrow="MINECRAFT HOSTING"
        title={<>Tu mundo.<br/><span className="gradient-text">Tus reglas. Tus recursos.</span></>}
        copy="Dimensiona por jugadores, software y carga. Después ajusta RAM, CPU, NVMe y nodo sin esconder el producto detrás de nombres de plan."
        actions={<><Link href="/pricing?product=minecraft" className="button primary large">Configurar servidor <Icon name="arrow"/></Link><Link href="#sizer" className="button ghost large">Usar Minecraft Sizer</Link></>}
        visual={<InfraConsole/>}
      />

      <section className="section" id="sizer"><div className="container"><SectionHeading eyebrow="SMART SIZING" title={<>De jugadores y carga<br/><span className="text-muted">a un punto de partida.</span></>} copy="No existe una cantidad de RAM universal. El sizer combina tipo de servidor, jugadores, carga y audiencia para proponer una base editable."/><MinecraftSizer/></div></section>

      <section className="section section-dim"><div className="container"><SectionHeading eyebrow="SOFTWARE" title="Elige ecosistema, no una jaula." copy="La UI está preparada para presentar software soportado por provisioning. La disponibilidad final debe venir del backend."/><div className="software-grid">{software.map(([name,family,tone]) => <article key={name} className={`software-card tone-${tone}`}><span>{name.slice(0,2).toUpperCase()}</span><div><strong>{name}</strong><small>{family}</small></div><Icon name="check"/></article>)}</div></div></section>

      <section className="section"><div className="container split-feature reverse"><div className="split-copy"><span className="eyebrow">OPERACIÓN</span><h2>Todo lo importante,<br/><span className="text-muted">sin entrar por SSH.</span></h2><p>Console, archivos, backups, schedules, usuarios y bases de datos pueden exponerse desde el panel. La v4 incluye un dashboard demo propio para enseñar la experiencia antes de conectar Pterodactyl.</p><div className="feature-checks"><span><Icon name="terminal"/> Console en tiempo real</span><span><Icon name="disk"/> File manager</span><span><Icon name="database"/> Backups y databases</span><span><Icon name="clock"/> Schedules</span></div><Link href="/dashboard-demo" className="button ghost">Ver dashboard demo <Icon name="arrow"/></Link></div><div className="ops-grid"><article><Icon name="terminal"/><strong>Console</strong><p>Logs y comandos desde el navegador.</p></article><article><Icon name="disk"/><strong>Files</strong><p>Edita configuraciones y estructura.</p></article><article><Icon name="database"/><strong>Backups</strong><p>Snapshots y recuperación.</p></article><article><Icon name="user"/><strong>Subusers</strong><p>Permisos para tu equipo.</p></article></div></div></section>

      <section className="section section-dim"><div className="container"><SectionHeading eyebrow="MIGRACIÓN" title="Trae un servidor existente sin improvisar."/><div className="timeline-grid"><article><span>01</span><h3>Inventario</h3><p>Versión, software, plugins/mods, mundo, bases de datos y tamaño real.</p></article><article><span>02</span><h3>Dimensionado</h3><p>Se elige nodo y recursos con margen razonable para migración.</p></article><article><span>03</span><h3>Transferencia</h3><p>Archivos, DB, variables y configuración se validan antes del corte.</p></article><article><span>04</span><h3>Switch</h3><p>DNS/proxy y pruebas finales antes de abrir a jugadores.</p></article></div></div></section>

      <section className="section tight"><div className="container cta-mega"><div><span className="eyebrow">READY?</span><h2>Configura tu servidor Minecraft.</h2><p>Parte del sizer o controla cada recurso tú mismo.</p></div><div><Link href="/pricing?product=minecraft" className="button primary large">Configurar <Icon name="arrow"/></Link><Link href="/contact" className="button ghost large">Consultar migración</Link></div></div></section>
    </>
  );
}
