import { useState } from 'react';
import { PLANS, type Plan, type BillingCycle } from '../../types/plans';
import { Button } from '../ui/SrButton';
import { useTilt } from '../../lib/useTilt';
import { useSpotlight } from '../../lib/motionHooks';
import { useSectionStory } from '../../lib/useSectionStory';
import './Plans.css';

const CHECK = (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l4 4L19 7" />
  </svg>
);
const ARROW = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

interface PlanCardProps {
  plan: Plan;
  cycle: BillingCycle;
}

function PlanCard({ plan, cycle }: PlanCardProps) {
  const tiltRef = useTilt<HTMLDivElement>({
    max: 5,
    scale: plan.popular ? 1.065 : 1.02,
    lift: 4,
    baseScale: plan.popular ? 1.045 : 1,
  });
  const price = cycle === 'yearly' && plan.yearlyPrice ? plan.yearlyPrice : plan.monthlyPrice;
  const suffix = plan.monthlyPrice === 'Custom' ? null : cycle === 'yearly' ? '/year' : '/month';

  return (
    <div
      ref={tiltRef}
      data-story="card"
      className={`plan-card sr-card-x sr-lit${plan.popular ? ' popular sr-featured-glow' : ''}`}
    >
      {plan.popular && <span className="plan-badge">Most Popular</span>}
      <div className="plan-name" data-card-title>{plan.name}</div>
      <div className="plan-desc">{plan.description}</div>
      <div className="plan-price">
        <span className="amt">{price}</span>
        {suffix && <span className="per">{suffix}</span>}
      </div>
      <ul className="plan-features">
        {plan.features.map((f) => (
          <li key={f}>
            {CHECK} {f}
          </li>
        ))}
      </ul>
      <span data-card-cta>
        <Button as="a" href="/subscription" variant={plan.ctaVariant === 'solid' ? 'amber' : 'navy-outline'}>
          {plan.ctaLabel}
        </Button>
      </span>
    </div>
  );
}

export function Plans() {
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  const sectionRef = useSectionStory<HTMLElement>({ stagger: 0.11, parallax: false });
  const gridRef = useSpotlight<HTMLDivElement>('.plan-card');

  return (
    <section className="plans-section" id="plans" ref={sectionRef}>
      <div className="sr-wrap">
        <div className="plans-head-row">
          <div className="plans-head">
            <span className="sr-eyebrow" data-story="eyebrow">Pricing</span>
            <h2 className="plans-h2" data-story="heading">Built around the way you move.</h2>
          </div>
          <div className="billing-toggle" data-story="sub">
            <button type="button" className={cycle === 'monthly' ? 'active' : ''} onClick={() => setCycle('monthly')}>
              Monthly
            </button>
            <button type="button" className={cycle === 'yearly' ? 'active' : ''} onClick={() => setCycle('yearly')}>
              Yearly <span className="save-tag">Save 2 mo.</span>
            </button>
          </div>
        </div>

        <div className="plans-grid sr-card-row" ref={gridRef}>
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} cycle={cycle} />
          ))}
        </div>

        <div className="compare-link" data-story="last">
          <a href="#compare">
            Compare all features {ARROW}
          </a>
        </div>
      </div>
    </section>
  );
}
