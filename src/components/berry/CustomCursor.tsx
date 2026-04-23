import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressing, setPressing] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 35, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 500, damping: 35, mass: 0.3 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    function isInteractive(t: EventTarget | null): boolean {
      if (!(t instanceof Element)) return false;
      return !!t.closest('button, a, [role="button"], input, textarea, select, label');
    }

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onOver = (e: MouseEvent) => setHovering(isInteractive(e.target));
    const onDown = () => setPressing(true);
    const onUp = () => setPressing(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] select-none"
    >
      <motion.div
        animate={{
          scale: pressing ? 0.7 : hovering ? 1.6 : 1,
          rotate: pressing ? 25 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 18 }}
        className="text-2xl leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
      >
        {hovering ? "🥄" : "🍓"}
      </motion.div>
    </motion.div>
  );
}
