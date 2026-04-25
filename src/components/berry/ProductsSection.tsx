import { useCallback, useRef, useState } from "react";
import { motion, type MotionValue, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from "framer-motion";

import { Tilt } from "./fx/Tilt";
import { ConfettiBurst } from "./fx/ConfettiBurst";
import cup1 from "@/assets/cup1.png";
import cup2 from "@/assets/cup2.png";
import cup3 from "@/assets/cup3.png";
import cup6 from "@/assets/cup6.png";
import polaroid1 from "@/assets/berry-polaroid-1.jpg";
import polaroid2 from "@/assets/berry-polaroid-2.jpg";
import polaroid3 from "@/assets/berry-polaroid-3.jpg";
import polaroid4 from "@/assets/berry-polaroid-4.jpg";

const products = [
  { id: 1, name: "Dubai Pistachio Strawberry", price: "$ 140.0", image: cup1, imgClass: "h-44 md:h-52 lg:h-56", topClass: "-top-16 md:-top-20", sparkleClass: "-top-24 md:-top-28" },
  { id: 2, name: "Dubai Pistachio Strawberry", price: "$ 140.0", image: cup2, imgClass: "h-44 md:h-52 lg:h-56", topClass: "-top-16 md:-top-20", sparkleClass: "-top-24 md:-top-28" },
  { id: 3, name: "Dubai Pistachio Strawberry", price: "$ 140.0", image: cup3, imgClass: "h-44 md:h-52 lg:h-56", topClass: "-top-16 md:-top-20", sparkleClass: "-top-24 md:-top-28" },
  { id: 4, name: "Berry Marshmallow", price: "$ 140.0", image: cup6, imgClass: "h-32 md:h-36 lg:h-40", topClass: "-top-2 md:-top-1", sparkleClass: "-top-8 md:-top-10" },
];

const firstPolaroids = [
  { src: polaroid1, alt: "Fresa con chocolate Berry Munch", side: "left" as const, edge: "cream" as const },
  { src: polaroid2, alt: "Vaso de fresas con chocolate Berry Munch", side: "right" as const, edge: "cream" as const },
];

const secondPolaroids = [
  { src: polaroid3, alt: "Postres Berry Munch en vaso", side: "left" as const, edge: "dark" as const },
  { src: polaroid4, alt: "Vaso Berry Munch con uvas y chocolate", side: "right" as const, edge: "dark" as const },
];

const instagramUrl = "https://www.instagram.com/berrymunch__/?hl=es";

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

  // Choreography (section starts on RED):
  //  0.00 → 0.06 : Title fades in at the top
  //  0.06 → 0.30 : View 1 — first 2 cards on RED
  //  0.30 → 0.42 : Cream-soft panel wipes in → CREAM
  //  0.36 → 0.60 : View 2 — second 2 cards on CREAM
  //  0.60 → 0.72 : Berry-red wipe expands again → RED
  //  0.66 → 1.00 : View 3 — finale, all 4 cards + CTA on RED
  const titleOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const titleColor = useTransform(
    scrollYProgress,
    [0.30, 0.42, 0.60, 0.72],
    ["var(--cream)", "#000000", "#000000", "var(--cream)"],
  );

  // First wipe: red → cream
  const panelScale = useTransform(scrollYProgress, [0.30, 0.42], [0, 40]);
  const panelTransform = useMotionTemplate`translate3d(-50%, -50%, 0) scale3d(${panelScale}, ${panelScale}, 1)`;

  // Second wipe: cream → red (covers the panel)
  const wipeScale = useTransform(scrollYProgress, [0.60, 0.72], [0, 40]);
  const wipeTransform = useMotionTemplate`translate3d(-50%, -50%, 0) scale3d(${wipeScale}, ${wipeScale}, 1)`;
  const firstPolaroidY = useTransform(scrollYProgress, [0.06, 0.36], [12, -12]);
  const secondPolaroidY = useTransform(scrollYProgress, [0.36, 0.66], [12, -12]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextView: 0 | 1 | 2 | 3 =
      latest < 0.06 ? 0 : latest < 0.36 ? 1 : latest < 0.66 ? 2 : 3;
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
        <div className="sticky top-0 isolate h-screen w-full overflow-hidden bg-berry">

          {/* z-10 — Cream-soft panel wipe (red → cream) */}
          <motion.span
            aria-hidden="true"
            style={{
              transform: panelTransform,
              willChange: "transform",
              backgroundColor: "var(--cream-soft)",
            }}
            className="absolute left-1/2 top-1/2 z-10 w-[120px] h-[120px] rounded-full pointer-events-none"
          />

          {/* z-20 — Berry red wipe (cream → red, for finale) */}
          <motion.span
            aria-hidden="true"
            style={{
              transform: wipeTransform,
              willChange: "transform",
              backgroundColor: "var(--berry)",
            }}
            className="absolute left-1/2 top-1/2 z-20 w-[120px] h-[120px] rounded-full pointer-events-none"
          />

          {/* z-40 — Title pinned to the top */}
          <motion.h2
            style={{
              opacity: titleOpacity,
              color: titleColor,
              willChange: "opacity, color",
            }}
            className="absolute left-1/2 top-24 md:top-28 z-40 -translate-x-1/2 font-display font-bold text-3xl md:text-5xl tracking-wide text-center whitespace-nowrap pointer-events-none"
          >
            NUESTROS BERRY BESTS
          </motion.h2>

          {/* z-45 — "Ir a tienda" CTA next to title */}
          <motion.a
            id="pedir"
            href="#pedir"
            initial={false}
            animate={{ opacity: activeView === 3 ? 1 : 0, x: activeView === 3 ? 0 : 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ pointerEvents: activeView === 3 ? "auto" : "none" }}
            className="hover-jiggle absolute right-6 md:right-10 top-24 md:top-28 z-[45] inline-flex items-center rounded-full bg-cream px-6 py-2.5 font-display italic text-base md:text-lg text-berry shadow-lg transition-transform"
          >
            Ir a tienda <span className="ml-2 animate-arrow">→</span>
          </motion.a>

          {/* z-50 — Shared product stage with explicit height, centered in viewport */}
          <div className="absolute inset-x-0 top-0 z-50 flex h-screen items-center justify-center px-6 pt-[200px] pointer-events-none">
            <div className="relative mx-auto h-[360px] w-full max-w-6xl md:h-[420px]">
              <motion.div
                initial={false}
                animate={{ opacity: activeView === 1 ? 1 : 0, y: activeView === 1 ? 0 : activeView > 1 ? -20 : 20 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                style={{ pointerEvents: activeView === 1 ? "auto" : "none" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <PolaroidPair items={firstPolaroids} show={activeView === 1} parallaxY={firstPolaroidY} />
                <div className="mx-auto flex w-full max-w-3xl items-center justify-center gap-6 md:gap-10">
                  {products.slice(0, 2).map((p) => (
                    <div key={p.id} className="w-1/2 max-w-[220px]">
                      {renderCard(p, bursts, floats, handleAdd, "cream", "cream")}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={false}
                animate={{ opacity: activeView === 2 ? 1 : 0, y: activeView === 2 ? 0 : activeView > 2 ? -20 : 20 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                style={{ pointerEvents: activeView === 2 ? "auto" : "none" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <PolaroidPair items={secondPolaroids} show={activeView === 2} parallaxY={secondPolaroidY} />
                <div className="mx-auto flex w-full max-w-3xl items-center justify-center gap-6 md:gap-10">
                  {products.slice(2, 4).map((p) => (
                    <div key={p.id} className="w-1/2 max-w-[220px]">
                      {renderCard(p, bursts, floats, handleAdd, "berry")}
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={false}
                animate={{ opacity: activeView === 3 ? 1 : 0, y: activeView === 3 ? 0 : 20 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                style={{ pointerEvents: activeView === 3 ? "auto" : "none" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="grid w-full grid-cols-2 gap-6 md:gap-10 lg:grid-cols-4">
                  {products.map((p) => (
                    <div key={p.id}>
                      {renderCard(p, bursts, floats, handleAdd, "cream", "cream", true)}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PolaroidPair({
  items,
  show,
  parallaxY,
}: {
  items: Array<{ src: string; alt: string; side: "left" | "right"; edge: "cream" | "dark" }>;
  show: boolean;
  parallaxY: MotionValue<number>;
}) {
  return (
    <div aria-hidden={!show} className="absolute inset-0 z-0 hidden md:block">
      {items.map((item, index) => (
        <motion.a
          key={item.src}
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Ir a Instagram"
          initial={false}
          animate={{
            opacity: show ? 1 : 0,
            x: show ? 0 : item.side === "left" ? -26 : 26,
            rotate: 0,
          }}
          style={{ y: parallaxY }}
          whileHover={show ? { scale: 1.04 } : undefined}
          transition={{
            opacity: { duration: 0.45, ease: "easeOut", delay: index * 0.04 },
            x: { duration: 0.55, ease: "easeOut", delay: index * 0.04 },
            y: { duration: 0.25, ease: "easeOut" },
            scale: { duration: 0.25, ease: "easeOut" },
          }}
          className={`group/polaroid absolute top-[38%] h-64 w-48 -translate-y-1/2 rounded-sm border-[12px] ${item.edge === "dark" ? "border-polaroid-edge-dark bg-polaroid-edge-dark" : "border-cream bg-cream"} shadow-2xl transition-shadow duration-300 hover:shadow-[0_24px_48px_-18px_var(--color-chocolate)] focus:outline-none focus-visible:ring-4 focus-visible:ring-gold lg:h-72 lg:w-56 ${item.side === "left" ? "left-6 lg:left-12" : "right-6 lg:right-12"}`}
        >
          <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
          <span className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-cream px-4 py-1.5 font-display text-sm font-bold text-berry opacity-0 shadow-lg transition-all duration-300 group-hover/polaroid:translate-y-1 group-hover/polaroid:opacity-100 group-focus-visible/polaroid:translate-y-1 group-focus-visible/polaroid:opacity-100">
            Ir a Instagram
          </span>
        </motion.a>
      ))}
    </div>
  );
}

function renderCard(
  p: typeof products[number],
  bursts: Record<number, boolean>,
  floats: Array<{ id: number; pid: number }>,
  handleAdd: (pid: number) => void,
  sparkleColor: "berry" | "cream" = "berry",
  edgeColor: "berry" | "cream" = "berry",
  matchFirstPricePosition = false,
) {
  const sparkleClassName = sparkleColor === "cream" ? "text-cream" : "text-berry";
  const edgeClassName = edgeColor === "cream" ? "ring-cream" : "ring-berry";
  return (
    <Tilt key={p.id} className="relative pt-24 md:pt-28 group">
      <div className={`relative rounded-2xl bg-berry/5 ring-2 ${edgeClassName} pt-16 md:pt-20 shadow-xl transition-shadow duration-300 group-hover:shadow-2xl`}>
        <svg
          aria-hidden="true"
          viewBox="0 0 80 40"
          className={`absolute ${p.sparkleClass} left-1/2 -translate-x-1/2 w-16 md:w-20 h-8 md:h-10 ${sparkleClassName} pointer-events-none animate-twinkle`}
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
          loading="eager"
          decoding="async"
          // @ts-expect-error - fetchpriority is a valid HTML attribute
          fetchpriority="high"
          className={`absolute ${p.topClass} left-1/2 -translate-x-1/2 ${p.imgClass} w-auto object-contain drop-shadow-2xl pointer-events-none rotate-6 md:rotate-[8deg] z-10 transition-transform duration-500 group-hover:rotate-[-6deg] group-hover:scale-110`}
        />

        <div className="h-16 md:h-20" />

        <div className="rounded-b-2xl bg-cream-soft text-chocolate px-4 py-4 text-center relative">
          <p className="font-display font-bold text-xs md:text-sm uppercase leading-tight tracking-wide">
            {p.name}
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
          <div className="relative mt-3 flex items-center justify-between gap-4">
            <p className={`${matchFirstPricePosition ? "ml-4" : "ml-4"} font-bold text-sm md:text-base text-[oklch(0.55_0.15_145)] transition-transform duration-300 group-hover:scale-110 inline-block`}>
              {p.price}
            </p>
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
