import { ImageResponse } from "next/og";

export const alt = "NexusNodes — Minecraft Hosting & Cloud VPS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#06070b", color: "white", fontFamily: "sans-serif" }}>
      <div style={{ position: "absolute", width: 560, height: 560, borderRadius: 999, right: -120, top: -170, background: "rgba(111,85,255,.26)" }}/>
      <div style={{ position: "absolute", width: 420, height: 420, borderRadius: 999, left: -160, bottom: -190, background: "rgba(61,124,255,.16)" }}/>
      <div style={{ width: "100%", padding: "72px 78px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}><div style={{ width: 54, height: 54, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#8068ff,#5f49dc)", fontSize: 25, fontWeight: 900 }}>N</div><div style={{ fontSize: 27, fontWeight: 800 }}>NexusNodes</div></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 930 }}><div style={{ fontSize: 76, fontWeight: 850, lineHeight: .98, letterSpacing: "-4px" }}>Deploy closer.<br/>Control everything.</div><div style={{ fontSize: 25, color: "#a0a7b8", lineHeight: 1.45 }}>Minecraft hosting and cloud infrastructure with transparent resources, regions and pricing context.</div></div>
        <div style={{ display: "flex", gap: 12 }}><div style={{ padding: "11px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,.12)", color: "#c5cada", fontSize: 16 }}>Minecraft</div><div style={{ padding: "11px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,.12)", color: "#c5cada", fontSize: 16 }}>Cloud VPS</div><div style={{ padding: "11px 16px", borderRadius: 999, border: "1px solid rgba(255,255,255,.12)", color: "#c5cada", fontSize: 16 }}>LATAM + North America</div></div>
      </div>
    </div>,
    size
  );
}
