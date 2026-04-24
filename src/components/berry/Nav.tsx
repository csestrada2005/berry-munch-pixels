import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#productos", label: "PRODUCTOS" },
  { href: "#pedir", label: "PEDIR" },
  { href: "#sucursal", label: "SUCURSAL" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect when user scrolls past the hero section
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      // Hero is h-screen, switch once we've scrolled ~80% past it
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    }
  }, []);

  // Auto-expand when in scrolled (top-bar) mode
  const isExpanded = expanded || scrolled;

  return (
    <>
      {/* Desktop: dot pill that expands on hover; moves to top once scrolled past hero */}
      <motion.nav
        initial={false}
        animate={
          scrolled
            ? { top: 16, left: "50%", x: "-50%", y: 0 }
            : { top: "50%", left: 24, x: 0, y: "-50%" }
        }
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        className="hidden md:block fixed z-50"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => {
          setExpanded(false);
          setHovered(null);
        }}
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="flex items-center gap-2 rounded-full backdrop-blur-md bg-cream/30 border border-cream/40 shadow-[0_8px_32px_rgba(0,0,0,0.18)] overflow-hidden"
          style={{ padding: isExpanded ? "8px 16px" : "12px 12px" }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {!isExpanded ? (
              <motion.div
                key="dots"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-1.5"
                aria-hidden
              >
                {[0, 1, 2].map((i) => (
                  <span key={i} className="block h-1.5 w-1.5 rounded-full bg-chocolate" />
                ))}
              </motion.div>
            ) : (
              <motion.ul
                key="links"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, delay: 0.05 }}
                className="flex items-center gap-1"
              >
                {scrolled && (
                  <li className="pr-3 mr-1 border-r border-chocolate/20">
                    <span className="font-display text-xs font-bold text-chocolate tracking-[0.25em] whitespace-nowrap">
                      BERRY MUNCH
                    </span>
                  </li>
                )}
                {links.map((l) => (
                  <li key={l.href} className="relative">
                    <a
                      href={l.href}
                      onClick={(e) => handleNavClick(e, l.href)}
                      onMouseEnter={() => setHovered(l.href)}
                      className="relative inline-flex items-center px-4 py-2 rounded-full"
                    >
                      {hovered === l.href && (
                        <motion.span
                          layoutId="nav-highlight"
                          className="absolute inset-0 -z-0 rounded-full bg-berry-deep"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span
                        className={`relative z-10 font-display text-xs font-bold tracking-[0.2em] whitespace-nowrap transition-colors duration-200 ${
                          hovered === l.href ? "text-cream" : "text-chocolate"
                        }`}
                      >
                        {l.label}
                      </span>
                    </a>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.nav>

      {/* Mobile: hamburger top-left, fixed */}
      <div className="md:hidden fixed left-4 top-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center h-10 w-10 rounded-full backdrop-blur-md bg-cream/30 border border-cream/40 text-chocolate shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-transform active:scale-90"
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        {open && (
          <div className="mt-2 rounded-2xl backdrop-blur-md bg-cream/30 border border-cream/40 p-4 shadow-lg animate-unroll min-w-[180px]">
            <span className="block font-display text-xs font-bold text-chocolate tracking-[0.3em] mb-3 px-2">
              BERRY MUNCH
            </span>
            <ul className="flex flex-col gap-2">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => handleNavClick(e, l.href)}
                    className="block font-display text-sm font-bold text-chocolate tracking-[0.2em] px-2 py-2 rounded-md hover:bg-berry-deep hover:text-cream transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
