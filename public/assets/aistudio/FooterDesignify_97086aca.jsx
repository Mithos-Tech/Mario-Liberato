import React from "react";

/* ============================================================
   FOOTER – réplica del diseño "Designify"
   Todo el contenido editable está en DATA (o se pasa por props).
   Sin dependencias externas: solo React.
   ============================================================ */

const DATA = {
  brand: "Designify",
  navLinks: ["Services", "Pricings", "Reviews", "About Us"],
  templatesLabel: "My templates",
  templatesHref: "#",
  worksLabel: "View Works",
  worksHref: "#",
  badgeTag: "New",
  badgeText: "Available for New Work",
  titleLine1Plain: "Premium",
  titleLine1Italic: "design",
  titleLine2Plain: "to grow your",
  titleLine2Italic: "business",
  subtitleLine1:
    "Designer & Framer Developer, Helping Founders to Create Logo + Brand Guideline",
  subtitleLine2: "Design & High Converting Website with Web App Design",
  ctaLabel: "Book a call",
  ctaHref: "#",
  socials: { linkedin: "#", x: "#", other: "#" },
};

/* Colores editables (paleta negro + naranja del modelo) */
const COLORS = {
  accent: "#ff5a14",
  glowTop: "#c8470a",
  glowMid: "#e2540e",
  glowBottom: "#f26a14",
};

/* Circuito inferior: 4 trazos simétricos respecto al botón (eje x = 511.5).
   stops = opacidad a lo largo del trazo (de arriba hacia abajo). */
const CIRCUIT = [
  { d: "M478 422 L452 466 V540 L436 566 V612", dur: 4.6, delay: 0.4,
    stops: [[0, 0.18], [0.25, 0.55], [0.5, 0.95], [0.75, 0.55], [1, 0.08]] },
  { d: "M497 422 V520 L484 543 V612", dur: 3.8, delay: 1.4,
    stops: [[0, 0.7], [0.3, 0.9], [0.6, 0.35], [1, 0.1]] },
  { d: "M526 422 V520 L539 543 V612", dur: 3.8, delay: 1.4,
    stops: [[0, 0.7], [0.3, 0.9], [0.6, 0.35], [1, 0.1]] },
  { d: "M545 422 L571 466 V540 L587 566 V612", dur: 4.6, delay: 0.4,
    stops: [[0, 0.18], [0.25, 0.55], [0.5, 0.95], [0.75, 0.55], [1, 0.08]] },
];

/* Recorridos de energía hacia el botón (marco → línea horizontal) */
const FLOW_LEFT = "M82 0 V215 L185 403 H509";
const FLOW_RIGHT = "M937 0 V217 L833 403 H513";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&family=Poppins:wght@400;500;600&display=swap');

.dg-wrap{background:#000;padding:8px;font-family:'Poppins',system-ui,sans-serif;color:#fff}
.dg-frame{
  position:relative;overflow:hidden;container-type:inline-size;
  width:100%;max-width:1400px;margin:0 auto;
  aspect-ratio:1022/612;min-height:520px;
  border-radius:22px;background:#000;
  border:1px solid rgba(255,120,40,.35);
}
.dg-glow{
  position:absolute;inset:0;
  background:linear-gradient(180deg,#000 0%,#000 44%,${COLORS.glowTop} 62%,${COLORS.glowMid} 80%,${COLORS.glowBottom} 100%);
}
.dg-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.dg-svg *{vector-effect:non-scaling-stroke}

/* ---------- Navbar ---------- */
.dg-nav{
  position:absolute;top:2.2%;left:50%;transform:translateX(-50%);z-index:5;
  display:flex;align-items:center;gap:2.2cqw;
  width:59%;min-width:560px;padding:7px 8px 7px 20px;
  background:#fff;border-radius:16px;color:#1b1b1b;
  box-shadow:0 0 0 3px rgba(255,255,255,.28),0 0 26px rgba(255,255,255,.35);
}
.dg-logo{display:flex;align-items:center;gap:8px;font-weight:500;font-size:14.5px;color:#111;text-decoration:none;white-space:nowrap}
.dg-links{display:flex;gap:2.4cqw;margin-left:1.2cqw}
.dg-links a{font-size:13px;color:#6b6b6b;text-decoration:none;transition:color .2s;white-space:nowrap}
.dg-links a:hover{color:#111}
.dg-right{margin-left:auto;display:flex;align-items:center;gap:1.8cqw}
.dg-tpl{display:flex;align-items:center;gap:7px;font-size:13px;font-weight:500;color:#1b1b1b;text-decoration:none;white-space:nowrap}
.dg-works{
  display:flex;align-items:center;gap:8px;padding:11px 18px;border-radius:12px;white-space:nowrap;
  background:#1b1b1b;color:#fff;font-size:13px;font-weight:500;text-decoration:none;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 2px 6px rgba(0,0,0,.35);
}

/* ---------- Contenido central (desktop) ---------- */
.dg-badge{
  position:absolute;top:26.6%;left:50%;transform:translateX(-50%);z-index:4;
  display:flex;align-items:center;gap:8px;padding:4px 14px 4px 4px;border-radius:10px;
  background:linear-gradient(180deg,#2a2a2a,#151515);
  border:1px solid rgba(255,255,255,.14);
  font-size:12px;font-weight:500;white-space:nowrap;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.12);
}
.dg-tag{padding:4px 11px;border-radius:7px;background:linear-gradient(180deg,#ff7a38,${COLORS.accent});font-size:11.5px}
.dg-title{
  position:absolute;top:33.2%;left:0;right:0;z-index:4;margin:0;text-align:center;
  font-weight:600;font-size:5.6cqw;line-height:1.04;letter-spacing:-.045em;
}
.dg-title em{
  font-family:'Instrument Serif',serif;font-style:italic;font-weight:400;
  font-size:1.12em;line-height:1;letter-spacing:-.01em;padding:0 .06em;
}
.dg-title .dg-acc{color:${COLORS.accent}}
.dg-sub{
  position:absolute;top:54.4%;left:50%;transform:translateX(-50%);z-index:4;
  width:68%;margin:0;text-align:center;font-size:1.5cqw;line-height:1.5;font-weight:400;color:#f1f1f1;
}
.dg-sub span{display:block}

.dg-cta-row{
  position:absolute;top:65.8%;left:0;right:0;transform:translateY(-50%);z-index:4;
  display:flex;align-items:center;justify-content:center;
}
.dg-cta{
  display:flex;align-items:center;gap:8px;padding:11px 20px;border-radius:12px;
  background:linear-gradient(180deg,#ffffff,#f0f0f0);color:#1b1b1b;
  font-size:14.5px;font-weight:500;text-decoration:none;white-space:nowrap;
  border:3px solid rgba(214,160,128,.8);
  box-shadow:0 0 22px rgba(255,255,255,.45),inset 0 -1px 0 rgba(0,0,0,.06);
  transition:transform .2s;
}
.dg-cta:hover{transform:translateY(-1px)}
.dg-mlinks{display:none}

/* ---------- Dock de redes ---------- */
.dg-dock{
  position:absolute;right:0;bottom:0;z-index:6;
  display:flex;gap:8px;padding:12px 12px 10px 14px;
  background:#101010;border-top-left-radius:28px;
}
.dg-soc{
  width:34px;height:34px;border-radius:50%;background:#2c2c2c;color:#fff;
  display:grid;place-items:center;transition:background .2s;
}
.dg-soc:hover{background:#3d3d3d}

/* ---------- Movimiento ---------- */
.dg-breath{animation:dgBreath 5s ease-in-out infinite}
@keyframes dgBreath{0%,100%{opacity:.8}50%{opacity:1}}
/* Pulso de energía: un tramo luminoso con cola que viaja por el trazo */
.dg-flow{
  animation-name:dgFlow;animation-timing-function:linear;animation-iteration-count:infinite;
}
@keyframes dgFlow{
  from{stroke-dashoffset:var(--from)}
  to{stroke-dashoffset:var(--to)}
}
@media (prefers-reduced-motion:reduce){
  .dg-breath{animation:none}
  .dg-flow{animation:none;opacity:0}
}

/* ---------- Tablet ---------- */
@media (max-width:1024px) and (min-width:761px){
  .dg-frame{aspect-ratio:1022/780}
  .dg-nav{width:86%;min-width:0;gap:1.6cqw;padding:6px 7px 6px 16px}
  .dg-tpl{display:none}
  .dg-links{gap:2cqw}
  .dg-links a{font-size:12px}
  .dg-badge{top:22.5%}
  .dg-title{top:29%;font-size:7cqw}
  .dg-sub{top:52%;width:80%;font-size:1.85cqw;line-height:1.55}
}

/* ---------- Móvil ---------- */
@media (max-width:760px){
  .dg-frame{
    aspect-ratio:auto;min-height:0;display:flex;flex-direction:column;align-items:center;
    padding:14px 16px 96px;gap:20px;
  }
  .dg-svg{display:none}
  .dg-nav,.dg-badge,.dg-title,.dg-sub,.dg-cta-row{
    position:relative;top:auto;left:auto;right:auto;transform:none;
  }
  .dg-nav{width:100%;min-width:0;gap:10px;padding:7px 7px 7px 14px}
  .dg-links,.dg-tpl{display:none}
  .dg-badge{margin-top:34px}
  .dg-title{width:100%;font-size:clamp(2.2rem,10.6vw,3.2rem);line-height:1.05}
  .dg-sub{width:100%;font-size:.92rem;line-height:1.6;padding:0 4px}
  .dg-cta-row{width:100%;gap:0}
  .dg-cta-row::before,.dg-cta-row::after{
    content:"";flex:1;height:1px;
    background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.8));
  }
  .dg-cta-row::after{background:linear-gradient(270deg,rgba(255,255,255,0),rgba(255,255,255,.8))}
  .dg-mlinks{
    display:flex;flex-wrap:wrap;justify-content:center;gap:8px 22px;margin-top:6px;
  }
  .dg-mlinks a{font-size:13px;color:rgba(255,255,255,.85);text-decoration:none}
  .dg-dock{padding:10px 10px 8px 12px}
}
`;

/* Pulso de energía: 4 capas (halo, cola, cuerpo, núcleo) con el extremo delantero alineado */
function Pulse({ d, dur = 5, delay = 0, len = 9, tail = 24, color = "#ffffff" }) {
  const layer = (L, w, o, blur, key) => (
    <path
      key={key}
      d={d}
      pathLength="100"
      fill="none"
      stroke={color}
      strokeWidth={w}
      opacity={o}
      strokeDasharray={`0 ${tail - L} ${L} ${200 - tail}`}
      filter={blur ? "url(#dgBlur)" : undefined}
      className="dg-flow"
      style={{
        "--from": tail,
        "--to": tail - 200,
        animationDuration: `${dur * 2}s`,
        animationDelay: `${delay}s`,
      }}
    />
  );
  return (
    <g>
      {layer(len + 4, 4.5, 0.55, true, "g")}
      {layer(tail, 1.1, 0.26, false, "t")}
      {layer(len + 4, 1.2, 0.55, false, "b")}
      {layer(len * 0.45, 1.6, 1, false, "h")}
    </g>
  );
}

const IconCloud = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M7 17a4 4 0 0 1-.6-7.96A6 6 0 0 1 18 10a3.5 3.5 0 0 1-.5 7H7Z" fill="#2a2a2a" />
  </svg>
);
const IconBook = () => (
  <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
    <rect x="1" y="1" width="9" height="16" rx="2" fill={COLORS.accent} />
    <rect x="11.5" y="2.5" width="3.5" height="13" rx="1.5" fill="#ff9a5c" />
  </svg>
);
const IconFigma = () => (
  <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
    <rect x="0" y="0" width="7" height="6" rx="3" fill="#f24e1e" />
    <rect x="7" y="0" width="7" height="6" rx="3" fill="#ff7262" />
    <rect x="0" y="6" width="7" height="6" rx="3" fill="#a259ff" />
    <circle cx="10.5" cy="9" r="3" fill="#1abcfe" />
    <rect x="0" y="12" width="7" height="6" rx="3" fill="#0acf83" />
  </svg>
);
const IconBolt = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#1b1b1b" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </svg>
);
const IconLinkedin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-4.9c0-1.17-.02-2.67-1.63-2.67-1.63 0-1.88 1.27-1.88 2.58V21h-4V9.75Z" />
  </svg>
);
const IconX = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
  </svg>
);
const IconCube = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" />
    <path d="M4 7.5 12 12l8-4.5M12 12v9" />
  </svg>
);

export default function FooterDesignify(props) {
  const d = { ...DATA, ...props, socials: { ...DATA.socials, ...(props.socials || {}) } };

  return (
    <footer className="dg-wrap">
      <style>{CSS}</style>

      <div className="dg-frame">
        <div className="dg-glow" />

        {/* Marco, líneas y circuito (coordenadas del modelo: 1022 x 612) */}
        <svg className="dg-svg" viewBox="0 0 1022 612" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            {/* Filtros en unidades de usuario: funcionan también con líneas rectas */}
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
              <linearGradient key={i} id={"dgC" + i} gradientUnits="userSpaceOnUse" x1="0" y1="422" x2="0" y2="612">
                {c.stops.map(([o, a], k) => (
                  <stop key={k} offset={o} stopColor="#ffe6d0" stopOpacity={a} />
                ))}
              </linearGradient>
            ))}
          </defs>

          {/* Marco hexagonal: trazo base tenue */}
          <g fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="1">
            <path d="M82 0 V215 L185 403" />
            <path d="M937 0 V217 L833 403" />
          </g>

          {/* Destellos fijos del modelo */}
          <g fill="none" strokeLinecap="round">
            <path d="M112 270 L160 357" stroke="url(#dgStreakL)" strokeWidth="4.5" opacity=".55" filter="url(#dgBlur)" className="dg-breath" />
            <path d="M112 270 L160 357" stroke="url(#dgStreakL)" strokeWidth="1.6" className="dg-breath" />
            <path d="M937 93 V193" stroke="url(#dgStreakR)" strokeWidth="4.5" opacity=".5" filter="url(#dgBlur)" className="dg-breath" />
            <path d="M937 93 V193" stroke="url(#dgStreakR)" strokeWidth="1.5" className="dg-breath" />
          </g>

          {/* Caja inferior */}
          <path d="M184 403 H833" fill="none" stroke="url(#dgH)" strokeWidth="5" opacity=".35" filter="url(#dgBlurSm)" />
          <path d="M184 403 H833" fill="none" stroke="url(#dgH)" strokeWidth="1.2" />
          <g fill="none" stroke="rgba(255,205,170,.28)" strokeWidth="1">
            <path d="M184 403 V612" />
            <path d="M833 403 V612" />
          </g>

          {/* Marcas de regla + anillo */}
          <g stroke="rgba(255,225,200,.45)" strokeWidth="1.2">
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={"l" + i} x1={194 + i * 5.2} x2={194 + i * 5.2} y1="419" y2="426.5" />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={"r" + i} x1={777 + i * 5.2} x2={777 + i * 5.2} y1="419" y2="426.5" />
            ))}
          </g>
          <g fill="none" stroke="rgba(255,225,200,.5)" strokeWidth="1.2">
            <circle cx="249" cy="423" r="3.6" />
            <circle cx="768.5" cy="423" r="3.6" />
          </g>

          {/* Circuito inferior (4 trazos) */}
          <g fill="none" strokeWidth="1">
            {CIRCUIT.map((c, i) => (
              <path key={i} d={c.d} stroke={"url(#dgC" + i + ")"} />
            ))}
          </g>

          {/* Energía fluyendo: marco → botón → circuito */}
          <g strokeLinecap="butt">
            <Pulse d={FLOW_LEFT} dur={5.5} delay={0} len={10} tail={26} />
            <Pulse d={FLOW_RIGHT} dur={5.5} delay={2.2} len={10} tail={26} />
            {CIRCUIT.map((c, i) => (
              <Pulse key={i} d={c.d} dur={c.dur} delay={c.delay} len={9} tail={26} color="#fff1e0" />
            ))}
          </g>
        </svg>

        {/* Navbar */}
        <nav className="dg-nav" aria-label="Footer">
          <a className="dg-logo" href="#">
            <IconCloud />
            {d.brand}
          </a>
          <div className="dg-links">
            {d.navLinks.map((l) => (
              <a key={l} href="#">{l}</a>
            ))}
          </div>
          <div className="dg-right">
            <a className="dg-tpl" href={d.templatesHref}>
              <IconBook />
              {d.templatesLabel}
            </a>
            <a className="dg-works" href={d.worksHref}>
              <IconFigma />
              {d.worksLabel}
            </a>
          </div>
        </nav>

        {/* Insignia */}
        <div className="dg-badge">
          <span className="dg-tag">{d.badgeTag}</span>
          <span>{d.badgeText}</span>
        </div>

        {/* Titular */}
        <h2 className="dg-title">
          {d.titleLine1Plain} <em>{d.titleLine1Italic}</em>
          <br />
          {d.titleLine2Plain} <em className="dg-acc">{d.titleLine2Italic}</em>
        </h2>

        {/* Subtítulo */}
        <p className="dg-sub">
          <span>{d.subtitleLine1}</span>
          <span>{d.subtitleLine2}</span>
        </p>

        {/* CTA */}
        <div className="dg-cta-row">
          <a className="dg-cta" href={d.ctaHref}>
            <IconBolt />
            {d.ctaLabel}
          </a>
        </div>

        {/* Solo móvil: los mismos enlaces del menú, reubicados */}
        <div className="dg-mlinks">
          {d.navLinks.map((l) => (
            <a key={l} href="#">{l}</a>
          ))}
          <a href={d.templatesHref}>{d.templatesLabel}</a>
        </div>

        {/* Dock de redes */}
        <div className="dg-dock">
          <a className="dg-soc" href={d.socials.linkedin} aria-label="LinkedIn"><IconLinkedin /></a>
          <a className="dg-soc" href={d.socials.x} aria-label="X"><IconX /></a>
          <a className="dg-soc" href={d.socials.other} aria-label="Más"><IconCube /></a>
        </div>
      </div>
    </footer>
  );
}
