import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { assets, hero, site } from '../content';

const clamp = (x: number) => (!Number.isFinite(x) || x < 0 ? 0 : x > 1 ? 1 : x);
const delay = (s: number) => ({ '--s': Number.isFinite(s) ? s : 0 } as CSSProperties);

/**
 * Hero con "scroll scrub": al bajar, se recorren 72 cuadros (el personaje gira de 3/4 a frontal).
 * En vertical / móvil se usa el video en bucle. Con "reducir movimiento" se muestra una imagen fija.
 */
export default function Hero() {
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const heroEl = heroRef.current!, stage = stageRef.current!, cv = canvasRef.current!, vid = videoRef.current!;
    const ctx = cv.getContext('2d')!;
    const N = assets.frameCount;
    const imgs: HTMLImageElement[] = [];
    const ok: boolean[] = [];
    const mats: HTMLImageElement[] = [];
    const mok: boolean[] = [];
    let cur = 0, target = 0, last = -1, lastE = -1, raf = 0, lt = 0, fstart = false, vstart = false, fontReady = false, fs = 300;
    const W = cv.width, H = cv.height;
    const tmp = document.createElement('canvas'); tmp.width = W; tmp.height = H;
    const tctx = tmp.getContext('2d')!;
    const setSpacing = (c: CanvasRenderingContext2D, v: string) => { if ('letterSpacing' in c) (c as unknown as { letterSpacing: string }).letterSpacing = v; };
    const mqP = window.matchMedia('(orientation:portrait),(max-width:760px)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Texto gigante: se dibuja en un lienzo auxiliar, se borra donde está el personaje (recorte) y se pone sobre el fondo
    const measureWord = () => {
      tctx.font = '500 100px Montserrat, sans-serif'; setSpacing(tctx, '-0.025em');
      fs = (100 * W * 0.93) / tctx.measureText(assets.word).width;
    };
    const draw = (i: number, e: number) => {
      let k = i;
      while (k >= 0 && !ok[k]) k--;
      if (k < 0 || (k === last && e === lastE)) return;
      last = k; lastE = e;
      ctx.drawImage(imgs[k], 0, 0);
      let m = k;
      while (m >= 0 && !mok[m]) m--;
      if (!fontReady || m < 0) return;
      tctx.globalCompositeOperation = 'source-over';
      tctx.clearRect(0, 0, W, H);
      tctx.font = `500 ${fs}px Montserrat, sans-serif`; setSpacing(tctx, '-0.025em');
      tctx.textAlign = 'center'; tctx.textBaseline = 'alphabetic';
      tctx.globalAlpha = 0.15 + 0.85 * e;
      tctx.fillStyle = '#ffffff';
      tctx.fillText(assets.word, W / 2, H * 0.865 + (1 - e) * H * 0.12);
      tctx.globalAlpha = 1;
      tctx.globalCompositeOperation = 'destination-out';
      tctx.drawImage(mats[m], 0, 0, W, H);
      ctx.drawImage(tmp, 0, 0);
    };
    const set = (p: number) => {
      const safeP = Number.isFinite(p) ? p : 0;
      const f = clamp(safeP / 0.8);
      const e = clamp(1 - Math.pow(1 - clamp(safeP / 0.55), 3));
      heroEl.style.setProperty('--p', safeP.toFixed(4));
      heroEl.style.setProperty('--e', e.toFixed(4));
      draw(Math.round(f * (N - 1)), e);
    };
    const measure = () => {
      const r = heroEl.getBoundingClientRect();
      const top = parseFloat(getComputedStyle(stage).top) || 0;
      const total = heroEl.offsetHeight - stage.offsetHeight;
      target = total > 0 ? clamp((top - r.top) / total) : 1;
    };
    const tick = (ts: number) => {
      const dt = lt ? Math.min(ts - lt, 100) : 16;
      lt = ts;
      cur += (target - cur) * (1 - Math.exp(-dt / 110));
      if (Math.abs(target - cur) < 0.0008) cur = target;
      set(cur);
      if (cur === target) { raf = 0; lt = 0; } else raf = requestAnimationFrame(tick);
    };
    const kick = () => { measure(); if (!raf) raf = requestAnimationFrame(tick); };
    // El primer cuadro se carga antes que los demás, para que siempre arranque mirando a la izquierda
    const load = (i: number) => {
      const im = new Image();
      im.decoding = 'async';
      im.onload = () => { ok[i] = true; last = -1; set(cur); if (i === 0) for (let j = 1; j < N; j++) load(j); };
      im.src = assets.frame(i);
      imgs[i] = im;
      const mm = new Image();
      mm.decoding = 'async';
      mm.onload = () => { mok[i] = true; last = -1; set(cur); };
      mm.src = assets.matte(i);
      mats[i] = mm;
    };
    const startVideo = () => {
      if (vstart || reduce) return;
      vstart = true;
      vid.addEventListener('playing', () => vid.classList.add('on'));
      vid.src = assets.mobileVideo();
      vid.play()?.catch(() => {});
    };
    let wasPortrait = mqP.matches;
    const mode = () => {
      const isPortrait = mqP.matches;
      if (isPortrait !== wasPortrait) {
        wasPortrait = isPortrait;
        // Al alternar entre escritorio y móvil, evitar que el colapso de 290vh a 100svh
        // desplace al usuario a la mitad de la página
        if (!window.location.hash || window.location.hash === '#inicio' || window.scrollY < window.innerHeight * 1.5) {
          window.scrollTo(0, 0);
        }
      }
      if (isPortrait) {
        heroEl.style.setProperty('--p', '1'); heroEl.style.setProperty('--e', '1');
        startVideo();
      } else {
        if (!fstart) {
          fstart = true;
          if (reduce) {
            const rm = new Image();
            rm.onload = () => { imgs[N - 1] = rm; ok[N - 1] = true; last = -1; set(1); };
            rm.src = assets.frame(N - 1);
            const rmm = new Image();
            rmm.onload = () => { mats[N - 1] = rmm; mok[N - 1] = true; last = -1; set(1); };
            rmm.src = assets.matte(N - 1);
          } else load(0);
        }
        if (reduce) { cur = target = 1; set(1); } else kick();
      }
    };
    const onScroll = () => { if (!mqP.matches) kick(); };

    document.fonts.load('500 100px Montserrat').then(() => { measureWord(); fontReady = true; last = -1; set(cur); }).catch(() => {});
    try { history.scrollRestoration = 'manual'; } catch { /* noop */ }
    measure(); cur = target; mode();
    if (!reduce) window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', mode);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', mode);
    };
  }, []);

  return (
    <header className="hero" id="inicio" ref={heroRef}>
      <div className="stage" ref={stageRef}>
        <canvas className="bg" id="fig" ref={canvasRef} width={1920} height={1080} role="img"
          aria-label="Figura con armadura blanca y visor naranja que gira hacia el frente mientras haces scroll" />
        <img className="bg poster" alt="" src={reduceMotion ? assets.mobileFinal : assets.mobilePoster} />
        <video className="bg vid" ref={videoRef} muted playsInline preload="auto" aria-hidden="true" />
        <div className="scrim" />
        <div className="copy">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1 className="hero-h1">
            <span className="hero-montserrat">{hero.titleBase}</span>{' '}
            <span className="hero-serif font-serif">{hero.titleSerif}</span>
          </h1>
          <p className="intro-desk">{hero.intro}</p>
          <p className="intro-mob">{hero.intro}</p>
          <div className="btns">
            <a className="btn pill" href="#web">Ver proyectos<span className="ic">↗</span></a>
            <a className="btn ghost cta-sec" href={site.cvUrl} download>Descargar CV</a>
          </div>
        </div>
        <aside className="rail">
          {hero.rail.map((r) => (
            <a className="reveal" style={delay(r.s)} href={r.href} key={r.href}>{r.label}<small>{r.sub}</small></a>
          ))}
          <div className="minis">
            {hero.stats.map((s) => (
              <div className="stat reveal" style={delay(s.s)} key={s.value}><strong>{s.value}</strong><span>{s.label}</span></div>
            ))}
          </div>
        </aside>
        <div className="hint">Desplaza para ver más ↓</div>
      </div>
    </header>
  );
}
