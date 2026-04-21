import { motion, AnimatePresence } from "framer-motion";

interface ConfettiBurstProps {
  show: boolean;
  count?: number;
}

const colors = ["var(--berry)", "var(--chocolate)", "var(--gold)", "var(--cream)"];

export function ConfettiBurst({ show, count = 12 }: ConfettiBurstProps) {
  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
          {Array.from({ length: count }).map((_, i) => {
            const angle = (i / count) * Math.PI * 2;
            const dist = 40 + Math.random() * 40;
            const x = Math.cos(angle) * dist;
            const y = Math.sin(angle) * dist;
            const color = colors[i % colors.length];
            return (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                animate={{ x, y, opacity: 0, scale: 1.2, rotate: Math.random() * 360 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="absolute h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}
