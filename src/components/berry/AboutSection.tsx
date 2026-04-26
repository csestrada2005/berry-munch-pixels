import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import berryAboutCollage from "@/assets/berry-about-collage.png";
import berriesCup from "@/assets/berries-cup.png";

export function AboutSection() {
  const [activeView, setActiveView] = useState<0 | 1 | 2 | 3>(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Choreography, modeled after ProductsSection's explicit staged flow:
  //  0.00 → 0.22 : Title centered only
  //  0.22 → 0.48 : Title moves up while paragraph fades in
  //  0.48 → 0.68 : Title + paragraph hold fully visible
  //  0.68 → 1.00 : Text exits and the cup reveal takes over
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextView: 0 | 1 | 2 | 3 =
      latest < 0.22 ? 0 : latest < 0.48 ? 1 : latest < 0.68 ? 2 : 3;
    setActiveView((current) => (current === nextView ? current : nextView));
  });

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
            <div className="absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2">
              <motion.h2
                initial={false}
                animate={{
                  opacity: activeView === 3 ? 0 : 1,
                  y: activeView === 0 ? 0 : -210,
                  scale: activeView === 0 ? 1 : 0.86,
                }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream uppercase tracking-tight text-center"
              >
                ¿Quiénes Somos?
              </motion.h2>
            </div>

            {/* Paragraph */}
            <div className="absolute left-1/2 top-[54%] z-10 w-full max-w-md -translate-x-1/2 -translate-y-1/2">
              <motion.p
                initial={false}
                animate={{
                  opacity: activeView === 1 || activeView === 2 ? 1 : 0,
                  y: activeView === 1 || activeView === 2 ? 0 : 28,
                }}
                transition={{ duration: 0.38, ease: "easeOut" }}
                className="text-center text-sm leading-relaxed sm:text-base md:text-lg"
                data-font="serif"
              >
                <span style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                  En Berrymunch, diseñamos momentos de pausa. Creemos en la elegancia de los pocos
                  ingredientes cuando estos son excepcionales. Nuestra obsesión es el equilibrio:
                  entre lo amargo y lo dulce, entre la textura y la suavidad, entre la naturaleza y
                  la técnica.
                </span>
              </motion.p>
            </div>

            {/* Cup reveal */}
            <div className="absolute left-1/2 top-1/2 z-20 w-full max-w-[17rem] -translate-x-1/2 -translate-y-1/2 sm:max-w-sm lg:max-w-md">
              <motion.img
                src={berriesCup}
                alt="Vaso de fresas frescas — Berries before Worries"
                loading="lazy"
                decoding="async"
                initial={false}
                animate={{
                  opacity: activeView === 3 ? 1 : 0,
                  scale: activeView === 3 ? 1 : 0.84,
                  y: activeView === 3 ? 0 : 30,
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="relative block h-auto w-full"
              />
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
