"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Icon, type IconName } from "./icon";
import { cx } from "@/lib/utils";

const layers: Array<{
  id: string;
  label: string;
  icon: IconName;
  eyebrow: string;
  title: string;
  copy: string;
  owns: string[];
  boundary: string;
  surface: string;
}> = [
  { id: "experience", label: "Experience", icon: "layout", eyebrow: "01 · EXPERIENCE", title: "Discovery should feel like the product.", copy: "Next.js renders the catalog, routes and metadata on the server, then hydrates only the controls that need state or motion.", owns: ["Discovery", "Configurator UX", "Metadata", "Public catalog"], boundary: "Never becomes billing authority.", surface: "App Router + Server Components" },
  { id: "identity", label: "Identity", icon: "key", eyebrow: "02 · IDENTITY", title: "A customer boundary, not a form hack.", copy: "Sessions, verification and customer state belong behind secure server boundaries. The public UI only carries deployment intent forward.", owns: ["Session", "Customer", "Access policy", "Account context"], boundary: "Credentials never reach provisioning directly.", surface: "Auth + HttpOnly session" },
  { id: "commerce", label: "Commerce", icon: "wallet", eyebrow: "03 · COMMERCE", title: "The price becomes authoritative here.", copy: "Catalog estimates are useful for UX. Billing validates stock, rules, taxes, discounts and the immutable quote used by checkout.", owns: ["Authoritative quote", "Tax", "Payment", "Order state"], boundary: "Never trusts totals sent by the browser.", surface: "Billing + payment webhooks" },
  { id: "provision", label: "Provision", icon: "server", eyebrow: "04 · PROVISION", title: "Paid intent becomes infrastructure.", copy: "A worker resolves allocations and external resources only after the order state is valid and idempotent.", owns: ["Capacity", "Allocation", "Pterodactyl", "Lifecycle"], boundary: "Administrative keys stay server-side.", surface: "Workers + infrastructure APIs" }
];

export function PlatformArchitecture() {
  const [active, setActive] = useState(layers[0].id);
  const layer = layers.find((item) => item.id === active) ?? layers[0];

  return (
    <div className="architecture-v5">
      <div className="architecture-rail" role="tablist" aria-label="Platform layers">
        <span className="micro-label">PLATFORM LAYERS</span>
        {layers.map((item, index) => (
          <button key={item.id} role="tab" aria-selected={active === item.id} className={cx(active === item.id && "is-active")} onClick={() => setActive(item.id)}>
            <span className="architecture-index">0{index + 1}</span>
            <span className="architecture-icon"><Icon name={item.icon}/></span>
            <span><strong>{item.label}</strong><small>{item.surface}</small></span>
            <Icon name="chevron"/>
          </button>
        ))}
      </div>

      <div className="architecture-stage">
        <div className="architecture-stage-grid" aria-hidden="true"/>
        <AnimatePresence mode="wait">
          <motion.div key={layer.id} className="architecture-content" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .2 }}>
            <span className="eyebrow">{layer.eyebrow}</span>
            <h3>{layer.title}</h3>
            <p>{layer.copy}</p>
            <div className="architecture-owns">
              {layer.owns.map((item) => <span key={item}><Icon name="check-circle"/>{item}</span>)}
            </div>
            <div className="architecture-boundary"><Icon name="shield"/><span><small>BOUNDARY</small><strong>{layer.boundary}</strong></span></div>
          </motion.div>
        </AnimatePresence>
        <div className="architecture-orbit" aria-hidden="true"><i/><i/><i/><span>N</span></div>
      </div>
    </div>
  );
}
