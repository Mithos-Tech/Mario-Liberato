import { useEffect, useRef, useState } from 'react';

const PATHS: Record<string, string> = {
  msg: 'M4 5h16v11H10l-4 4v-4H4V5z',
  spark: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3zM19 16v4M17 18h4',
  flow: 'M5 4h5v5H5zM14 15h5v5h-5zM7.5 9v3.5a2.5 2.5 0 0 0 2.5 2.5h4',
  plane: 'M4 12l16-7-6 15-3-6-7-2zM11 14l9-9',
  bot: 'M12 3v3M7 6h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3zM9 12h.01M15 12h.01M9.5 16h5',
  user: 'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM4.5 20c.8-3.6 3.8-5.5 7.5-5.5s6.7 1.9 7.5 5.5',
  chat: 'M20 12a8 8 0 0 1-11.5 7.2L4 20l.9-4.3A8 8 0 1 1 20 12zM9 12h.01M12 12h.01M15 12h.01',
  arrow: 'M7 17L17 7M8 7h9v9',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  send: 'M5 12h14M13 6l6 6-6 6',
  ticket: 'M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8zM14 6v12',
  mic: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
  building: 'M5 21V4h9v17M14 9h5v12M3 21h18M8 8h3M8 12h3M8 16h3',
  chip: 'M8 8h8v8H8zM10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3',
  wave: 'M4 10v4M8 6v12M12 3v18M16 7v10M20 10v4',
  layers: 'M12 3l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 16l9 5 9-5',
  plug: 'M9 3v5M15 3v5M6 8h12v4a6 6 0 0 1-12 0V8zM12 18v3',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z',
  info: 'M12 8h.01M12 12v4M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z',
};

function LabsIcon({ name, size = 18, stroke = 1.8 }: { name: string; size?: number; stroke?: number }) {
  const path = PATHS[name];
  if (!path) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

const PHASES = [
  { num: '01', title: 'Entrada', sub: 'Mensaje del cliente', icon: 'msg' },
  { num: '02', title: 'Comprensión IA', sub: 'Preguntas de calificación', icon: 'spark' },
  { num: '03', title: 'Automatización', sub: 'Filtro de presupuesto y tiempo', icon: 'flow' },
  { num: '04', title: 'Resultado', sub: 'Lead enviado al asesor', icon: 'plane' },
];

const PROJECTS = [
  {
    name: 'Fixtera',
    desc: 'Tickets de soporte con clasificación y resolución automática asistida por IA.',
    tags: ['Gemini', 'Supabase', 'Webhooks'],
  },
  {
    name: 'Spax & Kraft',
    desc: 'Chatbot y agente de voz para captación, calificación y filtro inteligente de leads.',
    tags: ['IA generativa', 'Vapi', 'n8n'],
  },
  {
    name: 'Borgo',
    desc: 'Califica requerimientos en tiempo real y enruta prospectos inmobiliarios al CRM.',
    tags: ['Typebot', 'Make', 'CRM'],
  },
];

export default function InspyrioLabs() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [typing, setTyping] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const reduced = typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!containerRef.current) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    io.observe(containerRef.current);
    return () => io.disconnect();
  }, []);

  // Ciclo automático del flujo interactivo
  useEffect(() => {
    if (reduced) {
      setStep(3);
      return;
    }
    if (!auto || paused || !visible) return;
    const timer = setTimeout(() => setStep((s) => (s + 1) % 4), step === 3 ? 4800 : 3000);
    return () => clearTimeout(timer);
  }, [step, auto, paused, visible, reduced]);

  // Indicador de "escribiendo..." antes de la respuesta del bot
  useEffect(() => {
    if (reduced || (step !== 1 && step !== 2)) {
      setTyping(false);
      return;
    }
    setTyping(true);
    const timer = setTimeout(() => setTyping(false), 850);
    return () => clearTimeout(timer);
  }, [step, reduced]);

  // Scroll suave al último mensaje sin alterar la altura fija
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [step, typing]);

  const selectStep = (index: number) => {
    setAuto(false);
    setStep(index);
  };

  const showBot1 = step > 1 || (step === 1 && !typing);
  const showBot2 = step > 2 || (step === 2 && !typing);

  return (
    <div ref={containerRef} className="labs-container">
      {/* Halo ambiental sutil en el fondo oscuro */}
      <div className="labs-ambient-glow" aria-hidden="true" />

      {/* ========================================================
          BARRA DE PROGRESO DEL FLUJO (Estilo Framer: Barra unificada con haz continuo)
          ======================================================== */}
      <div className="labs-workflow-tracker" aria-label="Progreso del pipeline de automatización">
        {/* Cabecera del tracker: Estado en vivo y fase activa */}
        <div className="labs-tracker-header">
          <div className="labs-tracker-status">
            <span className="labs-tracker-pulse" aria-hidden="true" />
            <span className="labs-tracker-title">Pipeline de Automatización</span>
            <span className="labs-tracker-divider" aria-hidden="true">·</span>
            <span className="labs-tracker-active-name">{PHASES[step].sub}</span>
          </div>
          <div className="labs-tracker-count">
            <span className="labs-tracker-step-num">Paso 0{step + 1}</span>
            <span className="labs-tracker-total">/ 04</span>
          </div>
        </div>

        {/* Carril continuo de la barra de progreso */}
        <div className="labs-tracker-rail">
          <div
            className="labs-tracker-fill"
            style={{ width: `${((step + 1) / PHASES.length) * 100}%` }}
          />
        </div>

        {/* Estaciones de progreso (Hitos integrados, CERO tarjetas separadas) */}
        <div className="labs-tracker-stations">
          {PHASES.map((p, idx) => {
            const isDone = idx < step;
            const isActive = idx === step;
            return (
              <button
                key={p.num}
                type="button"
                onClick={() => selectStep(idx)}
                className={`labs-station-btn ${isActive ? 'is-active' : isDone ? 'is-done' : ''}`}
                aria-current={isActive ? 'step' : undefined}
                title={`Paso ${p.num}: ${p.title} · ${p.sub}`}
              >
                <span className="labs-station-marker">
                  <span className="labs-station-num">{p.num}</span>
                </span>
                <div className="labs-station-info">
                  <span className="labs-station-title">{p.title}</span>
                  <span className="labs-station-sub">{p.sub}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          RETÍCULA PRINCIPAL: CHAT PRÍSTINO + LISTA EDITORIAL
          ======================================================== */}
      <div className="labs-main-grid">
        {/* COLUMNA 1: Consola / Chat del Asistente (Prístino, sin barra interna) */}
        <div
          className="labs-chat-console"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Cabecera superior de la consola */}
          <div className="labs-console-topbar">
            <div className="labs-console-brand">
              <div className="labs-bot-avatar" aria-hidden="true">
                <LabsIcon name="chat" size={16} stroke={1.9} />
                <span className="labs-avatar-badge" />
              </div>
              <div className="labs-brand-info">
                <span className="labs-brand-name">Inspyrio Labs</span>
                <span className="labs-brand-tag">Asistente inmobiliario</span>
              </div>
            </div>
            <div className="labs-live-indicator">
              <span className="labs-live-dot" aria-hidden="true" />
              <span>En línea</span>
            </div>
          </div>

          {/* Ventana de mensajes con máscara de desvanecimiento superior */}
          <div className="labs-viewport-mask">
            <div className="labs-messages-viewport" role="log" aria-live="polite">
              {/* Mensaje 1: Cliente */}
              <div className="labs-row labs-row-user">
                <div className="labs-bubble labs-bubble-user">
                  <span>Busco un departamento de 3 dormitorios en Miraflores.</span>
                  <time>10:24</time>
                </div>
              </div>

              {/* Mensaje 2: Agente */}
              {showBot1 && (
                <div className="labs-row labs-row-bot">
                  <div className="labs-bubble labs-bubble-bot">
                    <span>¿Cuál es tu presupuesto estimado y cuándo planeas mudarte?</span>
                    <time>10:24</time>
                  </div>
                </div>
              )}

              {/* Mensaje 3: Cliente */}
              {step >= 2 && (
                <div className="labs-row labs-row-user">
                  <div className="labs-bubble labs-bubble-user">
                    <span>Hasta 450 mil dólares, en aproximadamente dos meses.</span>
                    <time>10:25</time>
                  </div>
                </div>
              )}

              {/* Mensaje 4: Agente */}
              {showBot2 && (
                <div className="labs-row labs-row-bot">
                  <div className="labs-bubble labs-bubble-bot">
                    <span>Entendido. Registro tus requerimientos. Un asesor te contactará hoy con opciones seleccionadas.</span>
                    <time>10:25</time>
                  </div>
                </div>
              )}

              {/* Animación "Escribiendo..." */}
              {typing && (
                <div className="labs-row labs-row-bot">
                  <div className="labs-bubble labs-bubble-bot labs-bubble-typing" aria-label="Agente escribiendo">
                    <span className="labs-dot" />
                    <span className="labs-dot" />
                    <span className="labs-dot" />
                  </div>
                </div>
              )}

              {/* Resultado final: Lead Calificado */}
              {step >= 3 && (
                <div className="labs-lead-capsule">
                  <div className="labs-lead-icon-col">
                    <LabsIcon name="plane" size={18} stroke={2} />
                  </div>
                  <div className="labs-lead-text-col">
                    <strong>Lead enviado al asesor</strong>
                    <small>Miraflores · 3 dorms · Alto interés</small>
                  </div>
                  <div className="labs-lead-signal" aria-hidden="true" title="Calificación alta">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              )}

              {/* Ancla para el scroll automático */}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Barra inferior de envío */}
          <div className="labs-console-composer" aria-hidden="true">
            <span className="labs-composer-text">Escribe un mensaje…</span>
            <span className="labs-composer-btn">
              <LabsIcon name="send" size={14} stroke={2.2} />
            </span>
          </div>
        </div>

        {/* COLUMNA 2: Lista Editorial de Proyectos (SIN CAJAS NI CONTENEDORES BENTO) */}
        <div className="labs-editorial-col">
          <div className="labs-editorial-list">
            {PROJECTS.map((project) => (
              <article key={project.name} className="labs-editorial-row" tabIndex={0}>
                {/* Acento lateral sutil al hacer hover */}
                <div className="labs-row-accent" aria-hidden="true" />

                <div className="labs-row-main">
                  <div className="labs-row-header">
                    <h3 className="labs-row-name">{project.name}</h3>
                    <span className="labs-row-arrow" aria-hidden="true">
                      <LabsIcon name="arrow" size={17} stroke={2} />
                    </span>
                  </div>
                  <p className="labs-row-desc">{project.desc}</p>
                  <div className="labs-row-tags">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tag} className="labs-tag-inline">
                        {tag}
                        {tIdx < project.tags.length - 1 && <span className="labs-tag-bullet">·</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Nota al pie transparente */}
          <div className="labs-editorial-note">
            <span className="labs-note-icon" aria-hidden="true">
              <LabsIcon name="info" size={15} stroke={1.8} />
            </span>
            <p>
              Proyectos propios de práctica técnica, diseñados para validar flujos conversacionales antes de producción.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
