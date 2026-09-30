"use client";

import { useEffect } from "react";
import { Icon } from "@/components/icon";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <section className="error-page"><div><span className="eyebrow">APPLICATION ERROR</span><h1>Algo no cargó como debía.</h1><p>La aplicación encontró un error de renderizado. Puedes reintentar sin recargar toda la experiencia.</p><button className="button primary" onClick={reset}>Reintentar <Icon name="arrow"/></button></div></section>;
}
