import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { nav, site } from '../content';

const idx = (i: number) => ({ '--i': i } as CSSProperties);

/**
 * Navegación flotante estilo Framer:
 * - Escritorio: botones flotantes sin contenedor alineados a la retícula de 1140px.
 * - Móvil: Logo a la izquierda sin contenedor e icono minimalista sofisticado de 2 líneas a la derecha.
 * - Menú móvil: tarjeta flotante compacta (no fullscreen) con enlaces apilados al centro y botón Contactar.
 * - Desvanecimiento suave al salir del hero.
 */
export default function Nav() {
  const [hidden, setHidden] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('inicio');
    if (!hero) return;
    let hid = true, raf = 0;
    const update = () => {
      raf = 0;
      const bottom = hero.getBoundingClientRect().bottom, vh = window.innerHeight;
      if (hid && bottom > vh * 0.7) {
        hid = false;
        setHidden(false);
      } else if (!hid && bottom < vh * 0.62) {
        hid = true;
        setHidden(true);
        setMenuOpen(false); // Cierra el menú al abandonar el hero
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    const t = window.setTimeout(update, 220);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Cierra el menú al hacer clic en cualquier enlace
  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`fnav${hidden ? ' is-hidden' : ''}`} aria-label="Principal">
        <div className="fnav-inner">
          {/* Logo y marca a la izquierda (estilo Framer: icono a la izquierda de la marca) */}
          <a className="fl logo" style={idx(0)} href="#inicio" title="Volver al inicio" onClick={handleNavClick}>
            <img
              src={site.logo?.whiteSvg || '/logo-white.svg'}
              alt="Logo Mario Liberato"
              className="nav-logo-icon"
              width="30"
              height="26"
              loading="eager"
            />
            <span className="logo-brand">{site.brand}</span>
          </a>

          {/* Enlaces flotantes de escritorio */}
          <div className="flinks">
            {nav.map((l, i) => (
              <a key={l.href} className="fl flink" style={idx(i + 1)} href={l.href}>
                <span className="roll">
                  <span>{l.label}</span>
                  <span aria-hidden="true">{l.label}</span>
                </span>
              </a>
            ))}
          </div>

          {/* Botón contactar de escritorio */}
          <a className="fl btn white fcontact" style={idx(nav.length + 1)} href="#contacto">
            Contactar
          </a>

          {/* Icono de menú flotante en móvil (estilo Framer: 3 líneas escalonadas sin contenedor) */}
          <button
            type="button"
            className={`fl fburger${menuOpen ? ' is-active' : ''}`}
            style={idx(nav.length + 1)}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span className="bline t" />
            <span className="bline m" />
            <span className="bline b" />
          </button>
        </div>
      </nav>

      {/* Menú móvil desplegable flotante estilo Framer: fino, compacto y no invasivo */}
      {menuOpen && !hidden && (
        <div className="fmob-menu" role="dialog" aria-modal="true" aria-label="Menú de navegación móvil">
          <div className="fmob-inner">
            <div className="fmob-links">
              {nav.map((l) => (
                <a
                  key={l.href}
                  className="fmob-link"
                  href={l.href}
                  onClick={handleNavClick}
                >
                  {l.label}
                </a>
              ))}
            </div>
            <a
              className="btn white fmob-contact"
              href="#contacto"
              onClick={handleNavClick}
            >
              Contactar
            </a>
          </div>
        </div>
      )}
    </>
  );
}
