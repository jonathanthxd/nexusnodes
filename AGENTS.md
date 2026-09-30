# NexusNodes agent notes

- Framework: Next.js App Router.
- Prefer Server Components unless browser state/events are required.
- Keep catalog data in `src/lib/catalog.ts`.
- Keep price math in `src/lib/pricing.ts`; production billing is authoritative elsewhere.
- Never add Pterodactyl Application API keys to client components or `NEXT_PUBLIC_*` variables.
- Preserve the dark Nexus design system in `src/app/globals.css`.
- New node-specific pages should derive from catalog data instead of duplicating constants.
- Any status/latency/live metric must identify whether it is configured, measured, or fetched from a real source.
