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
  const [social, setSocial] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

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
          socialLink: social.trim() || undefined,
          message: message.trim(),
          _gotcha: honeypot,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setCompany('');
        setSocial('');
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
        {/* ========================================================
            CONTENEDOR BLANCO DE ALTO IMPACTO (Estilo Framer White Island)
            ======================================================== */}
        <div className="contact-white-card">
          <div className="contact-white-grid">
            {/* ========================================================
                COLUMNA IZQUIERDA: Titular Editorial de 3 Líneas + Metadatos Limpios
                ======================================================== */}
            <div className="contact-white-left">
              <div className="contact-white-header">
                <h2 className="contact-white-title">
                  GRANDES PROYECTOS
                  <br />
                  INICIAN CON UNA
                  <br />
                  DIRECCIÓN CLARA
                </h2>
              </div>

              {/* Metadatos organizados en tabla minimalista 100% tipográfica según la referencia */}
              <div className="contact-white-meta-table">
                <div className="contact-white-meta-row">
                  <span className="contact-white-meta-label">Ubicación</span>
                  <span className="contact-white-meta-value">Lima, Perú</span>
                </div>

                <div className="contact-white-meta-row">
                  <span className="contact-white-meta-label">LinkedIn</span>
                  <a
                    className="contact-white-meta-link"
                    href={site.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Mario Liberato
                  </a>
                </div>

                <div className="contact-white-meta-row">
                  <span className="contact-white-meta-label">Currículum</span>
                  <a
                    className="contact-white-meta-link"
                    href={site.cvUrl}
                    download
                  >
                    Descargar CV
                  </a>
                </div>

                <div className="contact-white-meta-row">
                  <span className="contact-white-meta-label">Disponibilidad</span>
                  <span className="contact-white-meta-value">Disponible para trabajo remoto</span>
                </div>
              </div>
            </div>

            {/* ========================================================
                COLUMNA DERECHA: Formulario con Inputs Gris Suave
                ======================================================== */}
            <div className="contact-white-right">
              <div className="contact-white-form-top">
                <span className="contact-white-kicker">Contacto</span>
              </div>

              {status === 'success' ? (
                /* Estado Exitoso */
                <div className="contact-white-success" role="alert" aria-live="polite">
                  <div className="contact-white-success-icon" aria-hidden="true">
                    <svg
                      width="30"
                      height="30"
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
                  <h3 className="contact-white-success-heading">Gracias, te responderé pronto</h3>
                  <p className="contact-white-success-desc">
                    Tu mensaje ha sido recibido con éxito. Revisaré tu consulta y te escribiré a la
                    brevedad al correo que indicaste.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="contact-white-reset-btn"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                /* Formulario */
                <form
                  className="contact-white-form"
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Formulario de contacto profesional"
                >
                  {/* Honeypot invisible Anti-Spam */}
                  <div className="contact-honeypot" aria-hidden="true">
                    <label htmlFor="cw-gotcha">No llenar este campo</label>
                    <input
                      type="text"
                      id="cw-gotcha"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {/* Fila 1: Nombre* y Correo* */}
                  <div className="contact-white-row-2">
                    <div className="contact-white-field">
                      <label className="contact-white-label" htmlFor="cw-name">
                        Tu nombre <span className="contact-white-star">*</span>
                      </label>
                      <input
                        id="cw-name"
                        name="name"
                        type="text"
                        required
                        disabled={status === 'submitting'}
                        className={`contact-white-input ${errors.name ? 'has-error' : ''}`}
                        placeholder="Nombre"
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                      />
                      {errors.name && <span className="contact-white-error">{errors.name}</span>}
                    </div>

                    <div className="contact-white-field">
                      <label className="contact-white-label" htmlFor="cw-email">
                        Tu correo <span className="contact-white-star">*</span>
                      </label>
                      <input
                        id="cw-email"
                        name="email"
                        type="email"
                        required
                        disabled={status === 'submitting'}
                        className={`contact-white-input ${errors.email ? 'has-error' : ''}`}
                        placeholder="tu@empresa.com"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                      />
                      {errors.email && <span className="contact-white-error">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Fila 2: Empresa (opcional) y LinkedIn / Web (opcional) */}
                  <div className="contact-white-row-2">
                    <div className="contact-white-field">
                      <label className="contact-white-label" htmlFor="cw-company">
                        <span>Empresa</span>
                        <span className="contact-white-opt">(opcional)</span>
                      </label>
                      <input
                        id="cw-company"
                        name="company"
                        type="text"
                        disabled={status === 'submitting'}
                        className="contact-white-input"
                        placeholder="Nombre de la empresa"
                        value={company}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
                      />
                    </div>

                    <div className="contact-white-field">
                      <label className="contact-white-label" htmlFor="cw-social">
                        <span>LinkedIn o web</span>
                        <span className="contact-white-opt">(opcional)</span>
                      </label>
                      <input
                        id="cw-social"
                        name="socialLink"
                        type="text"
                        disabled={status === 'submitting'}
                        className="contact-white-input"
                        placeholder="Tu enlace o usuario"
                        value={social}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSocial(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Fila 3: Mensaje* */}
                  <div className="contact-white-field">
                    <div className="contact-white-label-bar">
                      <label className="contact-white-label" htmlFor="cw-message">
                        Mensaje <span className="contact-white-star">*</span>
                      </label>
                      <span
                        className={`contact-white-char-count ${message.length >= 950 ? 'is-limit' : ''}`}
                        aria-live="polite"
                      >
                        {message.length} / 1000
                      </span>
                    </div>
                    <textarea
                      id="cw-message"
                      name="message"
                      required
                      rows={4}
                      maxLength={1000}
                      disabled={status === 'submitting'}
                      className={`contact-white-textarea ${errors.message ? 'has-error' : ''}`}
                      placeholder="Cuéntame sobre tu requerimiento o proyecto..."
                      value={message}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                    />
                    {errors.message && (
                      <span className="contact-white-error">{errors.message}</span>
                    )}
                  </div>

                  {/* Banner de error */}
                  {status === 'error' && (
                    <div className="contact-white-error-banner" role="alert">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>No se pudo enviar el mensaje. Intenta nuevamente o escríbeme por LinkedIn.</span>
                    </div>
                  )}

                  {/* Botón Insignia estilo referencia: Píldora negra con círculo blanco y flecha ↗ */}
                  <div className="contact-white-action-bar">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="contact-white-pill-btn"
                      title="Enviar mensaje de contacto"
                    >
                      <span className="contact-white-pill-label">
                        {status === 'submitting' ? 'Enviando...' : 'Iniciar un proyecto'}
                      </span>
                      <span className="contact-white-pill-icon" aria-hidden="true">
                        {status === 'submitting' ? (
                          <span className="contact-white-spinner" />
                        ) : (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        )}
                      </span>
                    </button>
                  </div>

                  {/* Nota de privacidad */}
                  <div className="contact-white-privacy-note">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>{contact.privacyNotice}</span>
                    <button
                      type="button"
                      onClick={() => setShowPrivacyModal(true)}
                      className="contact-white-privacy-trigger"
                      title="Ver aviso de privacidad y protección de datos"
                    >
                      Aviso de privacidad
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Minimalista de Aviso de Privacidad (Ley N° 29733 de Perú & GDPR) */}
      {showPrivacyModal && (
        <div
          className="privacy-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          onClick={() => setShowPrivacyModal(false)}
        >
          <div
            className="privacy-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="privacy-modal-header">
              <div className="privacy-modal-badge">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Protección de Datos</span>
              </div>
              <button
                type="button"
                className="privacy-modal-close"
                onClick={() => setShowPrivacyModal(false)}
                aria-label="Cerrar aviso de privacidad"
              >
                ✕
              </button>
            </div>

            <h3 id="privacy-modal-title" className="privacy-modal-title">
              Aviso de Privacidad y Tratamiento de Datos
            </h3>

            <div className="privacy-modal-body">
              <p className="privacy-modal-intro">
                En cumplimiento con la Ley de Protección de Datos Personales (Ley N° 29733 de Perú) y estándares internacionales de privacidad, este portafolio garantiza el uso estrictamente profesional de tu información:
              </p>

              <div className="privacy-modal-list">
                <div className="privacy-modal-item">
                  <span className="privacy-item-num">1</span>
                  <div className="privacy-item-text">
                    <strong>Responsable</strong>
                    <p>Mario Liberato, profesional en Soporte TI, Desarrollo Web y Automatización con IA (Lima, Perú).</p>
                  </div>
                </div>

                <div className="privacy-modal-item">
                  <span className="privacy-item-num">2</span>
                  <div className="privacy-item-text">
                    <strong>Finalidad exclusiva</strong>
                    <p>Los datos ingresados (nombre, correo, empresa y mensaje) se emplean únicamente para atender y responder a tu solicitud de cotización o proyecto.</p>
                  </div>
                </div>

                <div className="privacy-modal-item">
                  <span className="privacy-item-num">3</span>
                  <div className="privacy-item-text">
                    <strong>Confidencialidad y cero spam</strong>
                    <p>Tus datos no se comercializan, ceden ni comparten con terceros para publicidad ni campañas no autorizadas.</p>
                  </div>
                </div>

                <div className="privacy-modal-item">
                  <span className="privacy-item-num">4</span>
                  <div className="privacy-item-text">
                    <strong>Derechos ARCO</strong>
                    <p>Tienes derecho en todo momento a solicitar la consulta, rectificación o eliminación de tus datos personales enviando un mensaje directo.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="privacy-modal-footer">
              <button
                type="button"
                className="privacy-modal-action-btn"
                onClick={() => setShowPrivacyModal(false)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
