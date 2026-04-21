import { Marquee } from "./Marquee";
import cup1 from "@/assets/cup1.png";
import cup2 from "@/assets/cup2.png";
import cup3 from "@/assets/cup3.png";
import cup4 from "@/assets/cup4.png";

const products = [
  { id: 1, name: "Dubai Pistachio Strawberry", price: "$ 140.0", image: cup1 },
  { id: 2, name: "Dubai Pistachio Strawberry", price: "$ 140.0", image: cup2 },
  { id: 3, name: "Dubai Pistachio Strawberry", price: "$ 140.0", image: cup3 },
  { id: 4, name: "Dubai Pistachio Strawberry", price: "$ 140.0", image: cup4 },
];

export function ProductsSection() {
  return (
    <section id="productos" className="bg-berry text-cream scroll-mt-24">
      <Marquee />

      <div id="pedir" className="mx-auto max-w-6xl px-6 py-20 scroll-mt-24">
        <h2 className="text-center font-display text-4xl md:text-6xl font-bold mb-20 tracking-wide">
          NUESTROS BERRY BESTS
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((p) => (
            <div key={p.id} className="relative pt-24 md:pt-28">
              {/* Card */}
              <div className="relative rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm pt-20 md:pt-24 pb-5 px-4 shadow-xl">
                {/* Floating cup image escaping the top */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute -top-20 md:-top-24 left-1/2 -translate-x-1/2 h-44 md:h-56 w-auto object-contain drop-shadow-2xl pointer-events-none"
                />

                {/* Bottom info panel (cream) */}
                <div className="rounded-xl bg-cream text-chocolate px-3 py-3 text-center">
                  <p className="font-display font-bold text-xs md:text-sm uppercase leading-tight tracking-wide">
                    {p.name}
                  </p>
                  <p className="mt-2 font-bold text-sm md:text-base text-[oklch(0.55_0.15_145)]">
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
