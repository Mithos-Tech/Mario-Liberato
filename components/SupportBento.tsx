import React from 'react';
import type { SupportBentoData } from '../content';

export default function SupportBento({ bento }: { bento: SupportBentoData }) {
  const aula = bento.aulaTecnologica;

  return (
    <div className="bento-tech-grid rv">
      {/* ========================================================
          COLUMNA 1 (Izquierda): 2 Tarjetas Cuadradas (1:1)
          ======================================================== */}
      <div className="bento-tech-col">
        {/* Tarjeta 1A: Repotenciación All-in-One HP (Video 1:1, sin etiqueta superior) */}
        <article className="bento-tech-card bento-card-fullbleed bento-card-aio">
          {bento.allInOne.videoUrl && (
            <video
              className="bento-full-media"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-label="Video demostrativo de repotenciación All-in-One HP"
            >
              <source src={bento.allInOne.videoUrl} type="video/mp4" />
            </video>
          )}
          <div className="bento-full-scrim" />

          {/* Contenido inferior superpuesto directamente en espacio negativo */}
          <div className="bento-full-body">
            <span className="bento-tech-kicker">{bento.allInOne.kicker}</span>
            <h3 className="bento-tech-title font-serif italic font-normal">
              {bento.allInOne.title}
            </h3>
            <p className="bento-tech-desc">{bento.allInOne.desc}</p>
          </div>
        </article>

        {/* Tarjeta 1B: Cableado estructurado (Imagen 1:1, sin etiqueta superior) */}
        <article className="bento-tech-card bento-card-fullbleed bento-card-cable">
          {bento.cableado.imageUrl && (
            <img
              src={bento.cableado.imageUrl}
              alt="Rack mural y cableado estructurado Cat 5e en institución educativa"
              className="bento-full-media"
              loading="lazy"
            />
          )}
          <div className="bento-full-scrim" />

          {/* Contenido inferior superpuesto directamente en espacio negativo */}
          <div className="bento-full-body">
            <span className="bento-tech-kicker">{bento.cableado.kicker}</span>
            <h3 className="bento-tech-title font-serif italic font-normal">
              {bento.cableado.title}
            </h3>
            <p className="bento-tech-desc">{bento.cableado.desc}</p>
          </div>
        </article>
      </div>

      {/* ========================================================
          COLUMNA 2 (Centro): Soporte y mantenimiento de aula tecnológica
          ======================================================== */}
      <div className="bento-tech-col bento-col-center">
        <article className="bento-tech-card bento-card-fullbleed bento-card-tall">
          {aula?.imageUrl && (
            <img
              src={aula.imageUrl}
              alt="Aula de cómputo y arquitectura de equipos al servidor"
              className="bento-full-media"
              loading="lazy"
            />
          )}
          <div className="bento-tall-scrim" />

          {/* Header Superior (sin etiqueta, solo titular y descripción) */}
          <div className="bento-tall-header">
            <h3 className="bento-tall-title">
              <span>{aula?.titlePrefix}</span>
              <span className="bento-title-block">
                {aula?.titleLine2}
                <span className="bento-title-serif font-serif italic font-normal">
                  {aula?.titleSerif}
                </span>
              </span>
            </h3>
            {aula?.desc && (
              <p className="bento-tall-desc">{aula.desc}</p>
            )}
          </div>
        </article>
      </div>

      {/* ========================================================
          COLUMNA 3 (Derecha): Métrica 20% (4:3) + Cerebros Brillantes (1:1)
          ======================================================== */}
      <div className="bento-tech-col">
        {/* Tarjeta 3A: Métrica (+20%) con fondo degradado y texto limpio (sin línea ascendente, sin borde naranja) */}
        <article className="bento-tech-card bento-card-orange">
          {bento.metric.bgImage && (
            <img
              src={bento.metric.bgImage}
              alt=""
              aria-hidden="true"
              className="bento-orange-bg-img"
              loading="lazy"
            />
          )}
          <div className="bento-orange-inner">
            {/* Texto limpio sin contenedor */}
            <span className="bento-orange-kicker">{bento.metric.kicker}</span>

            {/* Métrica estilizada en DM Serif Display limpia (sin línea curva) */}
            <div className="bento-orange-stat font-serif font-normal">
              {bento.metric.stat}
            </div>

            <p className="bento-orange-desc">{bento.metric.desc}</p>

            {/* Nota inferior discreta */}
            <div className="bento-orange-bottom-note">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="bento-pulse-icon" aria-hidden="true">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
              <span>{bento.metric.note || 'Mantenimiento de equipos'}</span>
            </div>
          </div>
        </article>

        {/* Tarjeta 3B: Cerebros Brillantes (Imagen 1:1, sin etiqueta superior) */}
        <article className="bento-tech-card bento-card-fullbleed bento-card-audio">
          {bento.cerebrosBrillantes.imageUrl && (
            <img
              src={bento.cerebrosBrillantes.imageUrl}
              alt="Estudio de podcast y trofeo de Innovación Educativa 2023"
              className="bento-full-media"
              loading="lazy"
            />
          )}
          <div className="bento-full-scrim" />

          {/* Contenido inferior en espacio negativo */}
          <div className="bento-full-body">
            <h3 className="bento-tech-title font-serif font-normal">
              {bento.cerebrosBrillantes.title}
            </h3>
            <p className="bento-tech-subtitle">{bento.cerebrosBrillantes.subtitle}</p>
            <p className="bento-tech-desc">{bento.cerebrosBrillantes.desc}</p>
          </div>
        </article>
      </div>
    </div>
  );
}
