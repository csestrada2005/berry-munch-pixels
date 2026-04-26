Plan to update the Instagram polaroid hover effect in `ProductsSection.tsx`:

1. Remove the current hover effect that moves the whole image left/right with `x` translation.
2. Make each Instagram polaroid behave like a shallow 3D card:
   - Track the mouse position inside the image.
   - Rotate the card slightly on the X/Y axes based on where the cursor is.
   - Add a subtle internal image/parallax shift opposite the cursor direction, so when the mouse is near the top-right, the photo content visually shifts left/down instead of the entire object sliding away.
3. Keep the card anchored in place so its layout position does not jump or disturb the products.
4. Preserve the existing scale, shadow, Instagram link, focus accessibility, and scroll entrance animation.
5. Add a smooth reset on mouse leave so the card returns naturally to its resting position.

Technical details:
- Edit only `src/components/berry/ProductsSection.tsx`.
- Add a small reusable `PolaroidCard` helper inside the same file.
- Use Framer Motion motion values/springs (`useMotionValue`, `useSpring`, `useTransform`) for the 3D rotation and internal image shift.
- Set `transformPerspective`/`transformStyle: preserve-3d` on the card and keep hover movement on transforms that do not change layout.
- Replace `whileHover={{ scale: 1.04, x: ... }}` with a cursor-reactive 3D transform.