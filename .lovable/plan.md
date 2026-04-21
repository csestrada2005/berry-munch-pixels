

# Playful UI Effects — Berry Munch

Goal: turn the site into a fun, tactile experience that feels like a candy shop. Effects below are grouped by section, each is lightweight (CSS/Framer Motion) and on-brand (berry red, cream, chocolate, gold).

---

## 1. Global / Cross-section

- **Custom cursor**: small chocolate drip or strawberry follows the cursor on desktop; scales up on hover over interactive elements.
- **Scroll-triggered reveals**: fade-up + slight rotate on section entry using Intersection Observer (no heavy library needed).
- **Sprinkle confetti burst**: tiny strawberry + chocolate chip particles emit from any "+" / CTA button on click.
- **Page transition**: a chocolate drip wipe (already have `ChocolateDrip`) between route/section transitions.
- **Smooth-scroll easing**: replace native smooth-scroll with eased Lenis-style scroll for buttery feel.

## 2. Hero Section

- **Parallax cup**: the "Dubai Pistachio Strawberry" floats and tilts subtly with mouse movement (mousemove → translate/rotate).
- **Wiggle on idle**: cup wiggles every ~4s (reuse existing `animate-wiggle`).
- **Logo entrance**: Berry Munch wordmark drops in with a bounce + slight squash-and-stretch.
- **Hover on cup card**: card lifts, shadow deepens, "+" button pulses with a heartbeat.
- **Video tint pulse**: very subtle saturate breathing animation on the background video.

## 3. Navigation (Ribbon)

- **Hover**: each link grows slightly, an underline made of tiny dots (•••) draws in left-to-right.
- **Active link**: small strawberry icon hops above the active section link as you scroll.
- **Mobile menu**: opens with a "ribbon unrolling" effect (scaleY from top).

## 4. Marquee

- **Hover-pause**: marquee slows to 25% speed on hover.
- **Star bounce**: every ★ in the marquee gently bounces and rotates on its own offset.
- **Click a word**: triggers a tiny sparkle burst at cursor.

## 5. Products Section ("Berry Bests")

- **Card tilt**: 3D tilt on mouse move (max 8°), cup rotates opposite direction for depth.
- **Hover lift**: card rises, sparkle lines above the cup animate (twinkle: opacity + scale loop).
- **Cup spin on hover**: cup rotates from +6° to -6° playfully.
- **"+" button**: on click, button squashes, a small "+1" floats up and fades, then a strawberry confetti burst.
- **Price flip**: price flips like a flip-clock when hovered.
- **Section heading**: "NUESTROS BERRY BESTS" letters drop in one by one with a bounce on scroll into view.
- **CTA "se me antojan →"**: arrow wiggles continuously; on hover the whole pill jiggles and a strawberry rolls in from the left.

## 6. Loyalty Footer

- **Strawberry splash**: gentle sway animation (rotate ±3°) so it feels alive.
- **Form field focus**: input border becomes a dashed chocolate stroke that "draws" around it; placeholder slides up like a floating label.
- **Submit button**: on click, button fills left-to-right with chocolate, then bursts confetti on success; toast slides in with a strawberry icon.
- **Logo above card**: subtle floating animation (translateY loop, 4s).
- **Map pin**: bounces softly on a 3s loop; on hover, a tiny "📍" pulses.

## 7. Micro-interactions Library

A small reusable set added under `src/components/berry/fx/`:
- `<Tilt />` — 3D mouse tilt wrapper.
- `<Sparkle />` — twinkle SVG used on cards and buttons.
- `<ConfettiBurst />` — emits strawberry/chocolate/sprinkle particles from a point.
- `<Reveal />` — IntersectionObserver-based fade/slide-up.
- `<MagneticButton />` — buttons subtly attract the cursor.
- `useCursor()` — hook powering the custom cursor.

---

## Technical notes

- **Library**: add `framer-motion` for orchestrated animations and `@react-three/...`-free tilt (custom hook with rAF). No heavy 3D deps.
- **Performance**: gate cursor + parallax + tilt behind `matchMedia('(pointer: fine)')` and `prefers-reduced-motion`.
- **Accessibility**: every animation respects `@media (prefers-reduced-motion: reduce)`.
- **Keyframes**: extend `src/styles.css` with `twinkle`, `float`, `bounce-soft`, `jiggle`, `draw-underline`, `unfurl`.
- **Confetti**: hand-rolled with absolutely-positioned divs + framer-motion (no canvas-confetti dependency needed for the volume we need).

---

## Suggested rollout order

1. Foundation: `framer-motion`, `<Reveal />`, reduced-motion guard, new keyframes.
2. Hero: parallax cup, logo bounce, "+" pulse + confetti.
3. Products: tilt + hover lift + sparkle twinkle + "+1" float + heading letter drop.
4. Nav: dot underline, active strawberry hop, mobile unfurl.
5. Marquee: hover-pause, star bounce.
6. Loyalty: floating logo, swaying splash, draw-on focus, fill-up submit.
7. Polish: custom cursor, magnetic buttons, page-level chocolate drip transition.

Ask: want all 7 phases, or start with phases 1–3 (highest impact: hero + products) and iterate?

