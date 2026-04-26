I’ll fix `src/components/berry/AboutSection.tsx` only, keeping the layout and other components unchanged.

Plan:
1. Fix the transform conflict causing the title/paragraph to appear in the wrong position and overlap.
   - Move the absolute centering (`left: 50%`, `top: 50%`, `translate(-50%, -50%)`) onto stable wrapper elements.
   - Keep Framer Motion’s animated `y`, `scale`, and `opacity` on inner elements so it no longer overrides the centering transform.

2. Keep the paragraph hidden until the title actually starts moving upward.
   - Preserve the explicit initial hidden state for the paragraph.
   - The paragraph will fade in only during the title’s upward movement, not before.

3. Make the cup image reveal reliably after the title + paragraph stage.
   - Shorten the text hold/fade timing so the cup starts appearing earlier in the sticky section.
   - Ensure the title and paragraph fade out before/while the cup appears, so the cup is visible instead of being blocked by text.

Technical target:
- Title/paragraph entrance: around `0.20–0.45`.
- Text hold: around `0.45–0.60`.
- Text fade out: around `0.60–0.72`.
- Cup reveal: around `0.68–0.88`, giving enough scroll distance before the sticky section ends.

Result:
- No paragraph visible before the title moves.
- No overlapping centered text like in the screenshot.
- The cup image appears when scrolling after the text/title have been shown.