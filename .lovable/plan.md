

# Berry Munch Landing Page

A single-scrolling landing page matching the Figma design, with three main sections plus a functional loyalty form.

## What you'll get

**Section 1 — Hero (deep red)**
- Top nav: Productos · Pedir · Sucursal (smooth-scroll anchors) on a cream pill bar
- Big serif "Berry Munch" wordmark with strawberry logo
- "Mi Cuenta" rounded outline button
- Floating chocolate splash + strawberries + featured product card ("Dubai Pistachio Strawberry $140.0" with + button)
- Decorative rotated flavor labels (Lotus, Pistache, Bombones, Pretzels, Mazapan, Nuez)
- Outlined display text "THE BERRY SWEET" behind the central cup
- Instagram icon bottom-right

**Section 2 — ¿Quiénes Somos? (cream)**
- Chocolate-drip border at top
- Receipt graphic with "The Berry Best!" stamp
- Strawberry cup with annotation callouts (Deep red, 100% disinfected, Flawless, Fresh)
- Two polaroid photos (market display + happy customers)
- Spanish brand description copy

**Section 3 — Marquee strip + Products (deep red)**
- Scrolling/static marquee: "picked STRAWBERRIES & BELGIUM CHOCOLATE for those WHO taste WITH their IDEA"
- "NUESTROS BERRY BESTS" heading
- 4 product cards (all "Dubai Pistachio Strawberry $140.0" placeholder, swap later)
- "se me antojan" CTA button

**Section 4 — Footer (strawberry photo bg)**
- "Berry Munch" script wordmark
- **Functional Loyalty Program form** (Nombres, Email, Comentarios → stored in Lovable Cloud) with toast confirmation
- Ubicación + Contáctanos + social icons
- Copyright 2026

## Technical approach

- **Stack**: TanStack Start, single route `src/routes/index.tsx`, smooth-scroll via `scroll-mt` + `#anchor`
- **Design tokens** (`src/styles.css`): deep berry red `#7a1818`, cream `#f5ead4`, chocolate `#3d1f10`, gold accent `#c9a24a`. Fonts: serif display (Playfair Display) + script (Great Vibes for "Berry Munch" footer wordmark) + sans body (Inter), loaded via Google Fonts in `__root.tsx`
- **Components** (`src/components/berry/`): `Nav`, `HeroSection`, `AboutSection`, `ProductsSection`, `LoyaltyFooter`, `ProductCard`, `Marquee`, `ChocolateDrip` (SVG)
- **Loyalty form**: Lovable Cloud enabled → `loyalty_signups` table (id, name, email, comments, created_at) with public INSERT RLS policy; submit via Supabase client with toast feedback
- **Images**: I'll wait for your uploads before generating — once you send them I'll copy into `src/assets/` and wire them in. In the meantime I'll build the layout with neutral placeholders so structure is correct
- **Responsive**: Mobile stacks vertically; product grid 1→2→4 cols; nav collapses to hamburger under `md`
- **SEO**: `head()` on index with title "Berry Munch — The Berry Sweet", Spanish description, og tags

## What I still need from you

Please upload these images (drag into chat):
1. Chocolate splash PNG (hero)
2. Strawberry cup with chocolate (hero center)
3. Featured product card image (pistachio cup with hand)
4. Receipt graphic (about section)
5. Strawberry cup "Berries before Worries" (about section)
6. Two polaroid photos (about section)
7. 4 product cup cutouts (products section)
8. Strawberry/chocolate background photo (footer)
9. Berry Munch logo with strawberry (if you have a vector/PNG)

I'll start building the layout and styles immediately, then drop your images in once they arrive.

