import { useState } from 'react';
import { COMPARE_ROWS, COMPARE_NOTES } from '../../data/site';
import { IconCheck, IconCross } from './icons';
import { useCinematicReveal } from '../../lib/motionHooks';

function Cell({ value }: { value: string }) {
  if (value === '__CHECK__') return <IconCheck />;
  if (value === '__CROSS__') return <IconCross />;
  return <>{value}</>;
}

const PLANS = ['Basic', 'Plus', 'Pro', 'Corporate'];

/** Detailed, interactive plan comparison table. */
export function Compare() {
  const [col, setCol] = useState<number | null>(null);
  const [row, setRow] = useState<number | null>(null);
  const tableRef = useCinematicReveal<HTMLDivElement>('tbody tr', { stagger: 0.045, y: 26 });

  const note = row !== null ? COMPARE_NOTES[COMPARE_ROWS[row]![0]!] : null;

  return (
    <section className="sr-section sr-compare-section" id="compare" style={{ paddingTop: 0 }}>
      <div className="sr-wrap">
        <div className="sr-head">
          <span className="sr-eyebrow reveal">Compare</span>
          <h2 className="sr-h2 reveal">Compare Plans in Detail</h2>
        </div>
        <div className="sr-compare-scroll reveal" ref={tableRef} onMouseLeave={() => { setCol(null); setRow(null); }}>
          <table className={`sr-compare-table${col !== null ? ' is-focused' : ''}`}>
            <thead>
              <tr>
                <th>Feature</th>
                {PLANS.map((p, i) => (
                  <th
                    key={p}
                    className={col === i + 1 ? 'is-active' : col !== null ? 'is-dim' : ''}
                    onMouseEnter={() => setCol(i + 1)}
                  >
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((r, ri) => (
                <tr
                  key={r[0]}
                  className={row === ri ? 'is-active' : ''}
                  onMouseEnter={() => setRow(ri)}
                >
                  {r.map((cell, i) => (
                    <td
                      key={i}
                      className={
                        i === 0 || col === null ? '' : col === i ? 'is-active' : 'is-dim'
                      }
                      onMouseEnter={() => i > 0 && setCol(i)}
                    >
                      <Cell value={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={`sr-compare-note${note ? ' is-open' : ''}`} aria-live="polite">
          <div className="sr-compare-note-inner">
            {note ? (
              <>
                <b>{COMPARE_ROWS[row!]![0]}</b>
                <span>{note}</span>
              </>
            ) : (
              <span className="hint">Hover a row for details, or a column to focus a plan.</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
