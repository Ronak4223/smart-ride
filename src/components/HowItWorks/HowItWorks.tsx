import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STEPS } from '../../types/steps';
import { useSpotlight } from '../../lib/motionHooks';
import { EASE, DURATION, STAGGER, REVEAL_FROM, REVEAL_TO, REVEAL_START } from '../../styles/motion';
import './HowItWorks.css';

gsap.registerPlugin(ScrollTrigger);

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useSpotlight<HTMLDivElement>('.hiw-step');
  const lineFillRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // Entrance: left copy + step cards stagger in once, as usual.
      const reveals = sectionRef.current?.querySelectorAll('.reveal-up');
      if (reveals?.length) {
        gsap.set(reveals, REVEAL_FROM);
        gsap.to(reveals, {
          ...REVEAL_TO,
          duration: DURATION.base,
          ease: EASE.out,
          stagger: STAGGER.base,
          scrollTrigger: { trigger: sectionRef.current, start: REVEAL_START, once: true },
        });
      }

      // The line itself is genuinely scroll-scrubbed — its fill amount is a
      // direct function of scroll position through the steps track, not a
      // one-shot "it's in view" trigger.
      // Each card activates as it crosses the reading line, and elegantly
      // de-emphasises once the next one takes over — a scroll-told story.
      const steps = stepsRef.current?.querySelectorAll<HTMLElement>('.hiw-step');
      steps?.forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 70%',
          end: 'bottom 45%',
          onToggle: (self) => step.classList.toggle('is-active', self.isActive),
        });
      });

      if (lineFillRef.current && stepsRef.current) {
        gsap.set(lineFillRef.current, { scaleY: 0, transformOrigin: 'top center' });
        gsap.to(lineFillRef.current, {
          scaleY: 1,
          ease: EASE.linear,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: 0.4,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  return (
    <section className="hiw-section" id="how-it-works" ref={sectionRef}>
      <svg className="hiw-route-bg" viewBox="0 0 300 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M40 0 Q120 120 60 220 T160 420 Q220 480 180 600"
          stroke="#F5C400"
          strokeWidth="2"
          fill="none"
          strokeDasharray="2 12"
          strokeLinecap="round"
        />
        <circle cx="40" cy="0" r="5" fill="#FFC107" />
        <circle cx="180" cy="600" r="5" fill="#0B1220" />
      </svg>

      <div className="sr-wrap hiw-grid">
        <div className="hiw-left">
          <span className="sr-eyebrow reveal-up" style={{ color: 'var(--act-accent, var(--amber))' }}>
            How It Works
          </span>
          <h2 className="reveal-up">
            From doorstep to destination.
            <br />
            Handled.
          </h2>
          <p className="reveal-up">
            Set it up once and Smart Ride takes care of the rest — same driver rhythm, same
            route, every scheduled day.
          </p>
        </div>

        <div className="hiw-steps" ref={stepsRef}>
          <div className="hiw-vline">
            <span className="hiw-vline-fill" ref={lineFillRef} />
          </div>
          {STEPS.map((step) => (
            <div className="hiw-step reveal-up sr-lit sr-lit-dark" key={step.num}>
              <span className="hiw-step-num">{step.num}</span>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
