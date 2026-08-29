const LOGOS = ['NORTHPEAK', 'VERTEX LABS', 'ORBIT & CO', 'CEDAR GROUP', 'ATLAS WORKS', 'HARBOR & WELLS'];

/** Partner logo strip. */
export function Partners() {
  return (
    <section className="sr-section sr-partners-section">
      <div className="sr-wrap">
        <div className="sr-partners-head">
          <span className="sr-eyebrow reveal">Trusted By</span>
          <h2 className="sr-h2 reveal" style={{ fontSize: 'clamp(22px,3vw,30px)' }}>
            Trusted by Teams That Move Every Day
          </h2>
        </div>
        <div className="sr-partners-row reveal">
          {LOGOS.map((l) => (
            <span className="sr-partner-logo" key={l}>
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
