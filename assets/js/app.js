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
      check: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>`
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
            <a class="status-link" href="status.html"><span class="status-dot"></span><span>Estado</span></a>
            <a class="button ghost compact desktop-only" href="cuenta.html">Entrar</a>
            <a class="button primary compact desktop-only" href="planes.html#configurador">Crear servidor ${icon("arrow",15)}</a>
            <button class="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded="false" data-menu-toggle>${icon("menu",22)}</button>
          </div>
        </div>
        <div class="mobile-menu" data-mobile-menu>
          <nav aria-label="Navegación móvil">
            <a href="minecraft.html">${icon("cube")}<span>Minecraft<small>Java, Bedrock y modded</small></span>${icon("chevron")}</a>
            <a href="vps.html">${icon("server")}<span>VPS<small>Linux con acceso root</small></span>${icon("chevron")}</a>
            <a href="network.html">${icon("globe")}<span>Network<small>Nodos y ubicaciones</small></span>${icon("chevron")}</a>
            <a href="planes.html">${icon("gauge")}<span>Precios<small>Planes y configurador</small></span>${icon("chevron")}</a>
            <a href="status.html">${icon("shield")}<span>Status<small>Estado de servicios</small></span>${icon("chevron")}</a>
            <a href="empresa.html">${icon("cloud")}<span>Empresa<small>Acerca de NexusNodes</small></span>${icon("chevron")}</a>
            <a href="contacto.html">${icon("terminal")}<span>Contacto<small>Soporte y contratación</small></span>${icon("chevron")}</a>
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
            <p>Hosting de Minecraft y VPS con una experiencia clara, rápida y pensada para comunidades de LATAM.</p>
            <a class="status-pill" href="status.html"><span class="status-dot"></span> Ver estado de infraestructura ${icon("arrow",14)}</a>
          </div>
          <div class="footer-columns">
            <div><h3>Productos</h3><a href="minecraft.html">Minecraft</a><a href="vps.html">VPS</a><a href="planes.html">Precios</a></div>
            <div><h3>Infraestructura</h3><a href="network.html">Network</a><a href="network.html#locations">Ubicaciones</a><a href="status.html">Status</a></div>
            <div><h3>Empresa</h3><a href="empresa.html">NexusNodes</a><a href="contacto.html">Contacto</a><a href="${DATA.brand?.panelUrl || '#'}" target="_blank" rel="noopener">Panel ${icon("external",12)}</a></div>
          </div>
        </div>
        <div class="container footer-bottom">
          <p>© <span data-year></span> NexusNodes. Todos los derechos reservados.</p>
          <div><a href="status.html">Status</a><span>·</span><a href="contacto.html">Contacto</a></div>
        </div>
      </footer>`;
  }

  function renderShared() {
    const header = document.querySelector("[data-site-header]");
    const footer = document.querySelector("[data-site-footer]");
    if (header) header.innerHTML = headerMarkup();
    if (footer) footer.innerHTML = footerMarkup();
    document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
  }

  function initMenu() {
    const toggle = document.querySelector("[data-menu-toggle]");
    const menu = document.querySelector("[data-mobile-menu]");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      toggle.innerHTML = open ? icon("close",22) : icon("menu",22);
    });
    menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => document.body.classList.remove("menu-open")));
  }

  function initHeaderScroll() {
    const header = document.querySelector("[data-header]");
    if (!header) return;
    const update = () => header.classList.toggle("scrolled", window.scrollY > 10);
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
    }, { threshold: 0.12, rootMargin: "0px 0px -32px" });
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
        const text = button.dataset.copy;
        try {
          await navigator.clipboard.writeText(text);
          const old = button.innerHTML;
          button.textContent = "Copiado";
          setTimeout(() => button.innerHTML = old, 1400);
        } catch (_) {
          button.textContent = text;
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
        card.style.setProperty("--rx", `${(-y * 4).toFixed(2)}deg`);
        card.style.setProperty("--ry", `${(x * 5).toFixed(2)}deg`);
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
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }

  window.NexusUI = { icon };

  document.addEventListener("DOMContentLoaded", () => {
    renderShared();
    initMenu();
    initHeaderScroll();
    initReveal();
    initFaq();
    initCopyButtons();
    initPointerGlow();
    initTilt();
    initAnchorOffset();
  });
})();
