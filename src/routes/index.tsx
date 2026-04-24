import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/berry/HeroSection";
import { AboutSection } from "@/components/berry/AboutSection";
import { ProductsSection } from "@/components/berry/ProductsSection";
import { BerriesGallery } from "@/components/berry/BerriesGallery";
import { LoyaltyFooter } from "@/components/berry/LoyaltyFooter";
import { Marquee } from "@/components/berry/Marquee";
import { Nav } from "@/components/berry/Nav";

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
  if (typeof window !== "undefined") {
    setTimeout(() => {
      console.log("[debug] doc scrollHeight:", document.documentElement.scrollHeight, "viewport:", window.innerHeight);
      const products = document.getElementById("productos");
      const gallery = document.getElementById("berries-gallery");
      console.log("[debug] products section height:", products?.getBoundingClientRect().height);
      console.log("[debug] gallery section height:", gallery?.getBoundingClientRect().height);
      const ptrack = products?.querySelector(":scope > div");
      const gtrack = gallery?.querySelector(":scope > div");
      console.log("[debug] products track height:", (ptrack as HTMLElement)?.getBoundingClientRect().height);
      console.log("[debug] gallery track height:", (gtrack as HTMLElement)?.getBoundingClientRect().height);
    }, 1500);
  }
  return (
    <main className="min-h-screen">
      <Nav />
      <HeroSection />
      <ProductsSection />
      <Marquee />
      <AboutSection />
      <BerriesGallery />
      <LoyaltyFooter />
    </main>
  );
}
