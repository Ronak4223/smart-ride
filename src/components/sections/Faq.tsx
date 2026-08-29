import { FAQS } from '../../data/site';
import { Accordion } from './Accordion';

/** Frequently asked questions. */
export function Faq() {
  return (
    <section className="sr-section sr-faq-section" id="faq">
      <div className="sr-wrap">
        <div className="sr-head" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
          <span className="sr-eyebrow reveal">FAQ</span>
          <h2 className="sr-h2 reveal">Questions? We've Got You Covered.</h2>
        </div>
        <Accordion items={FAQS} />
      </div>
    </section>
  );
}
