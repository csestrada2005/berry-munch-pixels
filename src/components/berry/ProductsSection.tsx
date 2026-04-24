import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";

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

  // Scroll track — drives the entire choreography.
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Choreography:
  //  0    → 0.18 : Canvas (cream box) scales from small square → fullscreen
  //  0.18 → 0.32 : Slot-machine text shifts (Line A → Line B)
  //  0.32 → 0.46 : Berry wipe expands (repaints stage in deep berry)
  //  0.46 → 0.55 : Cream-soft inner panel reveals (cards land on cream)
  //  0.55 → 1.00 : Title + product cards reveal
  const canvasScale = useTransform(scrollYProgress, [0, 0.18], [0.35, 1]);
  const canvasRadius = useTransform(scrollYProgress, [0, 0.18], [48, 0]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);
  const canvasTransform = useMotionTemplate`translate3d(-50%, -50%, 0) scale3d(${canvasScale}, ${canvasScale}, 1)`;

  const textShift = useTransform(scrollYProgress, [0.18, 0.32], [0, -50]);
  const textTransform = useMotionTemplate`translate3d(0, ${textShift}%, 0)`;

  const wipeScale = useTransform(scrollYProgress, [0.32, 0.46], [0, 40]);
  const wipeTransform = useMotionTemplate`translate3d(-50%, -50%, 0) scale3d(${wipeScale}, ${wipeScale}, 1)`;

  const panelScale = useTransform(scrollYProgress, [0.46, 0.55], [0, 40]);
  const panelTransform = useMotionTemplate`translate3d(-50%, -50%, 0) scale3d(${panelScale}, ${panelScale}, 1)`;

  const titleOpacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.55, 0.65], [40, 0]);

  const firstPairOpacity = useTransform(scrollYProgress, [0.62, 0.78], [0, 1]);
  const firstPairY = useTransform(scrollYProgress, [0.62, 0.78], [80, 0]);

  const secondPairOpacity = useTransform(scrollYProgress, [0.72, 0.90], [0, 1]);
  const secondPairY = useTransform(scrollYProgress, [0.72, 0.90], [80, 0]);

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
      {/* Scroll track — defines duration of the pinned animation */}
      <div ref={trackRef} className="relative h-[400vh]">
        {/* Sticky stage — holds EVERYTHING (canvas, wipes, text, products) */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* 1) Canvas: cream box scales up to fill the stage */}
          <motion.div
            aria-hidden="true"
            style={{
              opacity: canvasOpacity,
              borderRadius: canvasRadius,
              transform: canvasTransform,
              willChange: "transform",
            }}
            className="absolute left-1/2 top-1/2 h-screen w-screen bg-cream origin-center pointer-events-none"
          />

          {/* 2) Berry wipe — small circle expands to repaint the canvas */}
          <motion.span
            aria-hidden="true"
            style={{
              transform: wipeTransform,
              willChange: "transform",
              backgroundColor: "var(--berry)",
            }}
            className="absolute left-1/2 top-1/2 w-[120px] h-[120px] rounded-full pointer-events-none"
          />

          {/* 3) Cream-soft panel — wipes back so cards land on cream */}
          <motion.span
            aria-hidden="true"
            style={{
              transform: panelTransform,
              willChange: "transform",
              backgroundColor: "var(--cream-soft)",
            }}
            className="absolute left-1/2 top-1/2 w-[120px] h-[120px] rounded-full pointer-events-none"
          />

          {/* 4) Slot-machine text */}
          <div
            aria-hidden="true"
            className="absolute top-[10%] left-1/2 -translate-x-1/2 z-20 overflow-hidden pointer-events-none px-4"
            style={{ height: "1.6em", lineHeight: 1.6 }}
          >
            <motion.div
              style={{ transform: textTransform, willChange: "transform" }}
              className="font-display italic text-center"
            >
              <div
                className="text-2xl md:text-4xl tracking-wide text-berry whitespace-nowrap"
                style={{ height: "1.6em", lineHeight: 1.6 }}
              >
                Hechas a mano, una a una.
              </div>
              <div
                className="text-2xl md:text-4xl tracking-wide text-cream whitespace-nowrap"
                style={{ height: "1.6em", lineHeight: 1.6 }}
              >
                Recién dipped en chocolate.
              </div>
            </motion.div>
          </div>

          {/* 5) Products content — revealed inside the sticky stage after the wipe */}
          <div
            id="pedir"
            className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 scroll-mt-24 pt-28 pb-8"
          >
            <div className="w-full max-w-6xl mx-auto">
              <motion.h2
                style={{ opacity: titleOpacity, y: titleY, willChange: "transform, opacity" }}
                className="text-center font-display text-3xl md:text-5xl font-bold mb-10 md:mb-16 tracking-wide text-berry"
              >
                NUESTROS BERRY BESTS
              </motion.h2>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                {products.map((p, i) => {
                  const inFirstPair = i < 2;
                  return (
                    <motion.div
                      key={p.id}
                      style={{
                        opacity: inFirstPair ? firstPairOpacity : secondPairOpacity,
                        y: inFirstPair ? firstPairY : secondPairY,
                        willChange: "transform, opacity",
                      }}
                    >
                      <Tilt className="relative pt-24 md:pt-28 group">
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
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                style={{ opacity: secondPairOpacity }}
                className="mt-10 text-center"
              >
                <a
                  href="#loyalty"
                  className="hover-jiggle inline-flex items-center rounded-full bg-berry px-8 py-3 font-display italic text-lg text-cream transition-transform"
                >
                  se me antojan <span className="ml-2 animate-arrow">→</span>
                </a>
              </motion.div>
            </div>
          </div>
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
