import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, LayoutGroup } from "framer-motion";

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

export function ProductsSection() {
  const [bursts, setBursts] = useState<Record<number, boolean>>({});
  const [floats, setFloats] = useState<Array<{ id: number; pid: number }>>([]);
  const floatId = useRef(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Choreography:
  //  0    → 0.18 : Cream canvas scales up
  //  0.18 → 0.28 : Title slides into vertical center
  //  0.30 → 0.40 : Title moves up to top
  //  0.36 → 0.46 : Berry-red wipe expands → screen turns RED
  //  0.40 → 0.52 : View 1 — first 2 cards on RED
  //  0.52 → 0.58 : Cream-soft panel wipes back → CREAM
  //  0.58 → 0.70 : View 2 — second 2 cards on CREAM
  //  0.76 → 1.00 : View 3 — finale, all 4 cards in grid + CTA
  const canvasScale = useTransform(scrollYProgress, [0, 0.18], [0.35, 1]);
  const canvasRadius = useTransform(scrollYProgress, [0, 0.18], [48, 0]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);
  const canvasTransform = useMotionTemplate`translate3d(-50%, -50%, 0) scale3d(${canvasScale}, ${canvasScale}, 1)`;

  const titleY = useTransform(scrollYProgress, [0.18, 0.28, 0.30, 0.40], [80, 0, 0, -34]);
  const titleOpacity = useTransform(scrollYProgress, [0.16, 0.22], [0, 1]);
  const titleTransform = useMotionTemplate`translate3d(-50%, ${titleY}vh, 0)`;
  const titleColor = useTransform(
    scrollYProgress,
    [0.40, 0.46, 0.56, 0.62],
    ["#000000", "var(--cream)", "var(--cream)", "#000000"],
  );

  const wipeScale = useTransform(scrollYProgress, [0.36, 0.46], [0, 40]);
  const wipeTransform = useMotionTemplate`translate3d(-50%, -50%, 0) scale3d(${wipeScale}, ${wipeScale}, 1)`;

  const panelScale = useTransform(scrollYProgress, [0.52, 0.62], [0, 40]);
  const panelTransform = useMotionTemplate`translate3d(-50%, -50%, 0) scale3d(${panelScale}, ${panelScale}, 1)`;

  // View opacities — three overlapping views.
  const view1Opacity = useTransform(scrollYProgress, [0.40, 0.46, 0.50, 0.55], [0, 1, 1, 0]);
  const view2Opacity = useTransform(scrollYProgress, [0.58, 0.64, 0.70, 0.74], [0, 1, 1, 0]);
  const view3Opacity = useTransform(scrollYProgress, [0.76, 0.84], [0, 1]);

  // CTA — appears with finale.
  const ctaOpacity = useTransform(scrollYProgress, [0.86, 0.94], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.86, 0.94], [40, 0]);

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
      <div ref={trackRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* z-0 — Cream canvas */}
          <motion.div
            aria-hidden="true"
            style={{
              opacity: canvasOpacity,
              borderRadius: canvasRadius,
              transform: canvasTransform,
              willChange: "transform",
            }}
            className="absolute left-1/2 top-1/2 z-0 h-screen w-screen bg-cream origin-center pointer-events-none"
          />

          {/* z-10 — Berry red wipe */}
          <motion.span
            aria-hidden="true"
            style={{
              transform: wipeTransform,
              willChange: "transform",
              backgroundColor: "var(--berry)",
            }}
            className="absolute left-1/2 top-1/2 z-10 w-[120px] h-[120px] rounded-full pointer-events-none"
          />

          {/* z-20 — Cream-soft panel wipe */}
          <motion.span
            aria-hidden="true"
            style={{
              transform: panelTransform,
              willChange: "transform",
              backgroundColor: "var(--cream-soft)",
            }}
            className="absolute left-1/2 top-1/2 z-20 w-[120px] h-[120px] rounded-full pointer-events-none"
          />

          {/* z-40 — Title */}
          <motion.h2
            style={{
              transform: titleTransform,
              opacity: titleOpacity,
              color: titleColor,
              willChange: "transform, opacity, color",
            }}
            className="absolute left-1/2 top-1/2 z-40 font-display font-bold text-3xl md:text-5xl tracking-wide text-center whitespace-nowrap pointer-events-none"
          >
            NUESTROS BERRY BESTS
          </motion.h2>

          {/* z-50 — Product views (always above wipes) */}
          <LayoutGroup>
            {/* View 1 — first 2 cards (RED phase) */}
            <motion.div
              style={{ opacity: view1Opacity, willChange: "opacity" }}
              className="absolute inset-0 z-50 flex items-center justify-center px-6 pointer-events-auto"
            >
              <div className="flex justify-center items-start gap-6 md:gap-10 w-full max-w-4xl mx-auto pt-16">
                {products.slice(0, 2).map((p) => (
                  <motion.div
                    key={p.id}
                    layoutId={`product-card-${p.id}`}
                    className="w-1/2 max-w-xs"
                  >
                    {renderCard(p, bursts, floats, handleAdd)}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* View 2 — second 2 cards (CREAM phase) */}
            <motion.div
              style={{ opacity: view2Opacity, willChange: "opacity" }}
              className="absolute inset-0 z-50 flex items-center justify-center px-6 pointer-events-auto"
            >
              <div className="flex justify-center items-start gap-6 md:gap-10 w-full max-w-4xl mx-auto pt-16">
                {products.slice(2, 4).map((p) => (
                  <motion.div
                    key={p.id}
                    layoutId={`product-card-${p.id}`}
                    className="w-1/2 max-w-xs"
                  >
                    {renderCard(p, bursts, floats, handleAdd)}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* View 3 — finale, all 4 in grid + CTA */}
            <motion.div
              id="pedir"
              style={{ opacity: view3Opacity, willChange: "opacity" }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center px-6 pointer-events-auto"
            >
              <div className="w-full max-w-6xl mx-auto pt-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                  {products.map((p) => (
                    <motion.div
                      key={p.id}
                      layoutId={`product-card-${p.id}`}
                    >
                      {renderCard(p, bursts, floats, handleAdd)}
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  style={{
                    opacity: ctaOpacity,
                    y: ctaY,
                    willChange: "transform, opacity",
                  }}
                  className="mt-10 text-center"
                >
                  <a
                    href="#loyalty"
                    className="hover-jiggle inline-flex items-center rounded-full bg-berry px-8 py-3 font-display italic text-lg text-cream transition-transform"
                  >
                    Ir a tienda <span className="ml-2 animate-arrow">→</span>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </LayoutGroup>
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

function renderCard(
  p: typeof products[number],
  bursts: Record<number, boolean>,
  floats: Array<{ id: number; pid: number }>,
  handleAdd: (pid: number) => void,
) {
  return (
    <Tilt key={p.id} className="relative pt-24 md:pt-28 group">
      <div className="relative rounded-2xl bg-berry/5 ring-2 ring-berry pt-16 md:pt-20 shadow-xl transition-shadow duration-300 group-hover:shadow-2xl">
        <svg
          aria-hidden="true"
          viewBox="0 0 80 40"
          className={`absolute ${p.sparkleClass} left-1/2 -translate-x-1/2 w-16 md:w-20 h-8 md:h-10 text-berry pointer-events-none animate-twinkle`}
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

        <div className="h-16 md:h-20" />

        <div className="rounded-b-2xl bg-cream-soft text-chocolate px-4 py-4 text-center relative">
          <p className="font-display font-bold text-xs md:text-sm uppercase leading-tight tracking-wide">
            {p.name}
          </p>
          <p className="mt-1 font-bold text-sm md:text-base text-[oklch(0.55_0.15_145)] transition-transform duration-300 group-hover:scale-110 inline-block">
            {p.price}
          </p>
          {floats
            .filter((f) => f.pid === p.id)
            .map((f) => (
              <span
                key={f.id}
                className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 font-bold text-berry text-lg"
                style={{ animation: "float-up 0.8s ease-out forwards" }}
              >
                +1
              </span>
            ))}
          <div className="relative inline-block mt-2">
            <ConfettiBurst show={!!bursts[p.id]} />
            <button
              onClick={() => handleAdd(p.id)}
              aria-label={`Añadir ${p.name}`}
              className="inline-flex items-center justify-center rounded-full bg-berry px-4 py-1.5 text-cream text-xs md:text-sm font-bold transition-transform hover:scale-110 active:scale-90"
            >
              + Añadir
            </button>
          </div>
        </div>
      </div>
    </Tilt>
  );
}
