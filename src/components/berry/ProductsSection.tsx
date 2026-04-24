import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

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
  const [activeView, setActiveView] = useState<0 | 1 | 2 | 3>(0);
  const floatId = useRef(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Choreography (no intro square — section starts on cream):
  //  0.00 → 0.08 : Title fades/slides into vertical center
  //  0.08 → 0.20 : View 1 — first 2 cards on CREAM (with title)
  //  0.20 → 0.32 : Berry-red wipe expands → screen turns RED
  //  0.28 → 0.50 : View 2 — second 2 cards on RED
  //  0.50 → 0.62 : Cream-soft panel wipes back → CREAM
  //  0.62 → 1.00 : View 3 — finale, all 4 cards + CTA on CREAM
  const titleY = useTransform(scrollYProgress, [0, 0.08, 0.18, 0.28], [40, 0, 0, -30]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const titleTransform = useMotionTemplate`translate3d(-50%, ${titleY}vh, 0)`;
  const titleColor = useTransform(
    scrollYProgress,
    [0.24, 0.32, 0.54, 0.62],
    ["#000000", "var(--cream)", "var(--cream)", "#000000"],
  );

  const wipeScale = useTransform(scrollYProgress, [0.20, 0.32], [0, 40]);
  const wipeTransform = useMotionTemplate`translate3d(-50%, -50%, 0) scale3d(${wipeScale}, ${wipeScale}, 1)`;

  const panelScale = useTransform(scrollYProgress, [0.50, 0.62], [0, 40]);
  const panelTransform = useMotionTemplate`translate3d(-50%, -50%, 0) scale3d(${panelScale}, ${panelScale}, 1)`;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // View 1 starts immediately (with title), View 2 after red wipe, View 3 after cream wipe.
    const nextView: 0 | 1 | 2 | 3 =
      latest < 0.06 ? 0 : latest < 0.28 ? 1 : latest < 0.62 ? 2 : 3;
    setActiveView((current) => (current === nextView ? current : nextView));
  });

  const handleAdd = useCallback((pid: number) => {
    setBursts((b) => ({ ...b, [pid]: true }));
    const id = ++floatId.current;
    setFloats((f) => [...f, { id, pid }]);
    setTimeout(() => {
      setBursts((b) => ({ ...b, [pid]: false }));
      setFloats((f) => f.filter((x) => x.id !== id));
    }, 800);
  }, []);

  return (
    <section id="productos" className="relative z-20 bg-berry text-cream scroll-mt-24">
      <div ref={trackRef} className="relative h-[400vh]">
        <div className="sticky top-0 isolate h-screen w-full overflow-hidden">
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

          {/* z-50 — Shared product stage with explicit height, centered in viewport */}
          <div className="absolute inset-x-0 top-0 z-50 flex h-screen items-center justify-center px-6 pt-[10px] pointer-events-none">
            <div className="relative mx-auto h-[360px] w-full max-w-6xl md:h-[420px]">
              <AnimatePresence mode="wait" initial={false}>
                {activeView === 1 && (
                  <motion.div
                    key="view-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-auto"
                  >
                    <div className="mx-auto flex w-full max-w-3xl items-center justify-center gap-6 md:gap-10">
                      {products.slice(0, 2).map((p) => (
                        <div key={p.id} className="w-1/2 max-w-[220px]">
                          {renderCard(p, bursts, floats, handleAdd)}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeView === 2 && (
                  <motion.div
                    key="view-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-auto"
                  >
                    <div className="mx-auto flex w-full max-w-3xl items-center justify-center gap-6 md:gap-10">
                      {products.slice(2, 4).map((p) => (
                        <div key={p.id} className="w-1/2 max-w-[220px]">
                          {renderCard(p, bursts, floats, handleAdd)}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeView === 3 && (
                  <motion.div
                    key="view-3"
                    id="pedir"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.32, ease: "easeOut" }}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto"
                  >
                    <div className="grid w-full grid-cols-2 gap-6 md:gap-10 lg:grid-cols-4">
                      {products.map((p) => (
                        <div key={p.id}>
                          {renderCard(p, bursts, floats, handleAdd)}
                        </div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                      className="mt-8 text-center"
                    >
                      <a
                        href="#pedir"
                        className="hover-jiggle inline-flex items-center rounded-full bg-berry px-8 py-3 font-display italic text-lg text-cream transition-transform"
                      >
                        Ir a tienda <span className="ml-2 animate-arrow">→</span>
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

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
          loading="lazy"
          decoding="async"
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
