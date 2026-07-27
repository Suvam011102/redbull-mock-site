"use client";

import { useState } from "react";

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
  const product = products[edition];

  return (
    <main>
      <header className="topbar">
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
        {menuOpen && (
          <div className="mobile-menu">
            <a href="#drinks" onClick={() => setMenuOpen(false)}>Energy Drinks</a>
            <a href="#company" onClick={() => setMenuOpen(false)}>Company</a>
            <a href="#world" onClick={() => setMenuOpen(false)}>World of Red Bull</a>
          </div>
        )}
      </header>

      <section className="hero" id="top">
        <div className="stack-card stack-pink" />
        <div className="stack-card stack-blue" />
        <article className="product-card">
          <div className="can-wrap">
            <img className="hero-can" src="/redbull.webp" alt="A full chilled can of Red Bull Energy Drink" />
          </div>
          <div className="product-copy">
            <p className="eyebrow">Red Bull Energy Drinks</p>
            <h1>The Original<br />Red Bull</h1>
            <p className="intro">Red Bull is appreciated worldwide by top athletes, busy professionals, university students and travellers on long journeys.</p>
            <span className="veg" aria-label="Vegetarian product"><i /></span>
            <a className="cta" href="#drinks">See product</a>
          </div>
        </article>
        <div className="scroll-cue">Scroll to explore <span>↓</span></div>
      </section>

      <section className="split-feature" id="drinks">
        <div className="feature-copy">
          <p className="eyebrow">Red Bull Energy Drinks</p>
          <h2>Red Bull<br />Sugarfree</h2>
          <p className="subhead">Wiiings without sugar</p>
          <a className="cta" href="#editions">See product</a>
        </div>
        <div className="blue-can-stage">
          <span className="halo" />
          <img src="/sugarfree.webp" alt="A full chilled can of Red Bull Sugarfree" />
        </div>
      </section>

      <section className="editions" id="editions" style={{ "--edition": product.tone } as React.CSSProperties}>
        <div className="edition-visual">
          <span className="edition-ring" />
          <img src={product.can} alt={`${product.name} can`} />
        </div>
        <div className="edition-copy">
          <p className="eyebrow">Red Bull Energy Drink Editions</p>
          <h2>{product.name}</h2>
          <p className="subhead">{product.tag}</p>
          <div className="edition-actions">
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
          <div className="pager">
            <button onClick={() => setEdition((edition + products.length - 1) % products.length)}>←</button>
            <span>0{edition + 1} / 0{products.length}</span>
            <button onClick={() => setEdition((edition + 1) % products.length)}>→</button>
          </div>
        </div>
      </section>

      <section className="company" id="company">
        <div className="company-heading">
          <p className="eyebrow">Red Bull Company</p>
          <h2>Giving wiiings to<br />people &amp; ideas<br />since 1987</h2>
          <a className="text-link" href="#world">Company <span>↗</span></a>
        </div>
        <blockquote>
          <span className="quote-mark">“</span>
          <p>During a match I have a Red Bull shortly before going out to bat or field.</p>
          <footer>
            <div className="avatar">KL</div>
            <div><b>KL Rahul</b><small>Cricket</small></div>
          </footer>
        </blockquote>
      </section>

      <section className="world" id="world">
        <div className="section-title">
          <p className="eyebrow">Discover</p>
          <h2>World of Red Bull</h2>
        </div>
        <div className="story-grid">
          {moments.map((moment) => (
            <article className="story" key={moment.label}>
              <img src={moment.image} alt="" />
              <div><span>{moment.label}</span><h3>{moment.title}</h3><a href="#top">Explore story →</a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="sustainability">
        <p className="eyebrow">Sustainability</p>
        <h2>The lifecycle<br />of our can</h2>
        <p>Sustainability is part of Red Bull’s DNA. Every can has more than one life.</p>
        <a className="cta light" href="#top">Can lifecycle</a>
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
