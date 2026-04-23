
# Match the Charlie's Organics Rectangle Style

## What I see in your reference

The orange rectangle in Charlie's Organics is **NOT** a morphing blob — it's a clean, mostly straight rectangle with **hand-drawn / torn paper edges**. The character:

- Edges are **slightly wavy and irregular**, like cut with scissors or torn — but the overall shape stays a firm rectangle
- A subtle **rough/grainy paper texture** overlay inside (visible noise/specks)
- **No animation** — it's static and grounded
- Soft, organic, illustrative — feels like a sticker pasted on the page

Right now your hero uses an **animated morphing blob** with breathing curves on every corner. That's the opposite vibe — yours feels liquid and alive, theirs feels like torn craft paper.

## Approach

Replace the `.morph-blob` animated rounded shape with a **static SVG-mask "torn edge" rectangle** plus a **subtle grain texture overlay**.

### 1. Torn-edge mask
Use a CSS `mask-image` with an inline SVG that draws a rectangle with **slightly jagged/wavy edges on all four sides** (small random-looking peaks every ~40-60px, amplitude ~6-10px). This clips the video to that exact shape — straight overall, irregular at the borders. No animation.

### 2. Grain/paper texture
Add a thin overlay div on top of the video with:
- A subtle SVG noise filter (`feTurbulence` → `feColorMatrix`) at very low opacity (~8-12%)
- `mix-blend-mode: multiply` so it tints the video surface like a paper grain

### 3. Remove the morphing animation
- Drop `.morph-blob` and `.morph-glow` from the video container and halo
- Remove `animate-breathe` from the video itself (the saturation pulse) — or keep it, your call; the reference is fully static so I'd remove it for fidelity

### 4. Keep the halo (optional)
Replace the morphing blurred halo with a simple soft drop-shadow on the masked element (`filter: drop-shadow(...)`) so the torn-edge silhouette casts a real shadow matching its outline.

## Files touched

| File | Change |
|---|---|
| `src/styles.css` | Add `.torn-edge` utility (SVG mask-image with jagged border path) + `.paper-grain` overlay utility (SVG noise data URL, multiply blend, low opacity). Keep `.morph-blob` available but unused — or remove. Remove/disable `animate-breathe` if you want full static fidelity. |
| `src/components/berry/HeroSection.tsx` | Replace `morph-blob` classes on the video container and halo with `torn-edge`. Add a `<div className="paper-grain absolute inset-0 pointer-events-none" />` inside the video container above the video. Switch the halo to a `drop-shadow` filter approach (or remove it — Charlie's has no glow). |

## Visual result

```text
┌╮╱╲╮╱─╮╱╲─╮╱╲─╮╱╲╮  ← slightly jagged top edge
│                  │
│     [VIDEO]      │  ← clean rectangle body
│   + grain noise  │     with subtle paper grain
│                  │
└╮╱╲─╮╱╲╮╱─╮╱╲╮╱╲─┘  ← jagged bottom edge
```

Static, grounded, paper-craft feel — matching Charlie's exactly.
