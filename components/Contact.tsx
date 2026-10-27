import { contact, site } from '../content';

export default function Contact() {
  return (
    <section className="s cta" id="contacto">
      <div className="wrap">
        <header className="section-header rv">
          <span className="kick">{contact.label}</span>
          <h2 className="section-title">
            <span className="subtitle-main">{contact.titlePrefix ?? contact.title}</span>
            {contact.titleSerif && <span className="subtitle-serif font-serif">{contact.titleSerif}</span>}
          </h2>
          <p className="section-phrase">{contact.text}</p>
        </header>
        <div className="btns rv" style={{ justifyContent: 'center', marginTop: 22 }}>
          <a className="btn hot" href={`mailto:${site.email}`}>Escribirme →</a>
          <a className="btn ghost" href={site.linkedin}>LinkedIn</a>
          <a className="btn ghost" href={site.cvUrl} download>Descargar CV</a>
        </div>
      </div>
    </section>
  );
}
