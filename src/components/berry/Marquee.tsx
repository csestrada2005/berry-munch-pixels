import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useAnimationFrame } from "framer-motion";

const text =
  "picked STRAWBERRIES & BELGIUM CHOCOLATE for those WHO taste WITH their IDEA";

export function Marquee() {
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Mouse velocity (px/ms) → smoothed
  const velocity = useMotionValue(0);
  const smoothVelocity = useSpring(velocity, {
    stiffness: 120,
    damping: 28,
    mass: 0.6,
  });

  // Track mouse velocity
  useEffect(() => {
    if (typeof window === "undefined") return;
    let lastX = 0;
    let lastT = performance.now();
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      const dx = e.clientX - lastX;
      // px per ms, clamp to a reasonable range
      const v = Math.max(-3, Math.min(3, dx / dt));
      velocity.set(v);
      lastX = e.clientX;
      lastT = now;

      // Decay velocity if mouse stops moving
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // schedule a decay tick
        const decay = setTimeout(() => velocity.set(0), 80);
        raf = decay as unknown as number;
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [velocity]);

  // Drive the track position each frame: baseline drift + mouse velocity boost
  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track) return;
    // Width of one copy (track contains 2 copies)
    const halfWidth = track.scrollWidth / 2;
    if (halfWidth === 0) return;

    const baselineSpeed = 0.04; // px per ms, slow constant drift (leftward)
    const mouseBoost = smoothVelocity.get() * 1.8; // amplify mouse contribution

    // Negative = move left
    let next = baseX.get() - (baselineSpeed - mouseBoost) * delta;

    // Wrap seamlessly
    if (next <= -halfWidth) next += halfWidth;
    if (next > 0) next -= halfWidth;

    baseX.set(next);
  });

  return (
    <div
      ref={containerRef}
      className="overflow-hidden bg-cream py-4 border-y-2 border-chocolate/20 mt-24 md:mt-40"
    >
      <motion.div
        ref={trackRef}
        style={{ x: baseX }}
        className="flex whitespace-nowrap will-change-transform"
      >
        {[0, 1].map((i) => (
          <div key={i} className="flex shrink-0 items-center gap-6 pr-6">
            {Array.from({ length: 4 }).map((_, j) => (
              <span
                key={j}
                className="font-display italic text-2xl md:text-3xl text-chocolate"
              >
                {text}{" "}
                <span
                  className="text-berry mx-3 animate-star"
                  style={{ animationDelay: `${(j * 0.3).toFixed(2)}s` }}
                >
                  ★
                </span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
