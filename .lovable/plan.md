
# Replace Scalloped Edges with Liquid/Blob Morphism

## What you want (my read)

Right now the video rectangle uses `.scalloped` — a hard, repeating wavy mask that looks like a stamp/cookie edge. You want something more **organic and "morphing"** — soft, blob-like curves that feel alive, similar to liquid glass / metaball morphism. Think: rounded asymmetric corners that gently breathe and shift over time, rather than a fixed zig-zag pattern.

## Approach

Drop the `mask-image` scallop and use **animated `border-radius` morphism** (the "blob" technique) on the video container. Each corner gets its own large, asymmetric radius value that smoothly cycles between several keyframe shapes — producing a continuous liquid-morph effect.

Optionally layer a subtle **glassmorphism frame** around it (blurred berry-tinted halo + soft inner highlight) so the edge feels like it's made of glossy jelly rather than just a clipped rectangle.

## Changes

**`src/styles.css`**
- Remove (or keep unused) `.scalloped`.
- Add `.morph-blob` utility: large asymmetric `border-radius` (e.g. `42% 58% 38% 62% / 45% 40% 60% 55%`) plus a `@keyframes morph` animation that cycles between 3–4 radius shapes over ~14s ease-in-out infinite.
- Add `prefers-reduced-motion` guard to freeze it on the first shape.
- Optional `.morph-glow`: an absolutely-positioned blurred sibling using the same radius + `bg-berry-deep/40 blur-2xl` for a soft halo.

**`src/components/berry/HeroSection.tsx`**
- Swap `className="scalloped ..."` on the video wrapper for `className="morph-blob ..."`.
- Add a soft glow div behind it (`absolute inset-0 -z-10 morph-blob morph-glow`) for the glass halo.
- Keep `overflow-hidden` and `shadow-2xl`.

## Why this works

- `border-radius` animates cheaply on the GPU → stays 60fps.
- Asymmetric percent-based radii produce true blob shapes (not just rounded rectangles).
- No SVG, no mask perf cost, fully responsive — the shape scales with the container at any viewport.
- Logo overlap and floating nav positioning stay untouched.

## Files touched

| File | Change |
|---|---|
| `src/styles.css` | Add `.morph-blob` + `@keyframes morph` + reduced-motion guard |
| `src/components/berry/HeroSection.tsx` | Replace `scalloped` class, add optional glow layer |
