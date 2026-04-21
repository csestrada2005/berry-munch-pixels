import { Plus } from "lucide-react";
import { Marquee } from "./Marquee";

const products = Array.from({ length: 4 }).map((_, i) => ({
  id: i,
  name: "Dubai Pistachio Strawberry",
  price: "$140.0",
}));

export function ProductsSection() {
  return (
    <section id="productos" className="bg-berry text-cream scroll-mt-24">
      <Marquee />

      <div id="pedir" className="mx-auto max-w-6xl px-6 py-20 scroll-mt-24">
        <h2 className="text-center font-display text-4xl md:text-6xl font-bold mb-12">
          NUESTROS BERRY BESTS
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl bg-cream text-chocolate p-4 shadow-xl transition-transform hover:-translate-y-1"
            >
              <div className="aspect-square rounded-xl bg-berry/10 flex items-center justify-center text-5xl mb-3">
                🥤
              </div>
              <p className="font-display font-semibold text-sm">{p.name}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold text-berry">{p.price}</span>
                <button
                  aria-label={`Añadir ${p.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-berry text-cream transition-transform hover:scale-110"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
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
