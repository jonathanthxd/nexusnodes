import type { ReactNode } from "react";

export function SectionHeading({ eyebrow, title, copy, action, align = "left" }: { eyebrow: string; title: ReactNode; copy?: ReactNode; action?: ReactNode; align?: "left" | "center" }) {
  return (
    <div className={`section-heading ${align === "center" ? "is-center" : ""}`}>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
      {action ? <div className="section-heading-action">{action}</div> : null}
    </div>
  );
}
