# Plan: Slot-Machine Text + Color-Wipe Scroll Choreography

Apply the analyzed Webflow/GSAP pattern to **ProductsSection ("Nuestros Berry Bests")** and **BerriesGallery ("Our Berries")**, using our existing **framer-motion + `useScroll**` stack (no GSAP dependency needed — `useTransform` + `scrub`-equivalent is already what we use). Same hardware-accel principles apply (we'll use `translate3d`/`scale3d` via `transform` strings or `style.transform` to force GPU).

---

## The Choreography (shared between both sections)

For each section, the sticky stage runs four scroll-linked tracks in parallel:

```text
scrollYProgress   0 ─────── 0.25 ─────── 0.55 ─────── 0.80 ─────── 1.0
                  │            │             │            │
1) BG box scale   small ───────► fills screen
2) Text mask      "Line A"  ────────────► slides up to "Line B"
3) Wipe overlay   dot (scale 0) ──────────────► scale(40) covers screen
4) Content        ──────────────────────────────► card grid / carousel reveals
```

The **wipe overlay** is the key new ingredient: a small circle absolutely centered inside the colored box, starting at `scale3d(0,0,1)`, ending at `scale3d(40,40,1)` — produces a seamless radial color change without a hard cut.

---

## Section 1 — ProductsSection ("Nuestros Berry Bests")

Current: cream box scales up, then 4 cards fade in. No text carousel, no wipe.

Changes:

1. **Add text mask above the title area.** Two stacked `<h2>`s in a `overflow-hidden` mask of fixed line-height. As scroll progresses through `0.20 → 0.40`, translate the inner carousel by `-50%` (`y: ["0%", "-50%"]`).
  - Line A: `"Hechas a mano, una a una."`
  - Line B: `"NUESTROS BERRY BESTS"` (the existing title, promoted into the slot)
2. **Add wipe overlay.** A circle absolutely centered inside the expanding cream box. Background `var(--berry)` (deep red). Scrubbed from `scale3d(0,0,1)` → `scale3d(40,40,1)` over `0.40 → 0.55`. After the wipe, the stage background reads as berry red, so the cards (currently styled for cream bg) need their reveal pushed to **after** the wipe with **berry-on-cream inverted card styling** OR we reverse the wipe colors so cards still land on cream. **Recommended: wipe goes cream → berry → cream-soft for the card grid panel**, i.e. the wipe reveals a second cream-soft inner panel that hosts the cards. This preserves current card design.
3. **Repush card reveals** to `0.55 → 0.75` (first pair) and `0.70 → 0.90` (second pair).
4. **Hardware accel:** swap `y`/`scale` props to explicit `transform` style strings using `translate3d` + `scale3d`, and add `will-change: transform` to the box, wipe, and text carousel.

## Section 2 — BerriesGallery ("Our Berries")

Current: pink box scales up, then horizontal carousel scrolls through 5 images.

Changes:

1. **Add text mask for the "Our / Berries" title.** Two stacked headlines inside an `overflow-hidden` container:
  - Line A: `"Pequeñas obras dulces."`
  - Line B: `"Our Berries"` (existing)
   Slide track from `y: 0 → -50%` over `0.15 → 0.30` (before the horizontal phase begins).
2. **Add wipe overlay** centered inside the pink box. Color: a deeper berry/strawberry tone (e.g. `#E91E63` or `var(--berry)`). Scrub `scale3d(0)` → `scale3d(40)` over `0.30 → 0.42` — this transitions the stage from pastel pink to a richer hue right as the horizontal carousel begins, giving the gallery a more dramatic backdrop.
3. **Shift carousel timing** to `0.42 → 0.95` (was `0.25 → 0.95`) to make room for the text + wipe acts. Extend wrapper height from `350vh` → `420vh` to keep horizontal travel feeling unhurried.
4. **Hardware accel:** same `translate3d`/`scale3d` + `will-change` treatment on bg, wipe, title carousel, and the horizontal track.

---

## Technical Notes

- **No GSAP needed.** `useScroll({ target, offset })` + `useTransform` already gives us scrubbed timeline behavior identical to GSAP's `scrub: 1` (framer adds smoothing via `useSpring` if we want extra easing — optional, can wrap each MotionValue in `useSpring(mv, { stiffness: 100, damping: 30 })`).
- **GPU hint pattern** (instead of `y={...}` prop):
  ```tsx
  const transform = useMotionTemplate`translate3d(0, ${y}%, 0) scale3d(${s}, ${s}, 1)`;
  <motion.div style={{ transform, willChange: "transform" }} />
  ```
- **Text mask CSS** (Tailwind):
  ```tsx
  <div className="overflow-hidden h-[1.2em] leading-[1.2]">
    <motion.div style={{ y: textY }} className="will-change-transform">
      <h2>Line A</h2>
      <h2>Line B</h2>
    </motion.div>
  </div>
  ```
- **Wipe overlay pattern**:
  ```tsx
  <motion.span
    aria-hidden
    style={{ transform: useMotionTemplate`translate(-50%,-50%) scale3d(${wipeScale},${wipeScale},1)` }}
    className="absolute left-1/2 top-1/2 w-24 h-24 rounded-full bg-berry will-change-transform"
  />
  ```
- **Sticky containers stay as-is** (`h-screen sticky top-0` inside a tall wrapper). Only the inner timing maps change.
- **Reduced motion:** wrap MotionValues so that when `prefers-reduced-motion: reduce`, we snap to end-state values (skip text slide + wipe, just show final composition). Reuse the existing `@media (prefers-reduced-motion: reduce)` block in `styles.css`.

---

## Files to Edit

- `src/components/berry/ProductsSection.tsx` — add text mask + wipe overlay, retime card reveals, switch to `translate3d`/`scale3d` transforms.
- `src/components/berry/BerriesGallery.tsx` — add text mask above the "Our Berries" headline, add wipe overlay, retime carousel, extend wrapper to `420vh`, switch to 3D transforms.
- `src/styles.css` — (optional) add a `.will-change-transform` utility if not already covered, and one shared keyframe-free helper class for the mask if needed.

No new dependencies. No DOM-structure changes outside the two section components.

---

## Open Choices (please confirm before I build)

1. **Slot-machine copy** — happy with my suggested Line A texts, or do you want to write them?
  - Products: `"Hechas a mano, una a una."` → `"NUESTROS BERRY BESTS"`
  - Gallery: `"Pequeñas obras dulces."` → `"Our Berries"`
2. **Wipe color for ProductsSection** — wipe to **berry red** then reveal a cream-soft inner panel for the cards (preserves card look), or wipe to a new color and restyle cards?
3. **Wipe color for BerriesGallery** — deeper pink/berry (e.g. `#E91E63`), or keep pastel and instead use the wipe to introduce a textured/cream backdrop behind the carousel?  
  
1. Use the suggested Line A texts.  
2. Wipe to berry red then reveal a cream-soft inner panel for the cards.  
3. Deeper ponk/berry