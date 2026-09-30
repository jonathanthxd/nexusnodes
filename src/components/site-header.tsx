"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon, type IconName } from "./icon";
import { cx } from "@/lib/utils";

const nav = [
  { label: "Minecraft", href: "/minecraft" },
  { label: "VPS", href: "/vps" },
  { label: "Network", href: "/network" },
  { label: "Pricing", href: "/pricing" }
] as const;

const productLinks: Array<{ title: string; copy: string; href: string; icon: IconName; badge?: string }> = [
  { title: "Minecraft Hosting", copy: "Java, Bedrock, modded y networks.", href: "/minecraft", icon: "gamepad", badge: "Popular" },
  { title: "Cloud VPS", copy: "Compute Linux configurable por recursos.", href: "/vps", icon: "cloud" },
  { title: "Node Explorer", copy: "Compara regiones, hardware y tarifas.", href: "/network", icon: "network" },
  { title: "Nexus Control", copy: "Preview del panel de administración.", href: "/dashboard-demo", icon: "layout" }
];

const paletteItems: Array<{ label: string; href: string; group: string; icon: IconName }> = [
  { label: "Minecraft Hosting", href: "/minecraft", group: "Producto", icon: "gamepad" },
  { label: "Cloud VPS", href: "/vps", group: "Producto", icon: "cloud" },
  { label: "Configurar infraestructura", href: "/pricing", group: "Acción", icon: "sliders" },
  { label: "Explorar nodos", href: "/network", group: "Infraestructura", icon: "network" },
  { label: "Nexus Control", href: "/dashboard-demo", group: "Producto", icon: "layout" },
  { label: "Estado de plataforma", href: "/status", group: "Infraestructura", icon: "activity" },
  { label: "Cuenta", href: "/account", group: "Cuenta", icon: "user" },
  { label: "Contacto", href: "/contact", group: "Ayuda", icon: "message" }
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((value) => !value);
      }
      if (event.key === "Escape") {
        setPaletteOpen(false);
        setProductsOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  useEffect(() => {
    if (paletteOpen) requestAnimationFrame(() => inputRef.current?.focus());
    else setQuery("");
  }, [paletteOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setPaletteOpen(false);
  }, [pathname]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return paletteItems;
    return paletteItems.filter((item) => `${item.label} ${item.group}`.toLowerCase().includes(needle));
  }, [query]);

  function navigate(href: string) {
    setPaletteOpen(false);
    router.push(href);
  }

  return (
    <>
      <header className="site-header">
        <div className="container nav-shell">
          <Link href="/" className="brand-lockup" aria-label="NexusNodes home">
            <span className="brand-mark"><Image src="/logo-mark.png" width={34} height={34} alt="" priority /></span>
            <span>NexusNodes</span>
          </Link>

          <nav className="desktop-nav" aria-label="Navegación principal">
            <div className="nav-product-wrap">
              <button className={cx("nav-link-button", productsOpen && "is-active")} onClick={() => setProductsOpen((value) => !value)} aria-expanded={productsOpen}>
                Products <Icon name="chevron-down" size={14}/>
              </button>
              <AnimatePresence>
                {productsOpen ? <motion.div className="product-mega" initial={{ opacity: 0, y: 8, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: .99 }} transition={{ duration: .16 }}>
                  <div className="product-mega-head"><span>PRODUCTS</span><small>Infraestructura para comunidades y servicios.</small></div>
                  <div className="product-mega-grid">
                    {productLinks.map((item) => <Link href={item.href} key={item.href} className="mega-link"><span className="mega-icon"><Icon name={item.icon}/></span><span><strong>{item.title}{item.badge ? <em>{item.badge}</em> : null}</strong><small>{item.copy}</small></span><Icon name="arrow-up-right" size={15}/></Link>)}
                  </div>
                  <div className="product-mega-foot"><span><Icon name="spark"/> ¿No sabes qué elegir?</span><Link href="/pricing">Abrir Smart Configurator <Icon name="arrow"/></Link></div>
                </motion.div> : null}
              </AnimatePresence>
            </div>
            {nav.slice(2).map((item) => <Link key={item.href} href={item.href} className={cx(pathname.startsWith(item.href) && "is-active")}>{item.label}</Link>)}
          </nav>

          <div className="nav-actions">
            <button className="command-trigger" type="button" onClick={() => setPaletteOpen(true)} aria-label="Abrir command palette">
              <Icon name="search" size={15}/><span>Search</span><kbd>⌘K</kbd>
            </button>
            <Link href="/status" className="nav-status" title="Status"><i/><span>Status</span></Link>
            <Link href="/account" className="nav-login">Sign in</Link>
            <Link href="/pricing" className="button small primary">Deploy <Icon name="arrow" size={14}/></Link>
            <button className="mobile-menu-button" type="button" onClick={() => setMobileOpen((value) => !value)} aria-expanded={mobileOpen} aria-label="Abrir menú">
              <Icon name={mobileOpen ? "x" : "menu"}/>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen ? <motion.div className="mobile-nav is-open" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
            <div className="container mobile-nav-inner">
              <span className="mobile-nav-label">PRODUCTS</span>
              {productLinks.slice(0, 2).map((item) => <Link key={item.href} href={item.href}><span><Icon name={item.icon}/>{item.title}</span><Icon name="chevron"/></Link>)}
              <span className="mobile-nav-label">EXPLORE</span>
              <Link href="/network"><span><Icon name="network"/>Network</span><Icon name="chevron"/></Link>
              <Link href="/pricing"><span><Icon name="sliders"/>Pricing</span><Icon name="chevron"/></Link>
              <Link href="/dashboard-demo"><span><Icon name="layout"/>Nexus Control</span><Icon name="chevron"/></Link>
              <Link href="/status"><span><Icon name="activity"/>Status</span><Icon name="chevron"/></Link>
              <div className="mobile-nav-cta"><Link href="/account" className="button ghost">Sign in</Link><Link href="/pricing" className="button primary">Deploy now</Link></div>
            </div>
          </motion.div> : null}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {paletteOpen ? (
          <motion.div className="command-backdrop" role="presentation" onMouseDown={() => setPaletteOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="command-palette" role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(event) => event.stopPropagation()} initial={{ opacity: 0, y: 16, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: .99 }} transition={{ duration: .16 }}>
              <div className="command-input"><Icon name="search"/><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca una página, producto o acción…"/><kbd>ESC</kbd></div>
              <div className="command-results">
                {filtered.length ? filtered.map((item) => <button key={item.href} type="button" onClick={() => navigate(item.href)}><span className="command-item-icon"><Icon name={item.icon}/></span><span><strong>{item.label}</strong><small>{item.group}</small></span><Icon name="arrow"/></button>) : <div className="command-empty"><Icon name="search"/><strong>Sin resultados</strong><span>Prueba con “VPS”, “Network” o “Pricing”.</span></div>}
              </div>
              <div className="command-footer"><span><kbd>↑</kbd><kbd>↓</kbd> navegar</span><span><kbd>↵</kbd> abrir</span><span><kbd>ESC</kbd> cerrar</span></div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
