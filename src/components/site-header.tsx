"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "./icon";
import { cx } from "@/lib/utils";

const nav = [
  ["Minecraft", "/minecraft"],
  ["VPS", "/vps"],
  ["Network", "/network"],
  ["Precios", "/pricing"]
] as const;

const paletteItems = [
  ["Ir a Minecraft Hosting", "/minecraft", "Producto"],
  ["Configurar un VPS", "/vps", "Producto"],
  ["Abrir configurador", "/pricing", "Acción"],
  ["Explorar nodos", "/network", "Infraestructura"],
  ["Ver status", "/status", "Infraestructura"],
  ["Dashboard demo", "/dashboard-demo", "Demo"],
  ["Iniciar sesión", "/account", "Cuenta"],
  ["Contactar", "/contact", "Ayuda"]
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
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
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  useEffect(() => {
    if (paletteOpen) setTimeout(() => inputRef.current?.focus(), 0);
    else setQuery("");
  }, [paletteOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setPaletteOpen(false);
  }, [pathname]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return paletteItems;
    return paletteItems.filter(([label, , group]) => `${label} ${group}`.toLowerCase().includes(needle));
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
            <Image src="/logo-mark.png" width={38} height={38} alt="" priority />
            <span>NexusNodes</span>
          </Link>

          <nav className="desktop-nav" aria-label="Navegación principal">
            {nav.map(([label, href]) => <Link key={href} href={href} className={cx(pathname === href && "is-active")}>{label}</Link>)}
          </nav>

          <div className="nav-actions">
            <button className="command-trigger" type="button" onClick={() => setPaletteOpen(true)} aria-label="Abrir buscador de comandos">
              <Icon name="search"/><span>Buscar</span><kbd>⌘K</kbd>
            </button>
            <Link href="/account" className="nav-login">Cuenta</Link>
            <Link href="/pricing" className="button small primary">Configurar</Link>
            <button className="mobile-menu-button" type="button" onClick={() => setMobileOpen((value) => !value)} aria-expanded={mobileOpen} aria-label="Abrir menú">
              <Icon name={mobileOpen ? "x" : "menu"}/>
            </button>
          </div>
        </div>
        <div className={cx("mobile-nav", mobileOpen && "is-open")}> 
          <div className="container mobile-nav-inner">
            {nav.map(([label, href]) => <Link key={href} href={href}>{label}<Icon name="chevron"/></Link>)}
            <Link href="/status">Status<Icon name="chevron"/></Link>
            <Link href="/company">Empresa<Icon name="chevron"/></Link>
            <Link href="/contact">Contacto<Icon name="chevron"/></Link>
            <div className="mobile-nav-cta"><Link href="/account" className="button ghost">Cuenta</Link><Link href="/pricing" className="button primary">Configurar servidor</Link></div>
          </div>
        </div>
      </header>

      {paletteOpen ? (
        <div className="command-backdrop" role="presentation" onMouseDown={() => setPaletteOpen(false)}>
          <div className="command-palette" role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(event) => event.stopPropagation()}>
            <div className="command-input"><Icon name="search"/><input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busca una página o acción…"/><kbd>ESC</kbd></div>
            <div className="command-results">
              {filtered.length ? filtered.map(([label, href, group]) => <button key={href} type="button" onClick={() => navigate(href)}><span><strong>{label}</strong><small>{group}</small></span><Icon name="arrow"/></button>) : <div className="command-empty">No encontramos esa acción.</div>}
            </div>
            <div className="command-footer"><span>↑↓ navegar</span><span>↵ abrir</span><span>ESC cerrar</span></div>
          </div>
        </div>
      ) : null}
    </>
  );
}
