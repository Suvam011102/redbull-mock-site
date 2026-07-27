"use client";

import { useEffect, useRef, useState } from "react";

const products = [
  { name: "The Pink Edition", can: "/pink.webp", tone: "#eb3a7b", tag: "Wiiings for every taste" },
  { name: "The Yellow Edition", can: "/yellow.webp", tone: "#f5c400", tag: "Wiiings for every taste" },
  { name: "The Red Edition", can: "/red.webp", tone: "#db1834", tag: "Wiiings for every taste" },
];

const moments = [
  { image: "/fitness.avif", label: "Fitness", title: "Push your limits" },
  { image: "/study.avif", label: "Study", title: "Stay focused" },
];

export default function Home() {
  const [edition, setEdition] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const [heroStep, setHeroStep] = useState(0);
  const [heroProgress, setHeroProgress] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const product = products[edition];

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduceMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let frame = 0;
    const updateHeroStep = () => {
      frame = 0;
      const hero = heroRef.current;
      if (!hero) return;

      const rect = hero.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      setHeroProgress(progress);
      setHeroStep(progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateHeroStep);
    };

    updateHeroStep();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function handleHeroMove(event: React.MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setHeroTilt({
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    });
  }

  return (
    <main>
      <header className="topbar" data-reveal>
        <a href="#top" className="brand" aria-label="Red Bull home">
          <img src="/redbull-logo.svg" alt="Red Bull" />
        </a>
        <nav aria-label="Main navigation">
          <a href="#drinks">Energy Drinks</a>
          <a href="#company">Company</a>
          <a href="#world">World of Red Bull</a>
        </nav>
        <div className="header-actions">
          <button aria-label="Search" className="icon-button">⌕</button>
          <button aria-label="Open menu" className="icon-button menu" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        </div>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
            <a href="#drinks" onClick={() => setMenuOpen(false)}>Energy Drinks</a>
            <a href="#company" onClick={() => setMenuOpen(false)}>Company</a>
            <a href="#world" onClick={() => setMenuOpen(false)}>World of Red Bull</a>
        </div>
      </header>

      <section
        className="hero"
        id="top"
        ref={heroRef}
        data-hero-step={heroStep}
        onMouseMove={handleHeroMove}
        onMouseLeave={() => setHeroTilt({ x: 0, y: 0 })}
        style={{ "--tilt-x": heroTilt.x, "--tilt-y": heroTilt.y, "--hero-progress": heroProgress } as React.CSSProperties}
      >
        <div className="hero-stage">
          <article className="hero-product-card card-pink">
            <div className="can-wrap pink-wrap">
              <img className="hero-can" src="/pink.webp" alt="A can of Red Bull Pink Edition" />
            </div>
            <div className="product-copy">
              <p className="eyebrow">Red Bull Energy Drink Editions</p>
              <h2>The Pink<br />Edition</h2>
              <p className="intro">Wiiings for every taste, sliding forward as the hero card stack changes.</p>
              <a className="cta" href="#editions">See product</a>
            </div>
          </article>
          <article className="hero-product-card card-blue">
            <div className="can-wrap blue-wrap">
              <img className="hero-can" src="/sugarfree.webp" alt="A can of Red Bull Sugarfree" />
            </div>
            <div className="product-copy">
              <p className="eyebrow">Red Bull Energy Drinks</p>
              <h2>Red Bull<br />Sugarfree</h2>
              <p className="intro">Wiiings without sugar, revealed from behind the original card.</p>
              <a className="cta" href="#drinks">See product</a>
            </div>
          </article>
          <article className="hero-product-card product-card card-white">
            <div className="can-wrap">
              <img className="hero-can" src="/redbull.webp" alt="A full chilled can of Red Bull Energy Drink" />
            </div>
            <div className="product-copy" data-reveal>
              <p className="eyebrow reveal-child">Red Bull Energy Drinks</p>
              <h1 className="reveal-child">The Original<br />Red Bull</h1>
              <p className="intro reveal-child">Red Bull is appreciated worldwide by top athletes, busy professionals, university students and travellers on long journeys.</p>
              <span className="veg reveal-child" aria-label="Vegetarian product"><i /></span>
              <a className="cta reveal-child" href="#drinks">See product</a>
            </div>
          </article>
          <div className="hero-progress" aria-hidden="true">
            <span className={heroStep === 0 ? "is-active" : ""} />
            <span className={heroStep === 1 ? "is-active" : ""} />
            <span className={heroStep === 2 ? "is-active" : ""} />
          </div>
          <div className="scroll-cue">Scroll to explore <span>↓</span></div>
        </div>
      </section>

      <section className="split-feature" id="drinks">
        <div className="feature-copy" data-reveal>
          <p className="eyebrow reveal-child">Red Bull Energy Drinks</p>
          <h2 className="reveal-child">Red Bull<br />Sugarfree</h2>
          <p className="subhead reveal-child">Wiiings without sugar</p>
          <a className="cta reveal-child" href="#editions">See product</a>
        </div>
        <div className="blue-can-stage" data-reveal>
          <span className="halo" />
          <img src="/sugarfree.webp" alt="A full chilled can of Red Bull Sugarfree" />
        </div>
      </section>

      <section className="editions" id="editions" style={{ "--edition": product.tone } as React.CSSProperties}>
        <div className="edition-visual" data-reveal>
          <span className="edition-ring" />
          <div className="edition-rail" style={{ "--active": edition } as React.CSSProperties}>
            {products.map((item, index) => (
              <button
                className={`edition-can ${edition === index ? "is-active" : ""}`}
                key={item.name}
                style={{ "--can-tone": item.tone } as React.CSSProperties}
                aria-label={`Select ${item.name}`}
                aria-pressed={edition === index}
                onClick={() => setEdition(index)}
              >
                <img src={item.can} alt="" />
              </button>
            ))}
          </div>
          <div className="rail-caption">
            {products.map((item, index) => (
              <span className={edition === index ? "is-active" : ""} key={item.name}>
                {item.name}
              </span>
            ))}
          </div>
        </div>
        <div className="edition-copy" data-reveal>
          <p className="eyebrow reveal-child">Red Bull Energy Drink Editions</p>
          <h2 className="reveal-child" key={`title-${product.name}`}>{product.name}</h2>
          <p className="subhead reveal-child">{product.tag}</p>
          <div className="edition-actions reveal-child">
            <a className="cta" href="#company">See product</a>
            <div className="flavor-picker">
              {products.map((item, index) => (
                <button
                  key={item.name}
                  aria-label={`Select ${item.name}`}
                  aria-pressed={edition === index}
                  style={{ background: item.tone }}
                  onClick={() => setEdition(index)}
                />
              ))}
            </div>
          </div>
          <div className="pager reveal-child">
            <button onClick={() => setEdition((edition + products.length - 1) % products.length)}>←</button>
            <span>0{edition + 1} / 0{products.length}</span>
            <button onClick={() => setEdition((edition + 1) % products.length)}>→</button>
          </div>
        </div>
      </section>

      <section className="company" id="company">
        <div className="company-ribbons" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="company-heading" data-reveal>
          <p className="eyebrow reveal-child">Red Bull Company</p>
          <h2 className="reveal-child">Giving wiiings to<br />people &amp; ideas<br />since 1987</h2>
          <a className="text-link reveal-child" href="#world">Company <span>↗</span></a>
          <div className="company-stats reveal-child" aria-label="Red Bull company highlights">
            <span><b>1987</b>Born in Austria</span>
            <span><b>170+</b>Countries</span>
            <span><b>1</b>Mission</span>
          </div>
        </div>
        <blockquote className="quote-card" data-reveal>
          <img className="quote-logo" src="/redbull-logo.svg" alt="" aria-hidden="true" />
          <span className="quote-mark">“</span>
          <p>During a match I have a Red Bull shortly before going out to bat or field.</p>
          <footer>
            <div className="avatar">KL</div>
            <div><b>KL Rahul</b><small>Cricket</small></div>
          </footer>
        </blockquote>
      </section>

      <section className="world" id="world">
        <div className="section-title" data-reveal>
          <p className="eyebrow reveal-child">Discover</p>
          <h2 className="reveal-child">World of Red Bull</h2>
        </div>
        <div className="story-grid">
          {moments.map((moment) => (
            <article className="story" key={moment.label} data-reveal>
              <img src={moment.image} alt="" />
              <div><span>{moment.label}</span><h3>{moment.title}</h3><a href="#top">Explore story →</a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="sustainability" data-reveal>
        <p className="eyebrow reveal-child">Sustainability</p>
        <h2 className="reveal-child">The lifecycle<br />of our can</h2>
        <p className="reveal-child">Sustainability is part of Red Bull’s DNA. Every can has more than one life.</p>
        <a className="cta light reveal-child" href="#top">Can lifecycle</a>
        <div className="recycle-can"><img src="/redbull.webp" alt="" /></div>
      </section>

      <footer className="footer">
        <img src="/redbull-logo.svg" alt="Red Bull" />
        <div><a href="#drinks">Products</a><a href="#company">Company</a><a href="#world">Media</a></div>
        <small>© 2026 Red Bull</small>
      </footer>
    </main>
  );
}
