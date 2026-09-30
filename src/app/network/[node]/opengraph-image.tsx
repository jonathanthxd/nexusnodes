import { ImageResponse } from "next/og";
import { nodes } from "@/lib/catalog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function NodeOpenGraphImage({ params }: { params: Promise<{ node: string }> }) {
  const { node: nodeId } = await params;
  const node = nodes.find((item) => item.id === nodeId) ?? nodes[0];
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#06070b", color: "white", fontFamily: "sans-serif", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 520, height: 520, borderRadius: 999, right: -110, top: -170, background: "rgba(111,85,255,.24)" }}/>
      <div style={{ width: "100%", padding: 76, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13, color: "#a69cff", fontSize: 20, fontWeight: 800 }}>NEXUS NETWORK · {node.code}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 30 }}><div style={{ fontSize: 96 }}>{node.flag}</div><div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 76, fontWeight: 850, letterSpacing: "-4px" }}>{node.city}</div><div style={{ color: "#9aa2b3", fontSize: 28 }}>{node.region}</div></div></div>
        <div style={{ display: "flex", gap: 12 }}><div style={{ padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(255,255,255,.12)", color: "#c7ccd7", fontSize: 18 }}>{node.processor}</div><div style={{ padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(255,255,255,.12)", color: "#c7ccd7", fontSize: 18 }}>{node.tierLabel}</div><div style={{ padding: "12px 16px", borderRadius: 14, border: "1px solid rgba(255,255,255,.12)", color: "#c7ccd7", fontSize: 18 }}>Minecraft ${node.minecraftPerGb.toFixed(2)}/GB</div></div>
      </div>
    </div>,
    size
  );
}
