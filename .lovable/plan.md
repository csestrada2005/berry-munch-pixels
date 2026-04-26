I analyzed `ProductsSection.tsx` and the key difference is that it does not rely only on overlapping continuous opacity transforms for major scene changes. It derives an `activeView` from `scrollYProgress` with `useMotionValueEvent`, then each scene is explicitly shown/hidden with `animate`, `pointerEvents`, and stable absolute positioning.

Problem in `AboutSection.tsx`:
- The paragraph still uses continuous opacity transforms, so it can become visible while the title is still visually centered.
- The cup reveal still has Framer Motion transform values on the same element that also uses Tailwind translate-centering classes, so the centering transform can be overridden and the image can appear off-position/clipped.
- The title movement distance is too small for the paragraph position, so even when the title starts moving they still visually collide.

Fix plan for `src/components/berry/AboutSection.tsx` only:
1. Convert the About flow to the same robust stage approach used in `ProductsSection.tsx`.
   - Add `useState` + `useMotionValueEvent`.
   - Track stages from scroll progress:
     - Stage 0: title centered only.
     - Stage 1: title moves up and paragraph fades in.
     - Stage 2: title + paragraph hold fully visible.
     - Stage 3: text fades out and cup appears.

2. Keep all centering transforms on wrapper divs, not animated elements.
   - Wrapper handles `left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`.
   - Motion children handle only `opacity`, `y`, and `scale`.
   - Apply this to title, paragraph, and cup.

3. Increase the title’s upward movement so it clears the paragraph.
   - Move the title higher than the current `-160`, so the paragraph cannot overlap it while entering.

4. Reveal the cup reliably after the text stage.
   - Cup wrapper remains centered in the right column.
   - Cup animates in with `opacity`, `scale`, and small `y` movement after the text has been readable.

Expected result:
- Paragraph is fully hidden while the title is centered.
- Paragraph only appears once the title is actually moving/has moved upward.
- Title and paragraph are readable without collision.
- The cup image appears in the right column after the text/title stage.