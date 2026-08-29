# Smart Ride — Audit Report & Restoration Plan

## Report 1: Pre-change audit

### Where things stand
The Lovable project is still the **blank starter template** — `src/routes/index.tsx` renders the placeholder image and nothing from Smart Ride exists here yet. The uploaded ZIP is a separate standalone Vite app in which only part of the original site was ever ported. So nothing is "lost in conversion" so much as **never finished**: the ZIP itself stops after 5 sections and leaves a `Placeholder` stub.

### Sections in the original `index_1.html` (24 total)

| # | Section | In ZIP? | Status |
|---|---------|---------|--------|
| — | Nav / header | Yes | Present, but only 5 links |
| — | Hero (3D car) | Yes | Present |
| 01 | Post-hero search / conversion panel | No | **Missing** |
| — | Trust / statistics strip | Yes (`Stats`) | Present |
| 02 | Why Smart Ride | No | **Missing** |
| 03 | How It Works | Yes | Present |
| 04 | Monthly Subscription Plans | Yes | Present |
| 05 | Plan Comparison (`#compare`) | No | **Missing** |
| 10 | Route Explorer | Partial | Present but reduced |
| 11 | Vehicle Collection | Stub only | **Missing** (placeholder) |
| 12 | Safety & Trust | No | **Missing** |
| 13 | Drivers | No | **Missing** |
| 14 | Subscription Scheduler | No | **Missing** |
| 15 | Savings | No | **Missing** |
| 16 | App Promotion | No | **Missing** |
| 17 | Testimonials | No | **Missing** |
| 18 | Corporate | No | **Missing** |
| 19 | Partner Logos | No | **Missing** |
| 20 | FAQ | No | **Missing** |
| 21 | Blog / Resources | No | **Missing** |
| 22 | Final CTA | No | **Missing** |
| — | Project Documentation (PRD) | No | **Missing** (you asked to include it) |
| 23 | Footer | No | **Missing** |

### Duplicates
- **No duplicate sections or components found.** Each section has exactly one implementation.
- Nav has no duplicate links; it simply has too few.

### Unused / disconnected code
- `components/Routes/RoutesDrive.tsx` + `RoutesDrive.css` (230 + 102 lines) — never imported anywhere.
- `components/Placeholder/*` — a deliberate temporary stub for `#vehicles`.
- `src/assets/vite.svg` — template leftover.

### Broken references
- No broken imports in the ZIP; it builds as-is.
- Nav link `#vehicles` resolves to the placeholder stub, not real content.
- Nav has **no** links for Why, Compare, Safety, Drivers, Scheduler, Savings, Testimonials, Corporate, FAQ, Blog — those anchors cannot be reached.

---

## The plan

### 1. Bring the ZIP app into this project
Port the whole Vite app into the TanStack Start structure already here, since that is what the preview serves:
- Everything renders on `src/routes/index.tsx` as one scrolling page (this is a single-page marketing site with anchor navigation, matching the original).
- Component folders move to `src/components/<Name>/` unchanged (own `.tsx` + `.css`), so the existing design, colors, fonts, animations and responsive rules are preserved byte-for-byte.
- `src/index.css` design tokens merge into `src/styles.css` at the top; Google Fonts (Space Grotesk, Inter, JetBrains Mono) load via a `<link>` in `__root.tsx`.
- Install `gsap`, `@gsap/react`, `lenis`, `three`.
- Car mesh binaries and textures + `hero-bg.jpg` / `car-shadow.png` upload to the Lovable CDN as asset pointers rather than sitting in the repo. The 3D hero stays exactly as built.
- The three.js hero and cursor/smooth-scroll layers are browser-only, so they mount client-side after hydration to keep server rendering intact.

### 2. Restore the 18 missing sections
Each becomes one new component, converted 1:1 from the original HTML/CSS — same markup, same class names, same inline SVG illustrations, same copy. No redesign, no placeholder text, no invented content:

Search panel, Why Smart Ride, Plan Comparison, Vehicle Collection, Safety & Trust, Drivers, Scheduler, Savings, App Promotion, Testimonials, Corporate, Partner Logos, FAQ, Blog, Final CTA, Documentation (PRD), Footer — plus the Route Explorer gets its full original content restored.

The original's inline `<script>` behaviors (reveal-on-scroll, counters, FAQ accordion, scheduler interactions, tab/filter switching, form handling) are reimplemented as React state and effects so every interactive element actually works.

### 3. Correct order
Nav → Hero → Search → Stats → Why → How It Works → Plans → Compare → Routes → Vehicles → Safety → Drivers → Scheduler → Savings → App → Testimonials → Corporate → Partners → FAQ → Blog → Final CTA → Documentation → Footer.

### 4. Navigation
Rebuild the nav link set so every major section is reachable, with smooth scroll and the existing scroll-spy active state, and a mobile menu that keeps working. Grouped where the list would otherwise overflow, matching the original nav's structure.

### 5. Cleanup
Delete `Placeholder`, the unused `RoutesDrive` pair, `vite.svg`, and the ZIP's own `index.html` / `main.tsx` / `App.tsx` / Vite+TS config files, which are redundant under this project's build. No section gets two implementations — each has a single component file.

### 6. Verification
Build, then load the page in a headless browser at desktop and mobile widths: confirm all 23 anchors exist exactly once, every nav link scrolls to a real section, and the console is clean. Then post **Report 2** listing what was restored, removed and fixed, plus the final structure.

## Technical notes
- Single route (`/`) with section components; head metadata set on the index route (title, description, og/twitter).
- Section CSS stays as plain per-component `.css` files, not rewritten to Tailwind, to guarantee the design is unchanged.
- Heavy 3D assets served from CDN; the model loads lazily so first paint is not blocked.
