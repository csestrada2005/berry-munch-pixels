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
  const shrinkRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const { scrollYProgress: shrinkProgress } = useScroll({
    target: shrinkRef,
    offset: ["start end", "end start"],
  });

  // Choreography:
  //  0    → 0.15 : Canvas (pastel pink box) scales from larger start → fullscreen
  //  0.15 → 0.28 : Slot-machine text shifts (Line A → Line B)
  //  0.28 → 0.42 : Carousel takes over while the title remains fully visible
  //  0.42 → 1.00 : Horizontal carousel translates to the final visible set, then sticky releases
  const canvasScale = useTransform([scrollYProgress, shrinkProgress], ([stickyValue, shrinkValue]) => {
    const shrinkAmount = Math.min(Number(shrinkValue) / 0.85, 1);
    if (shrinkAmount > 0) return 1 - shrinkAmount * (1 - 0.533);

    const growAmount = Math.min(Number(stickyValue) / 0.15, 1);
    return 0.533 + growAmount * (1 - 0.533);
  });
  const canvasRadius = useTransform([scrollYProgress, shrinkProgress], ([stickyValue, shrinkValue]) => {
    const shrinkAmount = Math.min(Number(shrinkValue) / 0.85, 1);
    if (shrinkAmount > 0) return shrinkAmount * 56;

    const growAmount = Math.min(Number(stickyValue) / 0.15, 1);
    return 56 - growAmount * 56;
  });
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);
  const canvasTransform = useMotionTemplate`translate3d(-50%, -50%, 0) scale3d(${canvasScale}, ${canvasScale}, 1)`;

  const textShift = useTransform(scrollYProgress, [0.15, 0.28], [0, -50]);
  const textTransform = useMotionTemplate`translate3d(0, ${textShift}%, 0)`;

  const titleX = useTransform(scrollYProgress, [0.28, 0.42], [0, -40]);
  const titleTransform = useMotionTemplate`translate3d(${titleX}%, 0, 0)`;

  const trackX = useTransform(scrollYProgress, [0.42, 1], [0, -58]);
  const trackTransform = useMotionTemplate`translate3d(${trackX}%, 0, 0)`;

  return (
    <section id="berries-gallery" className="relative bg-berry">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <motion.div
            style={{
              opacity: canvasOpacity,
              borderRadius: canvasRadius,
              backgroundColor: "var(--berry-pink)",
              transform: canvasTransform,
              willChange: "transform",
            }}
            className="absolute left-1/2 top-1/2 h-screen w-screen origin-center"
          />
        </div>
      </div>
      {/* Scroll track */}
      <div ref={trackRef} className="relative z-10 h-[320vh]">
        {/* Sticky stage — holds EVERYTHING */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* 2) Slot-machine text */}
          <div
            aria-hidden="true"
            className="absolute top-[14%] left-1/2 -translate-x-1/2 z-20 overflow-hidden pointer-events-none"
            style={{ height: "1.2em", lineHeight: 1.2 }}
          >
            <motion.div
              style={{ transform: textTransform, willChange: "transform" }}
              className="font-display italic text-center"
            >
              <div
                className="text-2xl md:text-4xl tracking-wide text-berry-deep"
                style={{ height: "1.2em", lineHeight: 1.2 }}
              >
                Pequeñas obras dulces.
              </div>
              <div
                className="text-2xl md:text-4xl tracking-wide text-cream"
                style={{ height: "1.2em", lineHeight: 1.2 }}
              >
                Hand-picked, hand-dipped.
              </div>
            </motion.div>
          </div>

          {/* 3) "Our Berries" headline */}
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

          {/* 4) Horizontal carousel track */}
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
      <div ref={shrinkRef} className="relative h-[90vh] overflow-hidden bg-berry">
        <motion.div
          aria-hidden="true"
          style={{
            borderRadius: shrinkRadius,
            backgroundColor: "var(--berry-pink)",
            transform: shrinkTransform,
            willChange: "transform",
          }}
          className="absolute left-1/2 top-1/2 h-screen w-screen origin-center pointer-events-none"
        />
      </div>
    </section>
  );
}
