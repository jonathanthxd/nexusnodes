import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NexusNodes",
    short_name: "NexusNodes",
    description: "Minecraft hosting y VPS con recursos transparentes.",
    start_url: "/",
    display: "standalone",
    background_color: "#06070b",
    theme_color: "#6f5cff",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
