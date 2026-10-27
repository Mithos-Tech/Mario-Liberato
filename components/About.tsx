import { useEffect, useRef } from 'react';
import { about, site } from '../content';

/**
 * Sección Sobre mí:
 * - Estilo Framer sofisticado y depurado.
 * - Encabezado centralizado: Pill (sin punto decorativo), título principal regular (Montserrat + DM Serif)
 *   y frase de impacto equilibrada.
 * - Retícula inferior de 2 columnas:
 *   - Columna izquierda: Contenedor estricto 4:3 con video 16:9 centrado (object-fit: cover).
 *   - Columna derecha: Párrafos biográficos, especificaciones (2x2) y botón de descarga de CV
 *     con brillo sutil y sin elementos superfluos.
 */
export default function About() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Reproducción gestionada de forma silenciosa si el navegador restringe autoplay
      });
    }
  }, []);

  return (
    <section className="s about-s" id="sobre">
      <div className="wrap">
        {/* Encabezado centrado de la sección estilo Framer */}
        <header className="about-header section-header section-header-center rv">
          <span className="kick">{about.label}</span>
          <h2 className="about-title section-title">
            <span className="about-title-main subtitle-main">{about.title.prefix}</span>
            <span className="about-title-serif subtitle-serif font-serif">{about.title.name}</span>
          </h2>
          <p className="about-headline section-phrase">
            {about.headline}
          </p>
        </header>

        {/* Retícula de 2 columnas: Multimedia 4:3 + Contenido editorial */}
        <div className="about-grid">
          {/* Columna Izquierda: Video en contenedor 4:3 centrado */}
          <div className="about-media-col rv">
            <div className="about-frame-4-3" title={about.media.alt}>
              <video
                ref={videoRef}
                className="about-asset-video"
                src={about.media.videoUrl}
                poster={about.media.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label={about.media.alt}
              />
              <div className="about-frame-shine" />
            </div>
          </div>

          {/* Columna Derecha: Bio, Especificaciones y Botón CTA */}
          <div className="about-info-col">
            {/* Párrafos narrativos */}
            <div className="about-bio rv">
              {about.paragraphs.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}
            </div>

            {/* Retícula de especificaciones (2x2) */}
            <div className="about-specs-grid rv">
              {about.specs.map((item, idx) => (
                <div key={idx} className="about-spec-item">
                  <span className="about-spec-label">{item.label}</span>
                  <span className="about-spec-val">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Fila de acción: Botón de descarga de CV con blur y sombra sutil */}
            <div className="about-cta-row rv">
              <a
                className="btn hot about-cv-btn"
                href={site.cvUrl}
                download="Mario-Liberato-CV.pdf"
                title="Descargar Curriculum Vitae en PDF"
              >
                {about.cv.buttonLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
