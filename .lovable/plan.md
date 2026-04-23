
# Vertical Left-Side Navigation Inside Hero Video

## What you want

Move the floating nav from the top-center of the hero into the **left edge of the video container**, oriented **vertically**. Since labels like "PRODUCTOS" / "SUCURSAL" are long and would look awkward stacked letter-by-letter or rotated badly, I'll use a clean rotated-text pill approach that stays legible and on-brand.

## Approach

Replace the horizontal pill nav with a **vertical glass rail** docked to the inside-left of the hero video, vertically centered. Each link is **rotated -90°** (reads bottom-to-top, like a book spine) so the full word stays readable without truncation. The Berry Munch wordmark sits at the top of the rail (also rotated) as the "brand spine."

```text
┌─────────────────────────────────────┐
│  ┌──┐                               │
│  │B │   ← rail (glass pill,         │
│  │E │     vertical, rotated text)   │
│  │R │                               │
│  │R │   • PRODUCTOS                 │
│  │Y │   • PEDIR                     │
│  │  │   • SUCURSAL                  │
│  └──┘                               │
└─────────────────────────────────────┘
```

### Why rotated text (not stacked letters)
- Stacked letters ("P / R / O / D / U / C / T / O / S") get tall fast and look like a ransom note for 9-letter words.
- A 90° rotated pill keeps each label as one continuous word, takes minimal horizontal space (~40px wide), and matches the playful editorial style of the site.

### Hover behavior (kept + adapted)
- Same `layoutId="nav-highlight"` framer-motion sliding highlight, but it slides **vertically** between items now.
- Highlight pill matches each rotated link's bounding box.
- Text color flip (`text-chocolate` → `text-cream`) on hover stays.

### Mobile (<md)
- Vertical rail would crowd a phone screen. On mobile, **revert to a small floating hamburger button** docked top-left of the hero (also inside the video). Tapping opens a vertical glass panel sliding in from the left with the same links — readable upright (not rotated) since it's a temporary overlay.

## Technical changes

**`src/components/berry/Nav.tsx`** (full rewrite of the desktop layout)
- Container: change from `fixed left-1/2 top-6 -translate-x-1/2` (top-center horizontal) to `absolute left-4 md:left-6 top-1/2 -translate-y-1/2` (left-center vertical), positioned **inside** the hero video area.
- Because it now lives inside the hero, change positioning from `fixed` → `absolute`, and **render `<Nav />` inside `<HeroSection />`** rather than as a sibling in `routes/index.tsx`.
- Desktop rail: `flex flex-col` glass pill, ~`w-12` wide, items stacked vertically with `gap-6`.
- Each link wraps text in a span with `[writing-mode:vertical-rl] rotate-180` (or `-rotate-90` with origin tweak) — both work; I'll use `-rotate-90` on a fixed-height container for cleaner hover-box alignment with framer-motion.
- Brand spine: small "BERRY MUNCH" rotated label at the top of the rail.
- Highlight: motion span keeps `layoutId="nav-highlight"`, sized to match each rotated link box.
- Mobile: hamburger button absolutely positioned top-left inside hero; opens a vertical slide-in panel (upright text).

**`src/routes/index.tsx`**
- Remove `<Nav />` from the top of `<main>` (it's now rendered inside `<HeroSection />`).

**`src/components/berry/HeroSection.tsx`**
- Import and render `<Nav />` inside the morph-blob video container (above the video, below the logo z-index) so the nav is clipped to the video's morphing shape and feels embedded in it.
- Ensure `z-index` order: video (z-0) → nav rail (z-10) → logo (z-20) → cursor (z-30).

## Files touched

| File | Change |
|---|---|
| `src/components/berry/Nav.tsx` | Rewrite layout: vertical left-docked rail with rotated text + mobile slide-in panel |
| `src/components/berry/HeroSection.tsx` | Render `<Nav />` inside the video container |
| `src/routes/index.tsx` | Remove `<Nav />` from page-level (moved into hero) |

No CSS changes needed — uses existing `text-chocolate`, `text-cream`, `bg-berry-deep`, `bg-cream/20`, `backdrop-blur-md` tokens already in the design system.
