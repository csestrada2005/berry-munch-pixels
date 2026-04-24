## Plan

1. Rebuild the products reveal around a single centered content stage
   - Keep the sticky section and background wipes.
   - Add one dedicated product-stage wrapper positioned lower than the title, so cards render in a predictable visual zone instead of using full-screen centering.
   - Move View 1, View 2, and View 3 inside that shared stage so they all occupy the same physical area.

2. Fix the real visibility issue in the first two steps
   - Remove the extra vertical offsets that currently push the first card views out of the intended viewport area.
   - Replace the current `items-start + pt-16` layout with a centered stage layout that keeps the 2-card rows visibly below the title during the red and cream phases.
   - Preserve the current z-index layering so cards always stay above the wipes.

3. Retune the scroll flow so there are no “empty” phases
   - Keep the overall choreography, but slightly overlap the three view opacity ranges so one state remains visible until the next begins.
   - Ensure the sequence is:
     - red phase: first 2 cards
     - cream/white phase: second 2 cards
     - finale: all 4 cards + “Ir a tienda”

4. Keep interaction safe for overlapping views
   - Continue disabling pointer events for hidden views.
   - Keep `LayoutGroup` and `layoutId` removed so Framer Motion does not conflict across always-mounted views.

5. Verify visually after implementation
   - Check the section at the user-like viewport and a desktop viewport.
   - Confirm each scroll step shows the right products in the right order and that no cards are clipped off-screen.

## Technical details

Root causes identified:
- The issue is not only Framer Motion shared-layout misuse; the first two views are also laid out in a way that makes them miss the intended visible zone during the sticky sequence.
- The first/second view wrappers use full-screen absolute containers plus extra top padding, while each card already has its own internal top padding and oversized artwork offsets. That combination makes the early states visually unreliable.
- There are also timing gaps between `view1Opacity`, `view2Opacity`, and `view3Opacity` where no view is fully visible.

Implementation direction:
- Keep current background transforms.
- Refactor the product views into a shared absolute stage, likely centered around the lower-middle of the sticky viewport.
- Adjust only the view layout and opacity timing, not the overall section concept.
- Maintain semantic color tokens already used in the project.