import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/berry/HeroSection";
import { AboutSection } from "@/components/berry/AboutSection";
import { ProductsSection } from "@/components/berry/ProductsSection";
import { LoyaltyFooter } from "@/components/berry/LoyaltyFooter";
import { Marquee } from "@/components/berry/Marquee";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Berry Munch — The Berry Sweet" },
      {
        name: "description",
        content:
          "Fresas frescas con chocolate belga premium. Descubre nuestros sabores: Lotus, Pistache, Bombones, Pretzels, Mazapán y más.",
      },
      { property: "og:title", content: "Berry Munch — The Berry Sweet" },
      {
        property: "og:description",
        content: "Fresas frescas con chocolate belga premium.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProductsSection />
      <Marquee />
      <AboutSection />
      <LoyaltyFooter />
    </main>
  );
}
