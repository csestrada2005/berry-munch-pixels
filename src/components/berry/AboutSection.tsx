import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import berryAboutCollage from "@/assets/berry-about-collage.png";
import berriesCup from "@/assets/berries-cup.png";
import callouts from "@/assets/callouts.png";

export function AboutSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.78, 0.92], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.46, 0.78], [0, -86, -86]);
  const titleScale = useTransform(scrollYProgress, [0, 0.46], [1, 0.86]);

  const paraOpacity = useTransform(scrollYProgress, [0.22, 0.42, 0.78, 0.92], [0, 1, 1, 0]);
  const paraY = useTransform(scrollYProgress, [0.22, 0.46], [34, 0]);

  const cupOpacity = useTransform(scrollYProgress, [0.58, 0.76], [0, 1]);
  const cupScale = useTransform(scrollYProgress, [0.58, 0.82], [0.85, 1]);
  const cupY = useTransform(scrollYProgress, [0.58, 0.82], [42, 0]);
  const leftImageY = useTransform(scrollYProgress, [0, 1], [36, -36]);

  return (
    <section
      id="sucursal"
      className="relative bg-berry text-cream scroll-mt-24"
    >
      <div ref={trackRef} className="relative h-[260vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-10 px-6 pt-16 pb-16 md:grid-cols-2 md:gap-16">
          <div className="order-2 flex justify-center md:order-1 md:justify-start">
            <motion.div
              style={{ y: leftImageY }}
              className="relative w-72 overflow-hidden rounded-sm shadow-2xl md:w-96 lg:w-[28rem]"
            >
              <img
                src={berryAboutCollage}
                alt="Collage editorial Berry Munch con vaso de fresas y chocolate"
                loading="lazy"
                decoding="async"
                className="block h-auto w-full object-cover"
              />
            </motion.div>
          </div>

          {/* RIGHT: scroll-driven text → reveals cup */}
          <div className="order-1 md:order-2 relative min-h-[28rem] flex items-center justify-center">
            {/* Title */}
            <motion.h2
              style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
              className="absolute font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream uppercase tracking-tight text-center"
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
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                />
                <img
                  src={berriesCup}
                  alt="Vaso de fresas frescas — Berries before Worries"
                  loading="lazy"
                  decoding="async"
                  className="relative w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
