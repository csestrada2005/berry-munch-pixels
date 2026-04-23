

# 5 Sweet Interactions — Feasibility & Plan

All 5 are implementable. Below: feasibility check + the exact approach I'll use, with adjustments where the original spec needs tweaking.

---

## 1. Willy Wonka Scroll Drip ✅ (with adjustment)

**Feasibility**: Works, but `chocolate-drip.png` does not exist in assets — only `ChocolateDrip.tsx` (an inline SVG). I'll use the existing SVG and stretch it via `scaleY` on scroll.

**How**:
- In `ChocolateDrip.tsx`, accept an optional `scrollContainer` ref/sentinel.
- Use `useScroll({ target, offset: ["start end", "end start"] })` + `useTransform` to map progress → `scaleY` from `1` → `2.2` and add a slight `y` offset.
- Apply via `motion.svg` with `transformOrigin: "top"` so it stretches downward.
- Use `useSpring` to smooth the value (settles when scroll stops).
- Mount inside `AboutSection.tsx` at the top edge so it visually drips into the section.

## 2. Squish & Pop Hover Physics ✅

**Feasibility**: Direct fit. Current `Tilt.tsx` uses raw DOM transforms which conflict with framer-motion. I'll convert it to a `motion.div` so spring + tilt coexist.

**How**:
- Refactor `Tilt.tsx` to use `motion.div` with `useMotionValue` for `rotateX/rotateY` (mouse tilt) and add `whileHover={{ scale: 0.97 }}` / `whileTap={{ scale: 0.92 }}` with `transition={{ type: "spring", stiffness: 400, damping: 10 }}`.
- Keeps existing API (`children`, `className`, `max`) so `ProductsSection.tsx` needs no change for this part.

## 3. Sweet Victory Cart Explosion ✅

**Feasibility**: Direct fit.

**How**:
- Extend `ConfettiBurst.tsx` props: `colors?: string[]`, `count?: number`.
- New default palette: `["#4A2511", "#7B3F00", "#E23D28", "#FF6B6B"]`.
- Increase particle variety (mix of round dots + small rounded rects for "chocolate chunks").
- `ProductsSection.tsx` already calls `ConfettiBurst` per card — confirm trigger remains on `+ Añadir`. Reposition burst origin to emit from the button itself (absolute container around button) instead of card-center.

## 4. Floating Parallax Ingredients ⚠️ (asset missing — fallback)

**Feasibility**: `strawberries-floating.png` does not exist in `src/assets/`. Two options:
- **(A) Use existing** `strawberry-splash.png` + `dubai-pistachio-strawberry.png` as floating layers (no new asset needed).
- **(B)** Generate/add a new transparent PNG.

**Plan**: Go with **(A)** — place 2–3 existing strawberry PNGs absolutely positioned in the hero background at low opacity, each moving via `useScroll` + `useTransform` at different speeds (15%, 30%, 45%) for depth. The hero video stays as the base layer; floating fruit sits between video and content with `pointer-events-none`.

If you prefer a single dedicated `strawberries-floating.png`, say so and I'll generate one instead.

## 5. "Bite" Cursor ⚠️ (adjusted approach)

**Feasibility**: Pure CSS `cursor: url(...)` works for static SVGs but **cannot animate on `:active`** (browsers don't re-render cursor images on state change reliably, and emoji-as-cursor has poor cross-browser support).

**Plan**: Build a `CustomCursor.tsx` component:
- Hide native cursor (`cursor: none`) only on `(pointer: fine)` devices.
- Render a fixed-position 🍓 element that follows mouse via `useMotionValue` + `useSpring` (smooth trailing).
- Detects hover over `button, a, [role="button"]` via `mouseover`/`mouseout` delegation → scales up + swaps to 🥄.
- On `mousedown` → tilts/scales down (the "bite") via `whileTap`-style state.
- Respects `prefers-reduced-motion` and touch devices (renders nothing).
- Mounted in `src/routes/__root.tsx`.

---

## Files touched

| File | Change |
|---|---|
| `src/components/berry/ChocolateDrip.tsx` | Convert to motion.svg, add scroll-driven scaleY |
| `src/components/berry/AboutSection.tsx` | Mount drip with scroll target ref |
| `src/components/berry/fx/Tilt.tsx` | Rewrite with motion.div + spring squish |
| `src/components/berry/fx/ConfettiBurst.tsx` | Add `colors` prop, new defaults, chunk shapes |
| `src/components/berry/ProductsSection.tsx` | Move burst origin to button |
| `src/components/berry/HeroSection.tsx` | Add parallax strawberry layers |
| `src/components/berry/CustomCursor.tsx` | NEW — global cursor |
| `src/routes/__root.tsx` | Mount `<CustomCursor />` |
| `src/styles.css` | `cursor: none` on fine pointers, hide on touch |

No new dependencies needed — `framer-motion` is already installed.

## Performance & a11y

- All scroll/mouse handlers use `useMotionValue` (no React re-renders).
- `useSpring` damping keeps everything 60fps.
- Cursor + parallax + tilt gated behind `matchMedia('(pointer: fine)')` and `prefers-reduced-motion: reduce`.
- Confetti capped at 16 particles, auto-cleaned after 800ms.

