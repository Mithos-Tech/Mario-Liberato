import { useState } from 'react';
import { trajectory } from '../content';

// Iconos vectoriales sofisticados de tendencia mundial estilo Framer
const milestoneIcons = [
  // 01. Automatización con IA (Inspyrio Labs) - AI Agent Spark & Neural Core
  (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3c0 4.97 4.03 9 9 9-4.97 0-9 4.03-9 9 0-4.97-4.03-9-9-9 4.97 0 9-4.03 9-9z" />
      <path d="M19 2v4M21 4h-4" />
      <circle cx="12" cy="12" r="2" fill="currentColor" fillOpacity="0.25" />
    </svg>
  ),
  // 02. Desarrollo web con IA (Inspyrio Studio) - Modern Web Frame & Code Engine
  (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 9h18" />
      <circle cx="6.5" cy="6.5" r="1" fill="currentColor" />
      <circle cx="9.5" cy="6.5" r="1" fill="currentColor" />
      <path d="M9.5 13l-2.5 2 2.5 2M14.5 13l2.5 2-2.5 2" />
    </svg>
  ),
  // 03. Soporte técnico y redes (IE 2078) - Network Infrastructure & Servers
  (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="6" rx="2" />
      <rect x="2" y="15" width="20" height="6" rx="2" />
      <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="2.5" />
      <line x1="10" y1="18" x2="10.01" y2="18" strokeWidth="2.5" />
      <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="2.5" />
      <line x1="10" y1="6" x2="10.01" y2="6" strokeWidth="2.5" />
      <path d="M12 9v6M8 12h8" />
    </svg>
  ),
  // 04. Formación profesional (SENATI) - Systems Architecture & Core Processor
  (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="8" y="8" width="8" height="8" rx="1" fill="currentColor" fillOpacity="0.2" />
      <path d="M4 9H2M4 15H2M20 9h2M20 15h2M9 4V2M15 4V2M9 20v2M15 20v2" />
    </svg>
  ),
];

export default function Trajectory() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const items = trajectory.timeline;

  return (
    <section className="s trajectory-sec" id={trajectory.id}>
      <div className="wrap">
        {/* Cabecera estándar calibrada con Montserrat + DM Serif */}
        <header className="section-header section-header-split rv">
          <div className="section-header-left">
            <span className="kick">{trajectory.label}</span>
            <h2 className="section-title">
              <span className="subtitle-main">{trajectory.titlePrefix ?? trajectory.title}</span>
              {trajectory.titleSerif && (
                <span className="subtitle-serif font-serif">{trajectory.titleSerif}</span>
              )}
            </h2>
          </div>
          <div className="section-header-right">
            <p className="section-phrase">{trajectory.lead}</p>
          </div>
        </header>

        {/* Segundo Diseño (Vertical Beam & Active Glow Track) SIN contenedor exterior */}
        <div className="beam-timeline-open rv">
          {/* Viga vertical con haz de luz dinámico continuo */}
          <div className="beam-spine-track" aria-hidden="true">
            <div
              className="beam-spine-glow"
              style={{
                height: `${((activeIdx + 1) / items.length) * 100}%`,
              }}
            />
          </div>

          <div className="beam-timeline-rows">
            {items.map((item, idx) => {
              const isActive = activeIdx === idx;
              const isPast = idx <= activeIdx;

              return (
                <div
                  key={item.when}
                  className={`beam-timeline-row ${isActive ? 'is-active' : ''} ${isPast ? 'is-past' : ''}`}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveIdx(idx);
                    }
                  }}
                >
                  {/* Columna Izquierda: Numerador ordinal y Periodo */}
                  <div className="beam-col-left">
                    <span className="beam-step-num">0{idx + 1}</span>
                    <span className="beam-period-badge">{item.when}</span>
                  </div>

                  {/* Nodo luminoso con anillo de apertura sobre el haz de luz */}
                  <div className="beam-node-anchor" aria-hidden="true">
                    <div className="beam-node-aperture">
                      <span className="beam-node-ring" />
                      <span className="beam-node-core" />
                    </div>
                  </div>

                  {/* Tarjeta del hito de gran formato con pedestal de icono */}
                  <article className="beam-card">
                    {/* Marca de agua de año en la tarjeta */}
                    <div className="beam-card-watermark" aria-hidden="true">
                      {item.when.split('–')[0]}
                    </div>

                    {/* Resplandor especular sutil superior */}
                    <div className="beam-card-shine" aria-hidden="true" />

                    {/* Cabecera de la tarjeta: Icono sofisticado + Badges */}
                    <div className="beam-card-header">
                      <div className="beam-icon-pedestal" aria-hidden="true">
                        {milestoneIcons[idx % milestoneIcons.length]}
                      </div>

                      <div className="beam-header-meta">
                        <div className="beam-meta-badges">
                          <span className="beam-badge-stage">{item.badge}</span>
                          <span className="beam-badge-year-mobile">{item.when}</span>
                        </div>
                        <div className="beam-card-role">{item.role}</div>
                      </div>
                    </div>

                    {/* Título conciso y jerarquía tipográfica */}
                    <h3 className="beam-card-title">{item.title}</h3>

                    {/* Descripción técnica escueta y directa */}
                    <p className="beam-card-desc">{item.text}</p>

                    {/* Stack y tecnologías en cápsulas vidriadas */}
                    <div className="beam-card-tags">
                      {item.tags.map((tag) => (
                        <span key={tag} className="beam-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
