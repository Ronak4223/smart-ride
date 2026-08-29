import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { MagneticButton } from '../ui/MagneticButton';
import { Nav } from '../Nav/Nav';
// Original high-res JPEG fallback.
import heroTaxi from '../../assets/hero-taxi.jpg';
import heroThumb from '../../assets/photos/hero-thumb.jpg';
import './Hero.css';

gsap.registerPlugin(SplitText);

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [copyIn, setCopyIn] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setCopyIn(true), 120);
    return () => clearTimeout(id);
  }, []);

  // Headline: masked per-character reveal — a cinematic title card.
  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const split = SplitText.create(el, { type: 'lines,chars', mask: 'lines' });
    gsap.set(split.chars, { yPercent: 115, opacity: 0, filter: 'blur(10px)' });
    const tween = gsap.to(split.chars, {
      yPercent: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.15,
      ease: 'expo.out',
      stagger: { each: 0.018, from: 'start' },
      delay: 0.3,
    });

    return () => {
      tween.kill();
      split.revert();
    };
  }, []);

  return (
    <div className="hero" id="home" ref={heroRef}>
      <Nav />
      <img
        className="hero-bg"
        alt="Smart Ride yellow taxi in a cinematic golden studio"
        src={heroTaxi}
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero-overlay" />

      <div className={`hero-copy${copyIn ? ' in' : ''}`}>
        <h1 ref={headlineRef}>
          MOVE SMARTER,
          <span>EVERY DAY.</span>
        </h1>
      </div>

      <div className={`hero-panel${copyIn ? ' in' : ''}`}>
        <div className="hero-panel-text">
          <p>
            Reliable rides.
            <br />
            Every day. <em>On your time.</em>
          </p>
          <MagneticButton href="#plans" variant="solid" className="hero-panel-cta">
            Find Your Plan →
          </MagneticButton>
        </div>
        <div className="hero-panel-media">
          <img src={heroThumb} alt="Yellow taxi crossing a city bridge at sunset" loading="lazy" width={960} height={640} />
        </div>
      </div>
    </div>
  );
}
