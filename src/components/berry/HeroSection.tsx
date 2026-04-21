import { Instagram, Plus } from "lucide-react";
import chocolatePourCup from "@/assets/chocolate-pour-cup.png";
import berriesCup from "@/assets/chocolate-berry-cup.png";
import strawberriesFloating from "@/assets/strawberries-floating.png";
import pistachioCup from "@/assets/pistachio-cup.png";
import berryMunchLogo from "@/assets/berry-munch-logo.png";

const flavors = [
  { label: "Lotus", rotate: -14, top: "58%", left: "8%", className: "" },
  { label: "Pistache", rotate: -8, top: "62%", left: "26%", className: "text-gold font-script not-italic text-4xl" },
  { label: "Bombones", rotate: -6, top: "72%", left: "12%", className: "" },
  { label: "Pretzels", rotate: 10, top: "60%", right: "22%", className: "" },
  { label: "Mazapán", rotate: 14, top: "70%", right: "8%", className: "" },
  { label: "Nuez", rotate: -10, top: "82%", right: "16%", className: "" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[480px] md:min-h-[540px] lg:min-h-[600px] overflow-hidden bg-berry text-cream pt-4 pb-12">
      {/* Floating strawberries surrounding the cup */}
      <img
        src={strawberriesFloating}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 bottom-0 w-[40rem] md:w-[52rem] lg:w-[62rem] -translate-x-1/2 z-10 select-none"
      />

      {/* Wordmark — left aligned */}
      <div className="relative z-40 mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-start">
          <img
            src={berryMunchLogo}
            alt="Berry Munch"
            className="w-88 md:w-[28rem] lg:w-[32rem] h-auto"
          />

          <a
            href="#cuenta"
            className="mt-4 inline-flex items-center rounded-full border-2 border-cream px-5 py-1.5 text-xs font-medium uppercase tracking-wider text-cream transition-colors hover:bg-cream hover:text-berry"
          >
            Mi Cuenta
          </a>
        </div>
      </div>

      {/* Chocolate splash — top right arcing */}
      <img
        src={chocolatePourCup}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[55%] md:w-[42%] lg:w-[38%] z-30 -translate-y-2"
      />

      {/* Pistachio product card — upper right */}
      <div className="relative md:absolute md:top-[42%] md:right-6 lg:right-12 z-40 mx-auto md:mx-0 mt-6 md:mt-0 max-w-[170px] px-6 md:px-0">
        <div className="rounded-2xl bg-cream text-chocolate p-3 shadow-2xl">
          <img
            src={pistachioCup}
            alt="Dubai Pistachio Strawberry"
            className="aspect-square w-full object-contain mb-2"
          />
          <p className="font-display font-semibold text-xs leading-tight">Dubai Pistachio Strawberry</p>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="font-bold text-berry text-sm">$140.0</span>
            <button
              aria-label="Añadir"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-berry text-cream transition-transform hover:scale-110"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Outlined "THE BERRY SWEET" with cup centered behind */}
      <div className="absolute bottom-16 md:bottom-14 left-0 right-0 z-10 px-4">
        <p className="font-display font-black text-stroke text-cream/60 text-4xl md:text-6xl lg:text-7xl tracking-wider select-none leading-none text-center whitespace-nowrap">
          THE BERRY SWEET
        </p>
      </div>

      {/* Center berry cup — in front of outlined text */}
      <img
        src={berriesCup}
        alt="Vaso de fresas con chocolate Berry Munch"
        className="absolute bottom-[80px] md:bottom-[110px] left-1/2 w-[28rem] md:w-[36rem] lg:w-[42rem] z-20 drop-shadow-2xl"
        style={{ transform: "translateX(-50%) rotate(-12deg)" }}
      />

      {/* Flavor labels */}
      {flavors.map((f) => (
        <span
          key={f.label}
          className={`hidden md:block absolute font-display italic text-cream/85 text-lg select-none z-40 ${f.className}`}
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

      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="absolute bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-berry transition-transform hover:scale-110"
      >
        <Instagram size={22} />
      </a>
    </section>
  );
}
