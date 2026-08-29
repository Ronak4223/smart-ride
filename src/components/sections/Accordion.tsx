import { useState } from 'react';
import type { FaqItem } from '../../data/site';

/**
 * Accordion used by the FAQ section. Expansion uses a grid-rows transition so
 * the answer flows open without measuring heights and without layout jumps.
 */
export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="sr-faq-list reveal">
      {items.map((item, i) => (
        <div className={`sr-faq-item${open === i ? ' open' : ''}`} key={item.q}>
          <button
            className="sr-faq-q"
            type="button"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{item.q}</span>
            <span className="plus" />
          </button>
          <div className="sr-faq-a">
            <div className="sr-faq-a-clip">
              <div className="sr-faq-a-inner" dangerouslySetInnerHTML={{ __html: item.a }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
