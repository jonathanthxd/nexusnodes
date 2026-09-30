import type { MetadataRoute } from "next";
import { nodes } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://nexusnodes.lat";
  const routes = ["", "/minecraft", "/vps", "/network", "/pricing", "/account", "/status", "/company", "/contact", "/dashboard-demo"];
  return [
    ...routes.map((route) => ({ url: `${base}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" as const : "monthly" as const, priority: route === "" ? 1 : 0.8 })),
    ...nodes.map((node) => ({ url: `${base}/network/${node.id}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 }))
  ];
}
