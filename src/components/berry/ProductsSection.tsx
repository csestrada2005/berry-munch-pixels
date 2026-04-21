import { Marquee } from "./Marquee";
import cup1 from "@/assets/cup1.png";
import cup2 from "@/assets/cup2.png";
import cup3 from "@/assets/cup3.png";
import cup6 from "@/assets/cup6.png";

const products = [
  { id: 1, name: "Dubai Pistachio Strawberry", price: "$ 140.0", image: cup1, imgClass: "h-44 md:h-52 lg:h-56", topClass: "-top-16 md:-top-20", sparkleClass: "-top-32 md:-top-36" },
  { id: 2, name: "Dubai Pistachio Strawberry", price: "$ 140.0", image: cup2, imgClass: "h-44 md:h-52 lg:h-56", topClass: "-top-16 md:-top-20", sparkleClass: "-top-32 md:-top-36" },
  { id: 3, name: "Dubai Pistachio Strawberry", price: "$ 140.0", image: cup3, imgClass: "h-44 md:h-52 lg:h-56", topClass: "-top-16 md:-top-20", sparkleClass: "-top-32 md:-top-36" },
  { id: 4, name: "Berry Marshmallow", price: "$ 140.0", image: cup6, imgClass: "h-32 md:h-36 lg:h-40", topClass: "-top-2 md:-top-1", sparkleClass: "-top-12 md:-top-14" },
];

export function ProductsSection() {
  return (
    <section id="productos" className="bg-berry text-cream scroll-mt-24">
      <Marquee />

      <div id="pedir" className="mx-auto max-w-6xl px-6 py-20 scroll-mt-24">
        <h2 className="text-center font-display text-4xl md:text-6xl font-bold mb-20 tracking-wide">
          NUESTROS BERRY BESTS
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {products.map((p) => (
            <div key={p.id} className="relative pt-28 md:pt-32">
              {/* Card */}
              <div className="relative rounded-2xl bg-white/5 ring-2 ring-white pt-20 md:pt-24 shadow-xl">
                {/* Sparkle lines above the cup */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 80 40"
                  className={`absolute ${p.sparkleClass} left-1/2 -translate-x-1/2 w-16 md:w-20 h-8 md:h-10 text-cream pointer-events-none`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <line x1="14" y1="30" x2="6" y2="10" />
                  <line x1="40" y1="28" x2="40" y2="4" />
                  <line x1="66" y1="30" x2="74" y2="10" />
                </svg>

                {/* Floating cup image escaping the top */}
                <img
                  src={p.image}
                  alt={p.name}
                  className={`absolute ${p.topClass} left-1/2 -translate-x-1/2 ${p.imgClass} w-auto object-contain drop-shadow-2xl pointer-events-none rotate-6 md:rotate-[8deg] z-10`}
                />

                {/* Spacer for the red top half */}
                <div className="h-20 md:h-24" />

                {/* Bottom info panel (cream) — full width, splits the card */}
                <div className="rounded-b-2xl bg-cream text-chocolate px-4 py-5 text-center">
                  <p className="font-display font-bold text-sm md:text-base uppercase leading-tight tracking-wide">
                    {p.name}
                  </p>
                  <p className="mt-2 font-bold text-base md:text-lg text-[oklch(0.55_0.15_145)]">
                    {p.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#loyalty"
            className="inline-flex items-center rounded-full bg-cream px-8 py-3 font-display italic text-lg text-berry transition-transform hover:scale-105"
          >
            se me antojan →
          </a>
        </div>
      </div>
    </section>
  );
}
