import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import berryAboutCollage from "@/assets/berry-about-collage.png";
import berriesCup from "@/assets/berries-cup.png";

export function AboutSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.68, 0.78], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.34, 0.46], [0, -170, -170]);
  const titleScale = useTransform(scrollYProgress, [0, 0.38], [1, 0.9]);

  const paraOpacity = useTransform(scrollYProgress, [0.62, 0.72, 0.76, 0.84], [0, 1, 1, 0]);
  const paraY = useTransform(scrollYProgress, [0.62, 0.72], [22, 0]);

  const cupOpacity = useTransform(scrollYProgress, [0.84, 0.92], [0, 1]);
  const cupScale = useTransform(scrollYProgress, [0.84, 0.92], [0.86, 1]);
  const cupY = useTransform(scrollYProgress, [0.84, 0.92], [28, 0]);

  return (
    <section
      id="sucursal"
      className="relative bg-berry text-cream scroll-mt-24"
    >
      <div ref={trackRef} className="relative h-[230vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-[minmax(14rem,0.9fr)_minmax(0,1.1fr)] md:items-stretch md:gap-8 lg:gap-16">
          <div className="order-2 flex h-full min-h-screen justify-center self-stretch md:order-1 md:justify-start">
            <div className="relative h-full min-h-screen w-full max-w-72 overflow-hidden rounded-sm shadow-2xl md:max-w-none lg:max-w-[28rem]">
              <img
                src={berryAboutCollage}
                alt="Collage editorial Berry Munch con vaso de fresas y chocolate"
                loading="lazy"
                decoding="async"
                className="block h-full w-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT: scroll-driven text → reveals cup */}
          <div className="order-1 md:order-2 relative min-h-[28rem] flex items-center justify-center">
            {/* Title */}
            <motion.h2
              style={{ opacity: titleOpacity, y: titleY, scale: titleScale }}
              className="absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream uppercase tracking-tight text-center"
            >
              ¿Quiénes Somos?
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              style={{ opacity: paraOpacity, y: paraY }}
              className="absolute left-1/2 top-[50%] z-10 w-full max-w-md -translate-x-1/2 -translate-y-1/2 text-center text-base md:text-lg leading-relaxed"
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
              className="absolute left-1/2 top-1/2 z-30 w-full max-w-xs -translate-x-1/2 -translate-y-1/2 md:max-w-sm lg:max-w-md"
            >
              <img
                src={berriesCup}
                alt="Vaso de fresas frescas — Berries before Worries"
                loading="lazy"
                decoding="async"
                className="relative w-full h-auto"
              />
            </motion.div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
