import { useRef, type RefObject } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface ChocolateDripProps {
  className?: string;
  /** Optional element whose scroll progress drives the drip stretch */
  targetRef?: RefObject<HTMLElement | null>;
}

export function ChocolateDrip({ className = "", targetRef }: ChocolateDripProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const ref = targetRef ?? internalRef;

  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });

  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.6, 2.2]);
  const scaleY = useSpring(rawScale, { stiffness: 80, damping: 18, mass: 0.6 });

  return (
    <div ref={internalRef} className="w-full">
      <motion.svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        className={className}
        aria-hidden="true"
        style={{ scaleY, transformOrigin: "top", display: "block", willChange: "transform" }}
      >
        <path
          d="M0,0 L1200,0 L1200,20 C1180,35 1160,15 1140,30 C1120,50 1100,20 1080,40 C1060,55 1040,25 1020,45 C1000,30 980,50 960,35 C940,55 920,25 900,45 C880,30 860,55 840,40 C820,20 800,50 780,35 C760,55 740,25 720,45 C700,30 680,50 660,35 C640,55 620,25 600,45 C580,30 560,55 540,40 C520,20 500,50 480,35 C460,55 440,25 420,45 C400,30 380,50 360,35 C340,55 320,25 300,45 C280,30 260,55 240,40 C220,20 200,50 180,35 C160,55 140,25 120,45 C100,30 80,50 60,35 C40,55 20,25 0,40 Z"
          fill="currentColor"
        />
      </motion.svg>
    </div>
  );
}
