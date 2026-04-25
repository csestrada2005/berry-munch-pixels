I found the core issue in `AboutSection.tsx`: the right column is ordered first on the current viewport because the layout only switches to two columns at `md`. At the user’s current width (~811px), the breakpoint is not reliably giving the intended left-collage/right-content layout, so the full-height collage is visually taking over the section. On top of that, the cup image is in the same exact center position as the title/text with high z-index, so when its opacity begins it can cover the text instead of appearing as the final stage in a controlled sequence.

Plan to fix it:

1. Stabilize the section layout
   - Force the About section to use a two-column sticky layout earlier, instead of waiting for the `md` breakpoint.
   - Keep the collage locked on the left and the animated title/text/cup stage on the right for tablet-sized viewports like the current 811px preview.
   - Make the collage fill the available vertical space without pushing/covering the right content.

2. Rebuild the scroll sequence into three clear stages
   - Stage 1: only `¿Quiénes Somos?` visible.
   - Stage 2: title moves upward and stays above the paragraph; then `En Berrymunch, diseñamos...` fades in later.
   - Stage 3: title and paragraph fade out completely, then `berries-cup.png` fades/scales into the right content area.

3. Fix the cup image visibility
   - Move the cup image into its own final-stage layer in the right column.
   - Ensure it is not hidden by layout sizing or ending after the sticky section is already done.
   - Make it appear earlier and remain visible long enough before the sticky flow ends.

4. Visual verification after implementation
   - Use the preview at the same approximate viewport size as the user.
   - Check the beginning, middle, and end of the About scroll flow.
   - Confirm: first only title, then delayed paragraph, then both disappear, then cup image appears on the right while the collage remains fixed on the left.