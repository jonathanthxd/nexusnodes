export default function Loading() {
  return (
    <section className="route-skeleton" aria-label="Cargando contenido">
      <div className="hero-grid-bg" />
      <div className="container route-skeleton-grid">
        <div className="skeleton-copy">
          <span className="skeleton-line tiny" />
          <span className="skeleton-line title" />
          <span className="skeleton-line title short" />
          <span className="skeleton-line body" />
          <span className="skeleton-line body short" />
          <div className="skeleton-actions"><i /><i /></div>
        </div>
        <div className="skeleton-panel">
          <div className="skeleton-panel-top"><i /><span /></div>
          <div className="skeleton-panel-grid"><i /><i /><i /></div>
          <span className="skeleton-line body" />
          <span className="skeleton-line body short" />
        </div>
      </div>
    </section>
  );
}
