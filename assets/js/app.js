(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const DATA = window.NEXUS_DATA || {};
  const page = document.body.dataset.page || "";

  const icon = (name, size = 18) => {
    const icons = {
      chevron: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`,
      arrow: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
      menu: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
      close: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>`,
      server: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/><path d="M7 7h.01M7 17h.01M11 7h6M11 17h6"/></svg>`,
      cloud: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.5 19H7a5 5 0 1 1 1.4-9.8A7 7 0 0 1 21 13.5 5.5 5.5 0 0 1 17.5 19Z"/></svg>`,
      globe: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>`,
      gauge: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 14a8 8 0 1 1 16 0"/><path d="m12 14 4-4"/><path d="M6.5 17.5h11"/></svg>`,
      shield: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 4.5 6v5.5c0 4.6 3.2 7.7 7.5 9.5 4.3-1.8 7.5-4.9 7.5-9.5V6L12 3Z"/><path d="m9 12 2 2 4-4"/></svg>`,
      terminal: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3M13 15h4"/></svg>`,
      cube: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/></svg>`,
      external: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9"/><path d="M19 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6"/></svg>`,
      check: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>`,
      search: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg>`,
      spark: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.2 4.2L17 9l-3.8 1.8L12 15l-1.2-4.2L7 9l3.8-1.8L12 3Z"/><path d="m18.5 14 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z"/></svg>`,
      copy: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>`,
      bookmark: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12v17l-6-4-6 4V4Z"/></svg>`,
      link: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1.1"/></svg>`,
      reset: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7v5h5"/><path d="M5.5 16a8 8 0 1 0 1-9L4 9"/></svg>`,
      bolt: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 5 14h6l-1 8 9-13h-6V2Z"/></svg>`,
      chart: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></svg>`
    };
    return `<span class="icon" style="--icon-size:${size}px">${icons[name] || icons.arrow}</span>`;
  };

  function headerMarkup() {
    const links = [
      ["minecraft", "Minecraft", "minecraft.html"],
      ["vps", "VPS", "vps.html"],
      ["network", "Network", "network.html"],
      ["planes", "Precios", "planes.html"],
      ["empresa", "Empresa", "empresa.html"]
    ];
    return `
      <a class="skip-link" href="#main">Saltar al contenido</a>
      <div class="scroll-progress" aria-hidden="true"><i data-scroll-progress></i></div>
      <header class="site-header" data-header>
        <div class="nav-shell">
          <a class="brand" href="index.html" aria-label="NexusNodes - Inicio">
            <span class="brand-logo-wrap"><img src="assets/SinFondo.png" alt="" width="38" height="38"></span>
            <span class="brand-word">Nexus<span>Nodes</span></span>
          </a>
          <nav class="desktop-nav" aria-label="Navegación principal">
            ${links.map(([id,label,href]) => `<a class="${page===id?'active':''}" href="${href}">${label}</a>`).join("")}
          </nav>
          <div class="nav-right">
            <button class="command-trigger desktop-only" type="button" data-command-open aria-label="Abrir navegación rápida">${icon("search",14)}<span>Buscar</span><kbd>⌘K</kbd></button>
            <a class="status-link" href="status.html"><span class="status-dot"></span><span>Estado</span></a>
            <a class="button ghost compact desktop-only" href="cuenta.html">Entrar</a>
            <a class="button primary compact desktop-only" href="planes.html#configurador">Crear servidor ${icon("arrow",15)}</a>
            <button class="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded="false" data-menu-toggle>${icon("menu",22)}</button>
          </div>
        </div>
        <div class="mobile-menu" data-mobile-menu>
          <nav aria-label="Navegación móvil">
            <a href="minecraft.html">${icon("cube")}<span>Minecraft<small>Java, Bedrock, plugins y mods</small></span>${icon("chevron")}</a>
            <a href="vps.html">${icon("server")}<span>VPS<small>Linux con acceso root</small></span>${icon("chevron")}</a>
            <a href="network.html">${icon("globe")}<span>Network<small>Nodos, regiones y comparador</small></span>${icon("chevron")}</a>
            <a href="planes.html">${icon("gauge")}<span>Precios<small>Smart sizing y configurador</small></span>${icon("chevron")}</a>
            <a href="status.html">${icon("shield")}<span>Status<small>Estado de servicios</small></span>${icon("chevron")}</a>
            <a href="empresa.html">${icon("cloud")}<span>Empresa<small>Acerca de NexusNodes</small></span>${icon("chevron")}</a>
            <a href="contacto.html">${icon("terminal")}<span>Contacto<small>Soporte y preventa</small></span>${icon("chevron")}</a>
          </nav>
          <div class="mobile-actions">
            <a class="button ghost" href="cuenta.html">Iniciar sesión</a>
            <a class="button primary" href="planes.html#configurador">Crear servidor</a>
          </div>
        </div>
      </header>`;
  }

  function footerMarkup() {
    return `
      <footer class="site-footer">
        <div class="container footer-top">
          <div class="footer-intro">
            <a class="brand" href="index.html">
              <span class="brand-logo-wrap"><img src="assets/SinFondo.png" alt="" width="38" height="38"></span>
              <span class="brand-word">Nexus<span>Nodes</span></span>
            </a>
            <p>Hosting de Minecraft y VPS con recursos claros, nodos en Norteamérica/LATAM y una experiencia de compra que explica lo que estás contratando.</p>
            <a class="status-pill" href="status.html"><span class="status-dot"></span> Estado de infraestructura ${icon("arrow",14)}</a>
          </div>
          <div class="footer-columns">
            <div><h3>Productos</h3><a href="minecraft.html">Minecraft</a><a href="vps.html">VPS</a><a href="planes.html">Precios</a></div>
            <div><h3>Infraestructura</h3><a href="network.html">Network</a><a href="network.html#locations">Ubicaciones</a><a href="status.html">Status</a></div>
            <div><h3>Empresa</h3><a href="empresa.html">NexusNodes</a><a href="contacto.html">Contacto</a><a href="${DATA.brand?.panelUrl || '#'}" target="_blank" rel="noopener">Panel ${icon("external",12)}</a></div>
          </div>
        </div>
        <div class="container footer-bottom">
          <p>© <span data-year></span> NexusNodes. Todos los derechos reservados.</p>
          <div><span class="footer-version">Web ${DATA.version || "3"}</span><span>·</span><a href="status.html">Status</a><span>·</span><a href="contacto.html">Contacto</a></div>
        </div>
      </footer>`;
  }

  function commandMarkup() {
    const items = [
      ["Minecraft Hosting", "Java, Bedrock, plugins y mods", "minecraft.html", "cube"],
      ["VPS", "Linux, root y recursos configurables", "vps.html", "server"],
      ["Configurar servidor", "Smart sizing + precio estimado", "planes.html#configurador", "spark"],
      ["Network", "Nodos y regiones", "network.html", "globe"],
      ["Status", "Estado de servicios", "status.html", "shield"],
      ["Cuenta", "Iniciar sesión o crear cuenta", "cuenta.html", "terminal"],
      ["Contacto", "Preventa y soporte", "contacto.html", "cloud"]
    ];
    return `<div class="command-overlay" data-command-overlay hidden>
      <div class="command-backdrop" data-command-close></div>
      <section class="command-panel" role="dialog" aria-modal="true" aria-label="Navegación rápida">
        <div class="command-search">${icon("search",18)}<input type="search" placeholder="Buscar producto o página…" autocomplete="off" data-command-input><kbd>ESC</kbd></div>
        <div class="command-list" data-command-list>
          ${items.map(([title,desc,href,ico])=>`<a href="${href}" data-command-item data-search="${(title+' '+desc).toLowerCase()}">${icon(ico,18)}<span><strong>${title}</strong><small>${desc}</small></span>${icon("arrow",14)}</a>`).join("")}
        </div>
        <div class="command-empty" data-command-empty hidden>No encontramos nada con ese término.</div>
        <div class="command-footer"><span>↑↓ navegar</span><span>Enter abrir</span><span>Esc cerrar</span></div>
      </section>
    </div>`;
  }

  function toastMarkup() {
    return `<div class="toast-stack" aria-live="polite" aria-atomic="true" data-toast-stack></div>`;
  }

  function renderShared() {
    const header = document.querySelector("[data-site-header]");
    const footer = document.querySelector("[data-site-footer]");
    if (header) header.innerHTML = headerMarkup();
    if (footer) footer.innerHTML = footerMarkup();
    document.body.insertAdjacentHTML("beforeend", commandMarkup() + toastMarkup());
    document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
  }

  function toast(message, tone = "default") {
    const stack = document.querySelector("[data-toast-stack]");
    if (!stack) return;
    const el = document.createElement("div");
    el.className = `toast ${tone}`;
    el.innerHTML = `<span class="toast-dot"></span><span>${message}</span>`;
    stack.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 250);
    }, 2600);
  }

  function initMenu() {
    const toggle = document.querySelector("[data-menu-toggle]");
    const menu = document.querySelector("[data-mobile-menu]");
    if (!toggle || !menu) return;
    const close = () => {
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Abrir menú");
      toggle.innerHTML = icon("menu",22);
    };
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      toggle.innerHTML = open ? icon("close",22) : icon("menu",22);
    });
    menu.querySelectorAll("a").forEach(link => link.addEventListener("click", close));
    window.addEventListener("resize", () => { if (innerWidth > 900) close(); }, { passive: true });
  }

  function initHeaderScroll() {
    const header = document.querySelector("[data-header]");
    const progress = document.querySelector("[data-scroll-progress]");
    const update = () => {
      if (header) header.classList.toggle("scrolled", window.scrollY > 10);
      if (progress) {
        const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
        progress.style.transform = `scaleX(${Math.min(1, scrollY / max)})`;
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function initReveal() {
    const items = document.querySelectorAll("[data-reveal]");
    if (!items.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach(el => el.classList.add("revealed"));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -28px" });
    items.forEach(el => io.observe(el));
  }

  function initFaq() {
    document.querySelectorAll("[data-faq]").forEach(item => {
      const button = item.querySelector("button");
      if (!button) return;
      button.addEventListener("click", () => {
        const open = item.classList.toggle("open");
        button.setAttribute("aria-expanded", String(open));
      });
    });
  }

  function initCopyButtons() {
    document.querySelectorAll("[data-copy]").forEach(button => {
      button.addEventListener("click", async () => {
        const value = button.dataset.copy || "";
        try {
          await navigator.clipboard.writeText(value);
          toast("Copiado al portapapeles", "success");
        } catch (_) {
          toast("No se pudo copiar automáticamente", "warning");
        }
      });
    });
  }

  function initPointerGlow() {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    window.addEventListener("pointermove", e => {
      document.documentElement.style.setProperty("--pointer-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${e.clientY}px`);
    }, { passive: true });
  }

  function initTilt() {
    if (!window.matchMedia("(pointer:fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelectorAll("[data-tilt]").forEach(card => {
      card.addEventListener("pointermove", e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - .5;
        const y = (e.clientY - rect.top) / rect.height - .5;
        card.style.setProperty("--rx", `${(-y * 3.6).toFixed(2)}deg`);
        card.style.setProperty("--ry", `${(x * 4.2).toFixed(2)}deg`);
        card.style.setProperty("--cx", `${((x + .5) * 100).toFixed(1)}%`);
        card.style.setProperty("--cy", `${((y + .5) * 100).toFixed(1)}%`);
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
  }

  function initAnchorOffset() {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 90);
  }

  function initCommandPalette() {
    const overlay = document.querySelector("[data-command-overlay]");
    const input = document.querySelector("[data-command-input]");
    const list = document.querySelector("[data-command-list]");
    const empty = document.querySelector("[data-command-empty]");
    if (!overlay || !input || !list) return;
    let active = 0;

    const items = () => [...list.querySelectorAll("[data-command-item]")].filter(el => !el.hidden);
    const paint = () => items().forEach((el, i) => el.classList.toggle("active", i === active));
    const filter = () => {
      const q = input.value.trim().toLowerCase();
      [...list.querySelectorAll("[data-command-item]")].forEach(el => el.hidden = q && !el.dataset.search.includes(q));
      active = 0;
      const visible = items();
      if (empty) empty.hidden = visible.length > 0;
      paint();
    };
    const open = () => {
      overlay.hidden = false;
      document.body.classList.add("command-open");
      input.value = "";
      [...list.querySelectorAll("[data-command-item]")].forEach(el => el.hidden = false);
      active = 0;
      paint();
      requestAnimationFrame(() => { overlay.classList.add("open"); input.focus(); });
    };
    const close = () => {
      overlay.classList.remove("open");
      document.body.classList.remove("command-open");
      setTimeout(() => { overlay.hidden = true; }, 180);
    };

    document.querySelectorAll("[data-command-open]").forEach(el => el.addEventListener("click", open));
    document.querySelectorAll("[data-command-close]").forEach(el => el.addEventListener("click", close));
    input.addEventListener("input", filter);
    input.addEventListener("keydown", e => {
      const visible = items();
      if (e.key === "ArrowDown") { e.preventDefault(); active = Math.min(visible.length - 1, active + 1); paint(); visible[active]?.scrollIntoView({block:"nearest"}); }
      if (e.key === "ArrowUp") { e.preventDefault(); active = Math.max(0, active - 1); paint(); visible[active]?.scrollIntoView({block:"nearest"}); }
      if (e.key === "Enter" && visible[active]) { e.preventDefault(); visible[active].click(); }
      if (e.key === "Escape") close();
    });
    document.addEventListener("keydown", e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); overlay.hidden ? open() : close(); }
      if (e.key === "Escape" && !overlay.hidden) close();
    });
  }

  function initCounters() {
    const els = document.querySelectorAll("[data-count]");
    if (!els.length || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animate = el => {
      const target = Number(el.dataset.count || 0);
      const suffix = el.dataset.suffix || "";
      const duration = 750;
      const start = performance.now();
      const tick = now => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (!("IntersectionObserver" in window)) return els.forEach(animate);
    const io = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); } }), {threshold:.5});
    els.forEach(el => io.observe(el));
  }

  function initNativeShare() {
    document.querySelectorAll("[data-share-url]").forEach(btn => {
      btn.addEventListener("click", async () => {
        const url = btn.dataset.shareUrl || location.href;
        if (navigator.share) {
          try { await navigator.share({ title: document.title, url }); } catch (_) {}
          return;
        }
        try { await navigator.clipboard.writeText(url); toast("Enlace copiado", "success"); }
        catch (_) { toast("Copia el enlace desde la barra del navegador", "warning"); }
      });
    });
  }

  window.NexusUI = {
    icon,
    toast,
    money(value) { return new Intl.NumberFormat("en-US", { style:"currency", currency: DATA.pricing?.currency || "USD", minimumFractionDigits:2 }).format(Number(value) || 0); },
    saveDraft(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (_) { return false; } },
    readDraft(key) { try { return JSON.parse(localStorage.getItem(key) || "null"); } catch (_) { return null; } }
  };

  document.addEventListener("DOMContentLoaded", () => {
    renderShared();
    initMenu();
    initHeaderScroll();
    initReveal();
    initFaq();
    initCopyButtons();
    initPointerGlow();
    initTilt();
    initCommandPalette();
    initCounters();
    initNativeShare();
    initAnchorOffset();
  });
})();
