import { useEffect, useState } from 'react';
import { Button } from '../ui/SrButton';
import './Nav.css';

const LINKS: { href: string; label: string }[] = [
  { href: '#home', label: 'Home' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#plans', label: 'Plans' },
  { href: '#corporate', label: 'Corporate' },
  { href: '/dashboard', label: 'Dashboard' },
];


export function Nav() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>('home');

  useEffect(() => {
    const ids = LINKS.filter((l) => l.href.startsWith('#'))
      .map((l) => l.href.slice(1))
      .filter((id) => id !== 'home');
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#home" className="brand">
          <span className="brand-mark" />
          SMART RIDE
        </a>

        <nav className={`nav-links${open ? ' open' : ''}`}>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={activeId === link.href.slice(1) ? 'active' : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
          <Button as="a" href="/subscription" variant="outline" className="nav-menu-cta" style={{ marginTop: 8 }} onClick={closeMenu}>
            START SUBSCRIPTION
          </Button>
        </nav>

        <div className="nav-right">
          <Button as="a" href="/subscription" variant="outline" className="nav-cta">
            Start Subscription
          </Button>
          <button
            className={`nav-toggle${open ? ' open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
