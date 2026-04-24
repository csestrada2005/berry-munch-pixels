import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import g1 from "@/assets/berry-gallery-1.jpg";
import g2 from "@/assets/berry-gallery-2.jpg";
import g3 from "@/assets/berry-gallery-3.jpg";
import g4 from "@/assets/berry-gallery-4.jpg";
import g5 from "@/assets/berry-gallery-5.jpg";

const images = [g1, g2, g3, g4, g5];

export function BerriesGallery() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Tall scroll track — extra height to accommodate text slot + wipe + horizontal travel
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // 1) Background scales from small square → fullscreen pastel pink (0 → 0.15)
  const bgScale = useTransform(scrollYProgress, [0, 0.15], [0.4, 1]);
  const bgRadius = useTransform(scrollYProgress, [0, 0.15], [56, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.04], [0, 1]);
  const bgTransform = useMotionTemplate`translate3d(-50%, -50%, 0) scale3d(${bgScale}, ${bgScale}, 1)`;

  // 2) Slot-machine text track — slides Line A → Line B (0.15 → 0.30)
  const textShift = useTransform(scrollYProgress, [0.15, 0.30], [0, -50]);
  const textTransform = useMotionTemplate`translate3d(0, ${textShift}%, 0)`;

  // 3) Wipe overlay — circle expands to fill stage (0.30 → 0.42)
  const wipeScale = useTransform(scrollYProgress, [0.30, 0.42], [0, 40]);
  const wipeTransform = useMotionTemplate`translate3d(-50%, -50%, 0) scale3d(${wipeScale}, ${wipeScale}, 1)`;

  // 4) "Our Berries" title slides off as horizontal phase begins (0.40 → 0.50)
  const titleOpacity = useTransform(scrollYProgress, [0.40, 0.50], [1, 0]);
  const titleX = useTransform(scrollYProgress, [0.40, 0.50], [0, -40]);
  const titleTransform = useMotionTemplate`translate3d(${titleX}%, 0, 0)`;

  // 5) Horizontal carousel translation (0.42 → 0.95)
  const trackX = useTransform(scrollYProgress, [0.42, 0.95], [0, -78]);
  const trackTransform = useMotionTemplate`translate3d(${trackX}%, 0, 0)`;

  return (
    <section id="berries-gallery" className="bg-cream">
      {/* Tall wrapper drives the scroll progress */}
      <div ref={wrapperRef} className="relative h-[420vh]">
        {/* Sticky stage */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Expanding pastel-pink background */}
          <motion.div
            style={{
              opacity: bgOpacity,
              borderRadius: bgRadius,
              backgroundColor: "#FFD9E1",
              transform: bgTransform,
              willChange: "transform",
            }}
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-screen w-screen origin-center"
          />

          {/* Wipe overlay — small circle expands to repaint stage in deeper berry tone */}
          <motion.span
            aria-hidden="true"
            style={{
              transform: wipeTransform,
              willChange: "transform",
              backgroundColor: "var(--berry)",
            }}
            className="absolute left-1/2 top-1/2 w-[120px] h-[120px] rounded-full pointer-events-none"
          />

          {/* Content stage above background */}
          <div className="relative h-full w-full flex items-center">
            {/* Slot-machine text mask — sits centered above the stage */}
            <div
              aria-hidden="true"
              className="absolute top-[14%] left-1/2 -translate-x-1/2 z-20 pointer-events-none overflow-hidden"
              style={{ height: "1.1em", lineHeight: 1.1 }}
            >
              <motion.div
                style={{ transform: textTransform, willChange: "transform" }}
                className="font-display italic text-cream"
              >
                <div
                  className="text-2xl md:text-4xl tracking-wide text-berry-deep"
                  style={{ height: "1.1em", lineHeight: 1.1 }}
                >
                  Pequeñas obras dulces.
                </div>
                <div
                  className="text-2xl md:text-4xl tracking-wide text-cream"
                  style={{ height: "1.1em", lineHeight: 1.1 }}
                >
                  Hand-picked, hand-dipped.
                </div>
              </motion.div>
            </div>

            {/* Left: "Our Berries" title */}
            <motion.div
              style={{ opacity: titleOpacity, transform: titleTransform, willChange: "transform" }}
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

            {/* Horizontal carousel track */}
            <motion.div
              style={{ transform: trackTransform, willChange: "transform" }}
              className="flex items-center gap-6 md:gap-10 pl-[55vw] pr-[10vw]"
            >
              {images.map((src, i) => (
                <div
                  key={i}
                  className="relative shrink-0 w-[60vw] md:w-[42vw] lg:w-[32vw] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-cream"
                  style={{
                    transform: `rotate(${i % 2 === 0 ? -2 : 2}deg) translate3d(0,0,0)`,
                  }}
                >
                  <img
                    src={src}
                    alt={`Berry creation ${i + 1}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-4 left-4 bg-cream/90 text-berry px-3 py-1 rounded-full font-display font-bold text-sm">
                    #{String(i + 1).padStart(2, "0")}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Scroll hint */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/80 font-display italic text-sm tracking-wide z-20">
              ← scroll to explore →
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
