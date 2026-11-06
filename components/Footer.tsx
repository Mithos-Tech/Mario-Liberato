import { useState, useEffect } from 'react';
import { site } from '../content';

export default function Footer() {
  const [limaTime, setLimaTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeString = new Intl.DateTimeFormat('es-PE', {
          timeZone: 'America/Lima',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(now);
        setLimaTime(timeString);
      } catch {
        setLimaTime('12:00');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Sobre mí', href: '#sobre' },
    { label: 'Soporte TI', href: '#soporte' },
    { label: 'Estudio Web', href: '#web' },
    { label: 'Inspyrio Labs', href: '#ia' },
    { label: 'Trayectoria', href: '#trayectoria' },
    { label: 'Certificaciones', href: '#certificaciones' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <footer className="framer-footer" aria-label="Pie de página del sitio">
      <div className="wrap">
        <div className="framer-footer-card">
          {/* Fila Principal: Identidad de Marca y Navegación de Arquitectura */}
          <div className="framer-footer-top">
            <div className="framer-footer-brand-col">
              <a
                href="#inicio"
                className="framer-footer-brand"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTop();
                }}
                title="Ir al inicio"
              >
                <img
                  src={site.logo?.whiteSvg || '/logo-white.svg'}
                  alt="Logo Liberato"
                  className="framer-footer-logo-img"
                  width="22"
                  height="21"
                  loading="lazy"
                />
                <span className="framer-footer-brand-title">MARIO LIBERATO</span>
              </a>
              <p className="framer-footer-tagline">
                Soporte TI · Desarrollo Web · Automatización con IA
              </p>
            </div>

            {/* Matriz de Navegación Espejo */}
            <nav className="framer-footer-nav" aria-label="Navegación secundaria">
              {navLinks.map((item) => (
                <a key={item.href} href={item.href} className="framer-footer-nav-link">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="framer-footer-divider" />

          {/* Fila Inferior: Indicador de Zona Horaria, Copyright y Botón Arriba */}
          <div className="framer-footer-bottom">
            <div className="framer-footer-time-badge" title="Zona horaria local del desarrollador">
              <span className="framer-footer-time-pulse" aria-hidden="true" />
              <span className="framer-footer-time-label">Lima, PE</span>
              <span className="framer-footer-time-val">{limaTime || '12:00'} (GMT-5)</span>
            </div>

            <p className="framer-footer-copy">
              © {new Date().getFullYear()} Mario Liberato. Todos los derechos reservados.
            </p>

            <button
              type="button"
              onClick={scrollToTop}
              className="framer-footer-top-btn"
              title="Volver al inicio de la página"
            >
              <span>Arriba</span>
              <span className="framer-footer-top-arrow" aria-hidden="true">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
