export default function WorkTogetherMarquee() {
  // Frase en Title Case ("Trabajemos juntos") con el símbolo ® de autoría
  const phrase = {
    first: 'Trabajemos',
    second: 'juntos',
  };

  // Repetición fluida para asegurar animación continua e infinita
  const repetitions = Array.from({ length: 8 });

  return (
    <aside className="work-together-marquee" aria-label="Llamado a la acción continuo">
      <div className="marquee-track" aria-hidden="true">
        {/* Primera tanda de frases */}
        <div className="marquee-group">
          {repetitions.map((_, i) => (
            <span key={`group1-${i}`} className="marquee-phrase">
              <span className="marquee-word-white">{phrase.first}</span>{' '}
              <span className="marquee-word-grey font-serif">{phrase.second}</span>
              <span className="marquee-symbol-r">®</span>
            </span>
          ))}
        </div>

        {/* Segunda tanda duplicada para loop infinito sin cortes */}
        <div className="marquee-group" aria-hidden="true">
          {repetitions.map((_, i) => (
            <span key={`group2-${i}`} className="marquee-phrase">
              <span className="marquee-word-white">{phrase.first}</span>{' '}
              <span className="marquee-word-grey font-serif">{phrase.second}</span>
              <span className="marquee-symbol-r">®</span>
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
