

# Hero Section — Match Figma Reference

Restructure `HeroSection.tsx` to mirror the screenshot exactly. Currently the layout is centered with the wordmark on top and the cup hanging below the outlined "THE BERRY SWEET" text. The reference shows a left-aligned wordmark with a chocolate splash arcing across the top-right, and the cup positioned BEHIND the outlined text, with the pistachio card on the upper-right (not bottom-right).

## Layout changes

```text
┌──────────────────────────────────────────────────┐
│         [ Nav pill: Productos · Pedir · Sucursal ]│
│                                                   │
│  Berry🍓                  ╲╱chocolate splash╱╲    │
│  Munch                    ╱  arc top→right    ╲   │
│                              ┌──────────────┐    │
│  ┌─────────┐                 │ pistachio    │    │
│  │ MI      │                 │  cup card    │    │
│  │ CUENTA  │                 │ Dubai Pist.. │    │
│  └─────────┘                 │ $140.0    ⊕  │    │
│                              └──────────────┘    │
│        Lotus      strawberry                      │
│   Pistache    🍓                                  │
│ Bombones    🍓     🍓                             │
│  THE  BE[ 🥤cup ]RY  SWEET   ← outline behind cup │
│   Pretzels  🍓 Mazapán  Nuez                      │
│                                            [ IG ]│
└──────────────────────────────────────────────────┘
```

### Specific edits to `src/components/berry/HeroSection.tsx`

1. **Wordmark** — left-aligned, two stacked lines "Berry" / "Munch" in serif italic, with a small strawberry icon next to "Berry". Add a "MI CUENTA" outlined pill button below the wordmark on the left.
2. **Chocolate splash** (`chocolate-pour-cup.png`) — position absolute, top-right area, large (~60% width on desktop), arcing from top-center toward the right edge. The cup at the bottom of that PNG will overlap the central area.
3. **Pistachio card** — move from bottom-right to upper-right, sitting under the splash's right tail. Keep the card design (cream bg, "Dubai Pistachio Strawberry", $140.0, + button).
4. **"THE BERRY SWEET" outlined text** — large, full-width, positioned in the lower third. The central strawberry cup (`berries-cup.png`) sits in front of/centered on the "BE...RY" gap.
5. **Strawberry cup** — replace the current `chocolatePourCup` center placement with `berries-cup.png` (strawberries cup), centered behind the outlined text.
6. **Floating strawberries** (`strawberries-floating.png`) — keep as full-section background overlay, but tone down opacity so individual strawberries read clearly around the cup.
7. **Flavor labels** — keep all 6 (Lotus, Pistache, Bombones, Pretzels, Mazapan, Nuez) but reposition tighter around the central cup area (mid-to-bottom of section), rotate angles per reference. "Pistache" in gold/accent color italic per reference.
8. **Instagram icon** — keep bottom-right (already correct).
9. **Background** — keep deep berry red.

## Technical notes

- Use absolute positioning within a `relative` hero container with explicit min-height (`min-h-screen` or `min-h-[900px]`).
- Z-index layering: bg strawberries (z-0) → outlined text (z-10) → center cup (z-20) → splash (z-30) → wordmark/card/labels (z-40) → IG icon (z-50).
- Keep responsive: on mobile, stack wordmark → splash+cup → product card → labels become decorative only (hide most).
- No new files needed; only `HeroSection.tsx` is rewritten. Asset imports adjust to use `berries-cup.png` and keep `chocolate-pour-cup.png`, `strawberries-floating.png`, `pistachio-cup.png`.

