import { Instagram, Plus } from "lucide-react";
import chocolatePourCup from "@/assets/chocolate-pour-cup.png";
import strawberriesFloating from "@/assets/strawberries-floating.png";
import pistachioCup from "@/assets/pistachio-cup.png";

const flavors = [
  { label: "Lotus", rotate: -18, top: "28%", left: "6%" },
  { label: "Pistache", rotate: 12, top: "20%", right: "8%" },
  { label: "Bombones", rotate: -8, top: "55%", left: "4%" },
  { label: "Pretzels", rotate: 15, top: "60%", right: "6%" },
  { label: "Mazapan", rotate: -22, top: "78%", left: "12%" },
  { label: "Nuez", rotate: 18, top: "82%", right: "14%" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-berry text-cream pt-28 pb-20">
      {/* Floating strawberries background */}
      <img
        src={strawberriesFloating}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
      />

      {flavors.map((f) => (
        <span
          key={f.label}
          className="hidden md:block absolute font-display italic text-cream/80 text-2xl select-none z-10"
          style={{
            top: f.top,
            left: f.left,
            right: f.right,
            transform: `rotate(${f.rotate}deg)`,
          }}
        >
          {f.label}
        </span>
      ))}

      <div className="relative mx-auto max-w-6xl px-6 text-center z-10">
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight">
          Berry Munch
        </h1>

        <div className="mt-8 relative">
          <p className="font-display font-black text-stroke text-cream/50 text-5xl md:text-7xl lg:text-8xl tracking-wider select-none leading-none">
            THE BERRY SWEET
          </p>

          <div className="relative mx-auto mt-[-4rem] flex justify-center">
            <img
              src={chocolatePourCup}
              alt="Chocolate vertiéndose en un vaso Berry Munch"
              className="w-64 md:w-80 lg:w-96 drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Featured product card */}
        <div className="mt-10 md:mt-0 md:absolute md:right-4 md:bottom-0 mx-auto md:mx-0 max-w-xs">
          <div className="rounded-2xl bg-cream text-chocolate p-4 shadow-2xl">
            <img
              src={pistachioCup}
              alt="Dubai Pistachio Strawberry"
              className="aspect-square w-full object-contain mb-3"
            />
            <p className="font-display font-semibold text-sm">Dubai Pistachio Strawberry</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-bold text-berry">$140.0</span>
              <button
                aria-label="Añadir"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-berry text-cream transition-transform hover:scale-110"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="absolute bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-berry transition-transform hover:scale-110"
      >
        <Instagram size={22} />
      </a>
    </section>
  );
}
