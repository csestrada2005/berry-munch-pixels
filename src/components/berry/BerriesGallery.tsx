import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import g1 from "@/assets/berry-gallery-1.jpg";
import g2 from "@/assets/berry-gallery-2.jpg";
import g3 from "@/assets/berry-gallery-3.jpg";
import g4 from "@/assets/berry-gallery-4.jpg";
import g5 from "@/assets/berry-gallery-5.jpg";

const images = [g1, g2, g3, g4, g5];

export function BerriesGallery() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Total scroll length: ~3 viewports gives time for the bg expand + horizontal travel
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // Background: small square → fullscreen pastel pink (0 → 0.2)
  const bgScale = useTransform(scrollYProgress, [0, 0.2], [0.4, 1]);
  const bgRadius = useTransform(scrollYProgress, [0, 0.2], [56, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  // Horizontal carousel translation (0.25 → 0.95)
  // Slides from 0% to -85% so all 5 images travel through the viewport
  const trackX = useTransform(scrollYProgress, [0.25, 0.95], ["0%", "-78%"]);

  // "Our Berries" headline fades/scales as we begin the horizontal phase
  const titleOpacity = useTransform(scrollYProgress, [0.18, 0.35], [1, 0]);
  const titleX = useTransform(scrollYProgress, [0.18, 0.35], ["0%", "-40%"]);

  return (
    <section id="berries-gallery" className="bg-cream">
      {/* Tall wrapper drives the scroll progress */}
      <div ref={wrapperRef} className="relative h-[350vh]">
        {/* Sticky stage */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Expanding pastel-pink background */}
          <motion.div
            style={{
              scale: bgScale,
              opacity: bgOpacity,
              borderRadius: bgRadius,
              backgroundColor: "#FFD9E1",
            }}
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-screen w-screen origin-center"
          />

          {/* Content stage above background */}
          <div className="relative h-full w-full flex items-center">
            {/* Left: "Our Berries" title */}
            <motion.div
              style={{ opacity: titleOpacity, x: titleX }}
              className="absolute left-0 top-1/2 -translate-y-1/2 pl-6 md:pl-16 lg:pl-24 z-10 pointer-events-none"
            >
              <h2
                className="font-display font-black text-[18vw] md:text-[14vw] lg:text-[12vw] leading-[0.85] tracking-tight text-berry"
                style={{ textShadow: "4px 4px 0 rgba(255,255,255,0.4)" }}
              >
                Our
                <br />
                Berries
              </h2>
            </motion.div>

            {/* Horizontal carousel track */}
            <motion.div
              style={{ x: trackX }}
              className="flex items-center gap-6 md:gap-10 pl-[55vw] pr-[10vw] will-change-transform"
            >
              {images.map((src, i) => (
                <div
                  key={i}
                  className="relative shrink-0 w-[60vw] md:w-[42vw] lg:w-[32vw] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-cream"
                  style={{
                    transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
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
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-berry/70 font-display italic text-sm tracking-wide">
              ← scroll to explore →
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
