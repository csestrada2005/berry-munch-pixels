import { useEffect, useRef, useState } from "react";
import { Marquee } from "./Marquee";
import { Tilt } from "./fx/Tilt";
import { ConfettiBurst } from "./fx/ConfettiBurst";
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

const heading = "NUESTROS BERRY BESTS";

export function ProductsSection() {
  const [bursts, setBursts] = useState<Record<number, boolean>>({});
  const [floats, setFloats] = useState<Array<{ id: number; pid: number }>>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);
  const floatId = useRef(0);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setHeadingVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function handleAdd(pid: number) {
    setBursts((b) => ({ ...b, [pid]: true }));
    const id = ++floatId.current;
    setFloats((f) => [...f, { id, pid }]);
    setTimeout(() => {
      setBursts((b) => ({ ...b, [pid]: false }));
      setFloats((f) => f.filter((x) => x.id !== id));
    }, 800);
  }

  return (
    <section id="productos" className="bg-berry text-cream scroll-mt-24">
      <Marquee />

      <div id="pedir" className="mx-auto max-w-6xl px-6 py-20 scroll-mt-24">
        <h2
          ref={headingRef}
          className={`text-center font-display text-4xl md:text-6xl font-bold mb-20 tracking-wide ${headingVisible ? "animate-letter-drop" : ""}`}
          aria-label={heading}
        >
          {headingVisible
            ? heading.split("").map((c, i) => (
                <span key={i} style={{ animationDelay: `${i * 35}ms` }}>
                  {c === " " ? "\u00A0" : c}
                </span>
              ))
            : <span style={{ opacity: 0 }}>{heading}</span>}
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {products.map((p) => (
            <Tilt key={p.id} className="relative pt-28 md:pt-32 group">
              <div className="relative rounded-2xl bg-white/5 ring-2 ring-white pt-20 md:pt-24 shadow-xl transition-shadow duration-300 group-hover:shadow-2xl">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 80 40"
                  className={`absolute ${p.sparkleClass} left-1/2 -translate-x-1/2 w-16 md:w-20 h-8 md:h-10 text-cream pointer-events-none animate-twinkle`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                >
                  <line x1="14" y1="30" x2="6" y2="10" />
                  <line x1="40" y1="28" x2="40" y2="4" />
                  <line x1="66" y1="30" x2="74" y2="10" />
                </svg>

                <img
                  src={p.image}
                  alt={p.name}
                  className={`absolute ${p.topClass} left-1/2 -translate-x-1/2 ${p.imgClass} w-auto object-contain drop-shadow-2xl pointer-events-none rotate-6 md:rotate-[8deg] z-10 transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110`}
                />

                <div className="h-20 md:h-24" />

                <div className="rounded-b-2xl bg-cream text-chocolate px-4 py-5 text-center relative">
                  <p className="font-display font-bold text-sm md:text-base uppercase leading-tight tracking-wide">
                    {p.name}
                  </p>
                  <p className="mt-2 font-bold text-base md:text-lg text-[oklch(0.55_0.15_145)] transition-transform duration-300 group-hover:scale-110 inline-block">
                    {p.price}
                  </p>
                  <ConfettiBurst show={!!bursts[p.id]} />
                  {floats
                    .filter((f) => f.pid === p.id)
                    .map((f) => (
                      <span
                        key={f.id}
                        className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 font-bold text-berry text-lg"
                        style={{
                          animation: "float-up 0.8s ease-out forwards",
                        }}
                      >
                        +1
                      </span>
                    ))}
                  <button
                    onClick={() => handleAdd(p.id)}
                    aria-label={`Añadir ${p.name}`}
                    className="mt-3 inline-flex items-center justify-center rounded-full bg-berry px-4 py-1.5 text-cream text-sm font-bold transition-transform hover:scale-110 active:scale-90"
                  >
                    + Añadir
                  </button>
                </div>
              </div>
            </Tilt>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#loyalty"
            className="hover-jiggle inline-flex items-center rounded-full bg-cream px-8 py-3 font-display italic text-lg text-berry transition-transform"
          >
            se me antojan <span className="ml-2 animate-arrow">→</span>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes float-up {
          0% { transform: translate(-50%, 0); opacity: 1; }
          100% { transform: translate(-50%, -40px); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
