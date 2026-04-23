import { motion, AnimatePresence } from "framer-motion";

interface ConfettiBurstProps {
  show: boolean;
  count?: number;
  colors?: string[];
}

const defaultColors = ["#4A2511", "#7B3F00", "#E23D28", "#FF6B6B"];

export function ConfettiBurst({ show, count = 16, colors = defaultColors }: ConfettiBurstProps) {
  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
          {Array.from({ length: count }).map((_, i) => {
            const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
            const dist = 35 + Math.random() * 55;
            const x = Math.cos(angle) * dist;
            const y = Math.sin(angle) * dist;
            const color = colors[i % colors.length];
            const isChunk = i % 3 === 0;
            return (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.5, rotate: 0 }}
                animate={{
                  x,
                  y,
                  opacity: 0,
                  scale: 1.1 + Math.random() * 0.4,
                  rotate: Math.random() * 540 - 270,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 + Math.random() * 0.2, ease: "easeOut" }}
                className={`absolute ${isChunk ? "h-2 w-3 rounded-sm" : "h-2 w-2 rounded-full"}`}
                style={{ backgroundColor: color }}
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}
