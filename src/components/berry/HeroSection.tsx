import { Instagram, Plus } from "lucide-react";

const flavors = [
  { label: "Lotus", rotate: -18, top: "30%", left: "8%" },
  { label: "Pistache", rotate: 12, top: "22%", right: "10%" },
  { label: "Bombones", rotate: -8, top: "55%", left: "5%" },
  { label: "Pretzels", rotate: 15, top: "62%", right: "7%" },
  { label: "Mazapan", rotate: -22, top: "78%", left: "14%" },
  { label: "Nuez", rotate: 18, top: "82%", right: "16%" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-berry text-cream pt-28 pb-20">
      {/* Decorative flavor labels */}
      {flavors.map((f) => (
        <span
          key={f.label}
          className="hidden md:block absolute font-display italic text-cream/70 text-2xl select-none"
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

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight">
          Berry Munch
        </h1>

        {/* Outlined display text */}
        <div className="mt-12 relative">
          <p className="font-display font-black text-stroke text-cream/40 text-5xl md:text-7xl lg:text-8xl tracking-wider select-none leading-none">
            THE BERRY SWEET
          </p>

          {/* Centerpiece: strawberry cup placeholder */}
          <div className="relative mx-auto mt-[-2rem] flex justify-center">
            <div className="w-48 h-64 md:w-64 md:h-80 rounded-3xl bg-gradient-to-b from-cream/10 to-chocolate/40 border-2 border-cream/20 flex items-center justify-center text-6xl">
              🍓
            </div>
          </div>
        </div>

        {/* Featured product card (floating) */}
        <div className="mt-10 md:mt-0 md:absolute md:right-8 md:bottom-32 mx-auto md:mx-0 max-w-xs">
          <div className="rounded-2xl bg-cream text-chocolate p-4 shadow-2xl">
            <div className="aspect-square rounded-xl bg-berry/10 flex items-center justify-center text-5xl mb-3">
              🥤
            </div>
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
        className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-berry transition-transform hover:scale-110"
      >
        <Instagram size={22} />
      </a>
    </section>
  );
}
