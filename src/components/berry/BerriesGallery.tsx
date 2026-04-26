import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import g1 from "@/assets/berry-gallery-1.jpg";
import g2 from "@/assets/berry-gallery-2.jpg";
import g3 from "@/assets/berry-gallery-3.jpg";
import g4 from "@/assets/berry-gallery-4.jpg";
import g5 from "@/assets/berry-gallery-5.jpg";

const images = [g1, g2, g3, g4, g5];

export function BerriesGallery() {
  // Scroll track — defines the duration of the pinned animation.
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Choreography:
  //  0    → 0.15 : Canvas (pastel pink box) scales from larger start → fullscreen
  //  0.18 → 0.32 : Carousel takes over while the title remains fully visible
  //  0.32 → 1.00 : Horizontal carousel translates until the sticky flow exits
  const canvasScale = useTransform(scrollYProgress, [0, 0.15], [0.533, 1]);
  const canvasRadius = useTransform(scrollYProgress, [0, 0.15], [56, 0]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);
  const canvasTransform = useMotionTemplate`translate3d(-50%, -50%, 0) scale3d(${canvasScale}, ${canvasScale}, 1)`;

  const titleX = useTransform(scrollYProgress, [0.18, 0.32], [0, -40]);
  const titleTransform = useMotionTemplate`translate3d(${titleX}%, 0, 0)`;

  const trackX = useTransform(scrollYProgress, [0.32, 1], [0, -58]);
  const trackTransform = useMotionTemplate`translate3d(${trackX}%, 0, 0)`;

  return (
    <section id="berries-gallery" className="bg-berry">
      {/* Scroll track */}
      <div ref={trackRef} className="relative h-[320vh]">
        {/* Sticky stage — holds EVERYTHING */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* 1) Canvas: pastel pink box scales up */}
          <motion.div
            aria-hidden="true"
            style={{
              opacity: canvasOpacity,
              borderRadius: canvasRadius,
              backgroundColor: "var(--berry-pink)",
              transform: canvasTransform,
              willChange: "transform",
            }}
            className="absolute left-1/2 top-1/2 h-screen w-screen origin-center pointer-events-none"
          />

          {/* 2) "Our Berries" headline */}
          <motion.div
            style={{
              transform: titleTransform,
              willChange: "transform",
            }}
            className="absolute left-0 top-1/2 -translate-y-1/2 pl-6 md:pl-16 lg:pl-24 z-10 pointer-events-none"
          >
            <h2
              className="font-display font-black text-[18vw] md:text-[14vw] lg:text-[12vw] leading-[0.85] tracking-tight text-cream"
              style={{ textShadow: "4px 4px 0 rgba(0,0,0,0.15)" }}
            >
              Our
              <br />
              Berries
            </h2>
          </motion.div>

          {/* 3) Horizontal carousel track */}
          <div className="absolute inset-0 flex items-center z-10">
            <motion.div
              style={{ transform: trackTransform, willChange: "transform" }}
              className="flex items-center gap-6 md:gap-10 pl-[55vw] pr-[10vw]"
            >
              {images.map((src, i) => (
                <Link
                  key={i}
                  to="/berries/$berryId"
                  params={{ berryId: String(i + 1) }}
                  className="group relative shrink-0 w-[60vw] md:w-[42vw] lg:w-[32vw] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-cream hover:shadow-[0_24px_70px_rgba(0,0,0,0.28)] focus:outline-none focus-visible:ring-8 focus-visible:ring-cream/70"
                  style={{
                    rotate: `${i % 2 === 0 ? -2 : 2}deg`,
                    transition: "transform 350ms ease, box-shadow 350ms ease",
                  }}
                  aria-label={`Open berry creation ${i + 1}`}
                >
                  <img
                    src={src}
                    alt={`Berry creation ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
