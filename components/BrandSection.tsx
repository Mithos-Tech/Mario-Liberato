import type { BrandSectionData, CardData, StudioProjectItem } from '../content';
import SupportBento from './SupportBento';
import InspyrioLabs from './InspyrioLabs';
import { getOptimizedCloudinaryUrl, getCloudinarySrcSet } from '../utils/cloudinary';

function Card({ c }: { c: CardData }) {
  return (
    <div className="card rv">
      <h3>{c.title}</h3>
      {c.items && <ul>{c.items.map((t) => <li key={t}>{t}</li>)}</ul>}
      {c.tags && <div className="tags">{c.tags.map((g) => <span key={g}>{g}</span>)}</div>}
      {c.pairs && c.pairs.map(([k, v]) => <p key={k}><b>{k}</b> {v}</p>)}
      {c.text && <p>{c.text}</p>}
      {c.button && <div className="btns" style={{ marginTop: 20 }}><a className="btn hot" href={c.button.href}>{c.button.label}</a></div>}
    </div>
  );
}

// Escaparate de proyectos Inspyrio Studio (Diseño Web) estilo Framer: Mockups puros con botón diagonal y meta inferior
function StudioShowcase({ projects }: { projects: StudioProjectItem[] }) {
  return (
    <div className="studio-showcase-grid">
      {projects.map((project, idx) => (
        <article className={`studio-project-card rv rv-stagger-${idx + 1}`} key={project.title}>
          {/* Contenedor del mockup: Proporción 2:3 limpia con botón diagonal al sitio real */}
          <div className="studio-mockup-frame">
            <img
              src={getOptimizedCloudinaryUrl(project.image, 800)}
              srcSet={getCloudinarySrcSet(project.image, [400, 720, 1100])}
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px"
              alt={`Mockup de ${project.title}`}
              className="studio-mockup-img"
              loading="lazy"
            />
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="studio-mockup-link-btn"
              aria-label={`Visitar sitio web de ${project.title}`}
              title={`Ver ${project.title} (Abre en nueva pestaña)`}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="studio-diagonal-arrow"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>

          {/* Información inferior del proyecto: Nombre sofisticado y definición de 1 o 2 palabras */}
          <div className="studio-project-info">
            <h3 className="studio-project-name">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="studio-project-name-link"
              >
                {project.title}
              </a>
            </h3>
            <p className="studio-project-category">{project.category}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function BrandSection({ data }: { data: BrandSectionData }) {
  return (
    <section className="s" id={data.id}>
      <div className="wrap">
        <header className="section-header section-header-split rv">
          <div className="section-header-left">
            <span className="kick">
              <span className="kick-dot" aria-hidden="true" />
              {data.label}
            </span>
            <h2 className="section-title">
              <span className="subtitle-main">{data.titlePrefix ?? data.title}</span>
              {data.titleSerif && <span className="subtitle-serif font-serif">{data.titleSerif}</span>}
            </h2>
          </div>
          <div className="section-header-right">
            <p className="section-phrase">{data.lead}</p>
            {data.headButton && (
              <div className="section-head-btn">
                <a className="btn ghost" href={data.headButton.href}>{data.headButton.label}</a>
              </div>
            )}
          </div>
        </header>

        {/* Diferenciación visual por sección: Bento para Soporte TI, Showcase para Inspyrio Studio, Interactive Labs para Inspyrio Labs */}
        {data.bento ? (
          <SupportBento bento={data.bento} />
        ) : data.projects ? (
          <StudioShowcase projects={data.projects} />
        ) : data.id === 'ia' ? (
          <InspyrioLabs />
        ) : (
          <div className="grid">
            {data.cards?.map((c) => <Card key={c.title} c={c} />)}
            {data.tiles?.map((t) => (
              <article className="tile rv" key={t.title}>
                <div className="thumb" />
                <div className="b">
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                  <div className="tags">{t.tags.map((g) => <span key={g}>{g}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
