import type { ReactNode } from "react";
import { Icon } from "./icon";

export function PageHero({ eyebrow, title, copy, actions, visual, compact = false }: { eyebrow: string; title: ReactNode; copy: ReactNode; actions?: ReactNode; visual?: ReactNode; compact?: boolean }) {
  return (
    <section className={`page-hero ${compact ? "is-compact" : ""}`}>
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="hero-orb orb-one" aria-hidden="true" />
      <div className="hero-orb orb-two" aria-hidden="true" />
      <div className="page-hero-rings" aria-hidden="true"><i/><i/><i/></div>
      <div className="container page-hero-grid">
        <div className="page-hero-copy">
          <span className="hero-kicker"><i/><span>{eyebrow}</span><Icon name="arrow-up-right"/></span>
          <h1>{title}</h1>
          <p>{copy}</p>
          {actions ? <div className="hero-actions">{actions}</div> : null}
        </div>
        {visual ? <div className="page-hero-visual"><div className="page-visual-halo" aria-hidden="true"/>{visual}</div> : null}
      </div>
    </section>
  );
}
