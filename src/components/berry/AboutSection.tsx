import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import chocolateDrip from "@/assets/chocolate-drip.png";
import strawberryCupPour from "@/assets/strawberry-cup-pour.jpg";
import berriesCup from "@/assets/berries-cup.png";
import callouts from "@/assets/callouts.png";
import { ChocolateDrip } from "./ChocolateDrip";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textStageRef = useRef<HTMLDivElement>(null);

  // Scroll progress through the text stage
  const { scrollYProgress } = useScroll({
    target: textStageRef,
    offset: ["start 80%", "end 30%"],
  });

  // Title fades out in the first 35% of the stage
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25, 0.45], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.45], [0, -30]);
  const titleScale = useTransform(scrollYProgress, [0, 0.45], [1, 0.92]);

  // Paragraph fades in mid-scroll
  const paraOpacity = useTransform(scrollYProgress, [0.35, 0.55, 0.8], [0, 1, 1]);
  const paraY = useTransform(scrollYProgress, [0.35, 0.55], [30, 0]);

  // Strawberry cup reveals at the end
  const cupOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
  const cupScale = useTransform(scrollYProgress, [0.65, 0.95], [0.85, 1]);
  const cupY = useTransform(scrollYProgress, [0.65, 0.95], [40, 0]);

  return (
    <section
      id="sucursal"
      ref={sectionRef}
      className="relative bg-cream text-chocolate scroll-mt-24"
    >
      <img
        src={chocolateDrip}
        alt=""
        aria-hidden="true"
        className="block w-full h-auto -mt-px select-none pointer-events-none"
      />
      <ChocolateDrip
        targetRef={sectionRef}
        className="absolute left-0 right-0 -top-1 w-full h-12 md:h-16 text-chocolate pointer-events-none z-20"
      />

      <div className="mx-auto max-w-6xl px-6 pt-0 pb-16 -mt-32 md:-mt-48 relative z-10">
        <div
          ref={textStageRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center min-h-[80vh]"
        >
          {/* LEFT: strawberry-shaped image */}
          <div className="order-2 md:order-1 flex justify-center md:justify-start">
            <div className="relative w-72 md:w-96 lg:w-[28rem] aspect-[3/4] animate-wiggle"
              style={{ ["--wiggle-base" as string]: "-2deg" }}
            >
              <img
                src={strawberryCupPour}
                alt="Vaso de fresas con chocolate derretido cayendo — Berry Munch"
                className="absolute inset-0 w-full h-full object-cover drop-shadow-2xl"
                style={{
                  // Strawberry silhouette via clip-path (heart-like teardrop with bumps for seeds outline)
                  clipPath:
                    "path('M 50% 4% C 30% 4%, 8% 18%, 8% 40% C 8% 62%, 24% 80%, 36% 90% C 42% 95%, 47% 98%, 50% 99% C 53% 98%, 58% 95%, 64% 90% C 76% 80%, 92% 62%, 92% 40% C 92% 18%, 70% 4%, 50% 4% Z')",
                }}
              />
              {/* Leafy crown on top */}
              <svg
                viewBox="0 0 200 60"
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-3/5 h-auto text-berry"
                fill="currentColor"
                aria-hidden
              >
                <path d="M100 55 C 80 30, 50 25, 30 30 C 50 38, 60 48, 70 52 C 50 50, 35 45, 20 50 C 40 56, 60 58, 100 55 Z" fill="hsl(120 40% 30%)" />
                <path d="M100 55 C 120 30, 150 25, 170 30 C 150 38, 140 48, 130 52 C 150 50, 165 45, 180 50 C 160 56, 140 58, 100 55 Z" fill="hsl(120 45% 33%)" />
                <path d="M100 55 C 95 20, 100 5, 105 5 C 110 5, 110 25, 100 55 Z" fill="hsl(120 50% 28%)" />
              </svg>
            </div>
          </div>

          {/* RIGHT: scroll-driven text → reveals cup */}
          <div className="order-1 md:order-2 relative min-h-[28rem] flex items-center justify-center">
            {/* Title */}
            <motion.h2
              style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
              className="absolute font-display text-5xl md:text-6xl lg:text-7xl font-bold text-berry uppercase tracking-tight text-center"
            >
              ¿Quiénes Somos?
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              style={{ opacity: paraOpacity, y: paraY }}
              className="absolute text-center text-base md:text-lg leading-relaxed max-w-md"
              data-font="serif"
            >
              <span style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                En Berrymunch, diseñamos momentos de pausa. Creemos en la elegancia de los pocos
                ingredientes cuando estos son excepcionales. Nuestra obsesión es el equilibrio:
                entre lo amargo y lo dulce, entre la textura y la suavidad, entre la naturaleza y
                la técnica.
              </span>
            </motion.p>

            {/* Cup reveal */}
            <motion.div
              style={{ opacity: cupOpacity, scale: cupScale, y: cupY }}
              className="absolute w-full max-w-sm"
            >
              <div
                className="relative animate-wiggle"
                style={{ ["--wiggle-base" as string]: "0deg" }}
              >
                <img
                  src={callouts}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />
                <img
                  src={berriesCup}
                  alt="Vaso de fresas frescas — Berries before Worries"
                  className="relative w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
