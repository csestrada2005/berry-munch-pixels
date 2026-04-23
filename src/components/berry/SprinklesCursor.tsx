import { useEffect, useRef } from "react";

const COLORS = ["#E11D48", "#F472B6", "#FFFFFF", "#3E2723", "#FBCFE8", "#9F1239"];

export function SprinklesCursor() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const layer = layerRef.current;
    if (!layer) return;

    let lastSpawn = 0;
    const MIN_INTERVAL = 22; // throttle: ~45 sprinkles/sec max

    const onMove = (e: MouseEvent) => {
      // Skip if hovering inside the hero section (it owns its own cursor)
      const target = e.target as Element | null;
      if (target && target.closest && target.closest("[data-no-sprinkles]")) return;

      const now = performance.now();
      if (now - lastSpawn < MIN_INTERVAL) return;
      lastSpawn = now;

      const sprinkle = document.createElement("span");
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const rot = Math.random() * 360;
      const drift = (Math.random() - 0.5) * 30; // px
      const fall = 30 + Math.random() * 30; // px
      const len = 8 + Math.random() * 6;
      const thick = 2 + Math.random() * 1.5;

      sprinkle.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: ${len}px;
        height: ${thick}px;
        background: ${color};
        border-radius: ${thick}px;
        transform: translate(-50%, -50%) rotate(${rot}deg);
        pointer-events: none;
        z-index: 9998;
        will-change: transform, opacity;
        transition: transform 1s cubic-bezier(0.2, 0.6, 0.3, 1), opacity 1s ease-out;
        box-shadow: 0 1px 2px rgba(0,0,0,0.15);
      `;
      layer.appendChild(sprinkle);

      // Trigger animation on next frame
      requestAnimationFrame(() => {
        sprinkle.style.transform = `translate(calc(-50% + ${drift}px), calc(-50% + ${fall}px)) rotate(${rot + (Math.random() - 0.5) * 120}deg)`;
        sprinkle.style.opacity = "0";
      });

      // Remove from DOM after animation
      setTimeout(() => {
        sprinkle.remove();
      }, 1050);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      // Clean any leftover sprinkles
      while (layer.firstChild) layer.removeChild(layer.firstChild);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden"
    />
  );
}
