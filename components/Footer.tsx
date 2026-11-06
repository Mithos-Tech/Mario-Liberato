import React, { useState } from 'react';
import { site } from '../content';

/* ============================================================
   FOOTER – Réplica fiel del diseño "Designify"
   Adaptado al portafolio de Mario Liberato
   100% Full-Bleed (SIN CONTENEDOR cerrado ni bordes de tarjeta)
   ============================================================ */

/* Colores de la paleta incandescente negro + ámbar / naranja de marca */
const COLORS = {
  accent: '#ff5a14',
  glowTop: '#c8470a',
  glowMid: '#e2540e',
  glowBottom: '#f26a14',
};

/* Circuito inferior: 4 trazos simétricos respecto al botón central (eje x = 511.5).
   stops = opacidad a lo largo del trazo (de arriba hacia abajo). */
const CIRCUIT = [
  {
    d: 'M478 422 L452 466 V540 L436 566 V612',
    dur: 4.6,
    delay: 0.4,
    stops: [
      [0, 0.18],
      [0.25, 0.55],
      [0.5, 0.95],
      [0.75, 0.55],
      [1, 0.08],
    ],
  },
  {
    d: 'M497 422 V520 L484 543 V612',
    dur: 3.8,
    delay: 1.4,
    stops: [
      [0, 0.7],
      [0.3, 0.9],
      [0.6, 0.35],
      [1, 0.1],
    ],
  },
  {
    d: 'M526 422 V520 L539 543 V612',
    dur: 3.8,
    delay: 1.4,
    stops: [
      [0, 0.7],
      [0.3, 0.9],
      [0.6, 0.35],
      [1, 0.1],
    ],
  },
  {
    d: 'M545 422 L571 466 V540 L587 566 V612',
    dur: 4.6,
    delay: 0.4,
    stops: [
      [0, 0.18],
      [0.25, 0.55],
      [0.5, 0.95],
      [0.75, 0.55],
      [1, 0.08],
    ],
  },
];

/* Recorridos de energía hacia el botón (marco hexagonal → línea horizontal) */
const FLOW_LEFT = 'M82 0 V215 L185 403 H509';
const FLOW_RIGHT = 'M937 0 V217 L833 403 H513';

/* Pulso de energía: 4 capas vectoriales (halo, cola, cuerpo, núcleo) con extremo delantero alineado */
function Pulse({
  d,
  dur = 5,
  delay = 0,
  len = 9,
  tail = 24,
  color = '#ffffff',
}: {
  d: string;
  dur?: number;
  delay?: number;
  len?: number;
  tail?: number;
  color?: string;
}) {
  const layer = (L: number, w: number, o: number, blur: boolean, key: string) => (
    <path
      key={key}
      d={d}
      pathLength="100"
      fill="none"
      stroke={color}
      strokeWidth={w}
      opacity={o}
      strokeDasharray={`0 ${tail - L} ${L} ${200 - tail}`}
      filter={blur ? 'url(#dgBlur)' : undefined}
      className="dg-flow"
      style={{
        '--from': tail,
        '--to': tail - 200,
        animationDuration: `${dur * 2}s`,
        animationDelay: `${delay}s`,
      } as React.CSSProperties}
    />
  );
  return (
    <g>
      {layer(len + 4, 4.5, 0.55, true, 'g')}
      {layer(tail, 1.1, 0.26, false, 't')}
      {layer(len + 4, 1.2, 0.55, false, 'b')}
      {layer(len * 0.45, 1.6, 1, false, 'h')}
    </g>
  );
}

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const sec = document.getElementById('contacto');
    if (sec) {
      sec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="dg-wrap" aria-label="Pie de página del portafolio">
      {/* 
        EL FRAME OCUPA EL 100% DEL ANCHO (FULL-BLEED, SIN LÍNEA SEPARADORA, FUSIÓN PERFECTA)
      */}
      <div className="dg-frame">
        {/* Resplandor incandescente en el suelo de la cabina */}
        <div className="dg-glow" aria-hidden="true" />

        {/* Marco hexagonal, líneas vivas y circuito tecnológico (1022 x 612) */}
        <svg
          className="dg-svg"
          viewBox="0 0 1022 612"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="dgBlur" filterUnits="userSpaceOnUse" x="0" y="0" width="1022" height="612">
              <feGaussianBlur stdDeviation="2.2" />
            </filter>
            <filter id="dgBlurSm" filterUnits="userSpaceOnUse" x="0" y="0" width="1022" height="612">
              <feGaussianBlur stdDeviation="1.2" />
            </filter>

            <linearGradient id="dgH" gradientUnits="userSpaceOnUse" x1="184" y1="0" x2="833" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity=".14" />
              <stop offset=".2" stopColor="#fff" stopOpacity=".2" />
              <stop offset=".36" stopColor="#fff" stopOpacity=".75" />
              <stop offset=".5" stopColor="#fff" stopOpacity="1" />
              <stop offset=".64" stopColor="#fff" stopOpacity=".75" />
              <stop offset=".8" stopColor="#fff" stopOpacity=".2" />
              <stop offset="1" stopColor="#fff" stopOpacity=".14" />
            </linearGradient>

            <linearGradient id="dgStreakL" gradientUnits="userSpaceOnUse" x1="112" y1="270" x2="160" y2="357">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset=".55" stopColor="#fff" stopOpacity="1" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="dgStreakR" gradientUnits="userSpaceOnUse" x1="0" y1="93" x2="0" y2="193">
              <stop offset="0" stopColor="#fff" stopOpacity="0" />
              <stop offset=".5" stopColor="#fff" stopOpacity=".95" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>

            {CIRCUIT.map((c, i) => (
              <linearGradient
                key={i}
                id={'dgC' + i}
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="422"
                x2="0"
                y2="612"
              >
                {c.stops.map(([o, a], k) => (
                  <stop key={k} offset={o} stopColor="#ffe6d0" stopOpacity={a} />
                ))}
              </linearGradient>
            ))}
          </defs>

          {/* Marco hexagonal: trazo base tenue conectado al botón */}
          <g fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="1">
            <path d="M82 0 V215 L185 403 H509" />
            <path d="M937 0 V217 L833 403 H513" />
          </g>

          {/* Destellos fijos del modelo con efecto respiración */}
          <g fill="none" strokeLinecap="round">
            <path
              d="M112 270 L160 357"
              stroke="url(#dgStreakL)"
              strokeWidth="4.5"
              opacity=".55"
              filter="url(#dgBlur)"
              className="dg-breath"
            />
            <path
              d="M112 270 L160 357"
              stroke="url(#dgStreakL)"
              strokeWidth="1.6"
              className="dg-breath"
            />
            <path
              d="M937 93 V193"
              stroke="url(#dgStreakR)"
              strokeWidth="4.5"
              opacity=".5"
              filter="url(#dgBlur)"
              className="dg-breath"
            />
            <path
              d="M937 93 V193"
              stroke="url(#dgStreakR)"
              strokeWidth="1.5"
              className="dg-breath"
            />
          </g>

          {/* Circuito inferior (4 trazos simétricos puros que nacen del botón) */}
          <g fill="none" strokeWidth="1">
            {CIRCUIT.map((c, i) => (
              <path key={i} d={c.d} stroke={'url(#dgC' + i + ')'} />
            ))}
          </g>

          {/* Haces de energía fluyendo en vivo: marco → botón → circuito */}
          <g strokeLinecap="butt">
            <Pulse d={FLOW_LEFT} dur={5.5} delay={0} len={10} tail={26} />
            <Pulse d={FLOW_RIGHT} dur={5.5} delay={2.2} len={10} tail={26} />
            {CIRCUIT.map((c, i) => (
              <Pulse key={i} d={c.d} dur={c.dur} delay={c.delay} len={9} tail={26} color="#fff1e0" />
            ))}
          </g>
        </svg>

        {/* Insignia central en formato Píldora pura */}
        <div className="dg-badge">
          <span className="dg-tag">Liberato</span>
          <span className="dg-badge-text">Soporte TI · Desarrollo Web · Agentes IA</span>
        </div>

        {/* Titular monumental refinado: Sans ligera + Instrument Serif Italic */}
        <h2 className="dg-title">
          Ingeniería y <em>diseño</em>
          <br />
          potenciados por <em className="dg-acc">IA</em>
        </h2>

        {/* Subtítulo editorial conciso y directo */}
        <p className="dg-sub">
          Soporte técnico de TI, desarrollo web de alto rendimiento y automatización inteligente con agentes autónomos.
        </p>

        {/* Botón CTA central en formato Píldora pura sobre el nodo de energía */}
        <div className="dg-cta-row">
          <a
            className="dg-cta"
            href="#contacto"
            onClick={scrollToContact}
            title="Iniciar un proyecto"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0a0a0c"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <polygon points="13 2 4 14 11 14 10 22 20 10 13 10 13 2" />
            </svg>
            <span>Iniciar un proyecto</span>
          </a>
        </div>

        {/* Dock flotante en píldora de vidrio ahumado en la esquina */}
        <div className="dg-dock">
          <a
            className="dg-soc"
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir perfil de LinkedIn"
            aria-label="LinkedIn"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.9c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.58V21h-4V9.75Z" />
            </svg>
          </a>

          <button
            type="button"
            className="dg-soc"
            onClick={() => setShowPrivacy(true)}
            title="Ver aviso de privacidad"
            aria-label="Privacidad"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </button>

          <button
            type="button"
            className="dg-soc"
            onClick={scrollToTop}
            title="Volver al inicio de la página"
            aria-label="Subir"
          >
            <span style={{ fontSize: '14px', lineHeight: 1 }}>↑</span>
          </button>
        </div>

        {/* Modal de Aviso de Privacidad discreto */}
        {showPrivacy && (
          <div
            className="privacy-modal-overlay"
            role="dialog"
            aria-modal="true"
            onClick={() => setShowPrivacy(false)}
          >
            <div className="privacy-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="privacy-modal-header">
                <div className="privacy-modal-badge">
                  <span>Protección de Datos</span>
                </div>
                <button
                  type="button"
                  className="privacy-modal-close"
                  onClick={() => setShowPrivacy(false)}
                >
                  ✕
                </button>
              </div>
              <h3 className="privacy-modal-title">Aviso de Privacidad</h3>
              <div className="privacy-modal-body">
                <p className="privacy-modal-intro">
                  En cumplimiento con la Ley N° 29733 de Protección de Datos Personales de Perú, Mario Liberato utiliza tu información exclusivamente para responder a tu mensaje o propuesta. Tus datos no se ceden ni comercializan con terceros.
                </p>
              </div>
              <div className="privacy-modal-footer">
                <button
                  type="button"
                  className="privacy-modal-action-btn"
                  onClick={() => setShowPrivacy(false)}
                >
                  Entendido
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
