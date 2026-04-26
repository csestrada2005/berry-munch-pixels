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

  const titleOpacity = useTransform(scrollYProgress, [0, 0.65, 0.8], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.2, 0.45], [0, -160]);
  const titleScale = useTransform(scrollYProgress, [0.2, 0.45], [1, 0.9]);

  const paraOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.65, 0.8], [0, 1, 1, 0]);
  const paraY = useTransform(scrollYProgress, [0.2, 0.45], [20, 0]);

  const cupOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);
  const cupScale = useTransform(scrollYProgress, [0.8, 0.95], [0.84, 1]);
  const cupY = useTransform(scrollYProgress, [0.8, 0.95], [30, 0]);

  return (
    <section
      id="sucursal"
      className="relative bg-berry text-cream scroll-mt-24"
    >
      <div ref={trackRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="mx-auto grid h-full max-w-6xl grid-cols-[minmax(11rem,0.82fr)_minmax(0,1.18fr)] items-stretch gap-5 px-4 sm:grid-cols-[minmax(13rem,0.9fr)_minmax(0,1.1fr)] sm:gap-8 sm:px-6 lg:gap-16">
          <div className="flex h-full min-h-screen justify-start self-stretch">
            <div className="relative h-full min-h-screen w-full overflow-hidden rounded-sm shadow-2xl lg:max-w-[28rem]">
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
          <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
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
              className="absolute left-1/2 top-[54%] z-10 w-full max-w-md -translate-x-1/2 -translate-y-1/2 text-center text-sm leading-relaxed sm:text-base md:text-lg"
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
              className="absolute left-1/2 top-1/2 z-20 w-full max-w-[17rem] -translate-x-1/2 -translate-y-1/2 sm:max-w-sm lg:max-w-md"
            >
              <img
                src={berriesCup}
                alt="Vaso de fresas frescas — Berries before Worries"
                loading="lazy"
                decoding="async"
                className="relative block h-auto w-full"
              />
            </motion.div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
