import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { contact, site } from '../content';

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const errs: FormErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      errs.name = 'Por favor ingresa tu nombre.';
    } else if (trimmedName.length < 2) {
      errs.name = 'El nombre debe tener al menos 2 caracteres.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!trimmedEmail) {
      errs.email = 'Por favor ingresa tu correo electrónico.';
    } else if (!emailRegex.test(trimmedEmail)) {
      errs.email = 'Ingresa un correo válido (ej: nombre@empresa.com).';
    }

    if (!trimmedMessage) {
      errs.message = 'Por favor escribe un mensaje.';
    } else if (trimmedMessage.length < 10) {
      errs.message = 'El mensaje debe tener al menos 10 caracteres.';
    } else if (trimmedMessage.length > 1000) {
      errs.message = 'El mensaje no puede superar los 1000 caracteres.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'submitting') return;

    if (!validate()) return;

    // Si el honeypot fue llenado por un bot, simulamos éxito sin enviar a FormSpark
    if (honeypot.trim().length > 0) {
      setStatus('success');
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          message: message.trim(),
          _gotcha: honeypot,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setCompany('');
        setMessage('');
        setErrors({});
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const resetForm = () => {
    setStatus('idle');
    setErrors({});
  };

  return (
    <section className="s contact-sec" id="contacto">
      <div className="wrap">
        <div className="contact-bento-grid">
          {/* ========================================================
              COLUMNA 1: Contexto editorial y Accesos Directos
              ======================================================== */}
          <div className="contact-info-col">
            <header className="contact-header">
              <span className="kick">{contact.label}</span>
              <h2 className="contact-title section-title">
                <span className="subtitle-main">{contact.titlePrefix ?? contact.title}</span>
                {contact.titleSerif && (
                  <span className="subtitle-serif font-serif">{contact.titleSerif}</span>
                )}
              </h2>
              <p className="contact-phrase section-phrase">{contact.text}</p>
            </header>

            {/* Tarjeta de canales secundarios con estilo Framer */}
            <div className="contact-channels-card">
              <span className="contact-channels-eyebrow">Canales directos</span>
              <div className="contact-actions-list">
                {/* Botón LinkedIn */}
                <a
                  className="contact-channel-btn btn ghost"
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Abrir perfil de LinkedIn en una nueva pestaña"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="contact-btn-icon"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span className="contact-channel-label">Escribirme por LinkedIn</span>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="contact-btn-arrow"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>

                {/* Botón Descargar CV */}
                <a
                  className="contact-channel-btn btn ghost"
                  href={site.cvUrl}
                  download
                  title="Descargar Currículum Vitae en PDF"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="contact-btn-icon"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span className="contact-channel-label">Descargar CV</span>
                  <span className="contact-badge-pdf">PDF</span>
                </a>
              </div>

              {/* Badge de disponibilidad laboral en vivo */}
              <div className="contact-status-capsule" role="status">
                <span className="contact-live-dot" aria-hidden="true" />
                <span className="contact-status-text">
                  Disponible para proyectos y trabajo remoto · Lima, Perú
                </span>
              </div>
            </div>
          </div>

          {/* ========================================================
              COLUMNA 2: Formulario Seguro FormSpark Glassmorphic
              ======================================================== */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              {status === 'success' ? (
                /* Estado de Envío Exitoso */
                <div className="contact-success-box" role="alert" aria-live="polite">
                  <div className="contact-success-icon-wrap" aria-hidden="true">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="contact-success-title">Gracias, te responderé pronto</h3>
                  <p className="contact-success-msg">
                    Tu mensaje ha sido recibido correctamente. Te escribiré al correo que indicaste
                    a la brevedad posible.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn ghost contact-reset-btn"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                /* Formulario de Envío */
                <form
                  className="contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Formulario de contacto profesional"
                >
                  {/* Campo trampa Honeypot para protección Anti-Spam (oculto visualmente con CSS) */}
                  <div className="contact-honeypot" aria-hidden="true">
                    <label htmlFor="gotcha-field">No llenar este campo</label>
                    <input
                      type="text"
                      id="gotcha-field"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Fila: Nombre y Correo */}
                  <div className="contact-form-row-2">
                    {/* Campo Nombre */}
                    <div className="contact-field-group">
                      <label className="contact-field-label" htmlFor="contact-name">
                        Nombre <span className="contact-req-star">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        disabled={status === 'submitting'}
                        className={`contact-input ${errors.name ? 'has-error' : ''}`}
                        placeholder="Tu nombre o empresa"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                      />
                      {errors.name && <span className="contact-field-error">{errors.name}</span>}
                    </div>

                    {/* Campo Correo */}
                    <div className="contact-field-group">
                      <label className="contact-field-label" htmlFor="contact-email">
                        Correo electrónico <span className="contact-req-star">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        disabled={status === 'submitting'}
                        className={`contact-input ${errors.email ? 'has-error' : ''}`}
                        placeholder="tu@empresa.com"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                      />
                      {errors.email && <span className="contact-field-error">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Campo Empresa (Opcional) */}
                  <div className="contact-field-group">
                    <label className="contact-field-label" htmlFor="contact-company">
                      Empresa u organización <span className="contact-opt-tag">(opcional)</span>
                    </label>
                    <input
                      id="contact-company"
                      name="company"
                      type="text"
                      disabled={status === 'submitting'}
                      className="contact-input"
                      placeholder="Nombre de la empresa o proyecto"
                      value={company}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
                    />
                  </div>

                  {/* Campo Mensaje */}
                  <div className="contact-field-group">
                    <div className="contact-label-flex">
                      <label className="contact-field-label" htmlFor="contact-message">
                        Mensaje <span className="contact-req-star">*</span>
                      </label>
                      <span
                        className={`contact-char-count ${message.length >= 950 ? 'is-near-limit' : ''}`}
                        aria-live="polite"
                      >
                        {message.length} / 1000
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      maxLength={1000}
                      disabled={status === 'submitting'}
                      className={`contact-textarea ${errors.message ? 'has-error' : ''}`}
                      placeholder="Cuéntame sobre tu requerimiento, oportunidad o proyecto..."
                      value={message}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                    />
                    {errors.message && (
                      <span className="contact-field-error">{errors.message}</span>
                    )}
                  </div>

                  {/* Mensaje de Error en Envío */}
                  {status === 'error' && (
                    <div className="contact-error-banner" role="alert">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="contact-error-icon"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>
                        No se pudo enviar el mensaje. Intenta nuevamente o contáctame por LinkedIn.
                      </span>
                    </div>
                  )}

                  {/* Botón de Envío */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="contact-submit-btn btn hot"
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="contact-submit-spinner" aria-hidden="true" />
                        <span>Enviando mensaje...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar mensaje</span>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="contact-submit-arrow"
                        >
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </button>

                  {/* Línea de privacidad requerida */}
                  <div className="contact-privacy-footer">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="contact-privacy-icon"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>{contact.privacyNotice}</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
