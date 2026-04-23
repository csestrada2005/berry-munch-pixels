import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import berryMunchLogo from "@/assets/berry-munch-logo.png";

type Props = {
  containerRef: React.RefObject<HTMLElement | null>;
};

export function HeroCursor({ containerRef }: Props) {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  const initialized = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    const el = containerRef.current;
    if (!el) return;

    setEnabled(true);

    const onEnter = (e: MouseEvent) => {
      if (!initialized.current) {
        x.jump(e.clientX);
        y.jump(e.clientY);
        initialized.current = true;
      }
      setVisible(true);
      el.style.cursor = "none";
    };
    const onLeave = () => {
      setVisible(false);
      el.style.cursor = "";
    };
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousemove", onMove);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousemove", onMove);
      el.style.cursor = "";
    };
  }, [containerRef, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.6 }}
      transition={{ duration: 0.2 }}
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-chocolate shadow-2xl ring-2 ring-cream/30">
        <img
          src={berryMunchLogo}
          alt=""
          className="h-14 w-14 object-contain"
          draggable={false}
        />
      </div>
    </motion.div>
  );
}
