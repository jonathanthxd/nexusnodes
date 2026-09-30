"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { nodes } from "@/lib/catalog";
import { Icon } from "./icon";
import { cx } from "@/lib/utils";

export function NetworkVisual({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(nodes[1].id);
  const selected = useMemo(() => nodes.find((node) => node.id === active) ?? nodes[0], [active]);

  return (
    <div className={cx("network-visual", compact && "is-compact")}>
      <div className="network-visual-top">
        <div><span className="micro-label">NEXUS NETWORK</span><strong>{selected.code}</strong></div>
        <span className="live-pill"><i /> CATALOG READY</span>
      </div>
      <div className="network-map" aria-label="Mapa conceptual de nodos NexusNodes">
        <div className="map-surface" />
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path className="route-line route-a" d="M30 39 C34 40, 34 45, 37 47" />
          <path className="route-line route-b" d="M37 47 C42 58, 44 68, 44 79" />
          <path className="route-line route-c" d="M44 79 C46 81, 48 81, 50 81" />
          <path className="route-line route-d" d="M37 47 C38 46, 39 45, 39 45" />
        </svg>
        <span className="map-continent north">NORTH<br/>AMERICA</span>
        <span className="map-continent south">SOUTH<br/>AMERICA</span>
        {nodes.map((node) => (
          <button
            key={node.id}
            className={cx("map-node", node.id === active && "is-active", `tier-${node.tier}`)}
            style={{ left: `${node.coords.x}%`, top: `${node.coords.y}%` }}
            onClick={() => setActive(node.id)}
            aria-label={`Seleccionar ${node.city}`}
          >
            <i />
            <span>{node.code}</span>
          </button>
        ))}
      </div>
      <div className="network-node-card">
        <div className="network-node-main"><span className="node-flag">{selected.flag}</span><div><strong>{selected.city}</strong><span>{selected.region}</span></div></div>
        <div className="node-chip-row"><span><Icon name="cpu"/>{selected.processor}</span><span><Icon name="bolt"/>{selected.tierLabel}</span></div>
        <div className="node-prices"><div><span>Minecraft</span><strong>${selected.minecraftPerGb.toFixed(2)}<small>/GB</small></strong></div><div><span>VPS</span><strong>${selected.vpsPerGb.toFixed(3).replace(/0+$/, "")}<small>/GB</small></strong></div></div>
        <Link href={`/network/${selected.id}`} className="inline-link">Abrir ficha del nodo <Icon name="arrow"/></Link>
      </div>
    </div>
  );
}
