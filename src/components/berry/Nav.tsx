import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const links = [
  { href: "#productos", label: "PRODUCTOS" },
  { href: "#pedir", label: "PEDIR" },
  { href: "#sucursal", label: "SUCURSAL" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    }
  }

  return (
    <>
      {/* Desktop: vertical glass rail docked inside-left of hero */}
      <nav className="hidden md:block absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-10">
        <div
          className="flex flex-col items-center gap-6 rounded-full px-2 py-6 backdrop-blur-md bg-cream/20 border border-cream/30 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
          onMouseLeave={() => setHovered(null)}
        >
          {/* Brand spine */}
          <div className="h-32 w-9 flex items-center justify-center">
            <span className="font-display text-xs font-bold text-chocolate tracking-[0.3em] -rotate-90 whitespace-nowrap">
              BERRY MUNCH
            </span>
          </div>

          <div className="h-px w-6 bg-chocolate/30" />

          <ul className="flex flex-col items-center gap-2">
            {links.map((l) => (
              <li key={l.href} className="relative">
                <a
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  onMouseEnter={() => setHovered(l.href)}
                  className="relative flex h-32 w-9 items-center justify-center rounded-full"
                >
                  {hovered === l.href && (
                    <motion.span
                      layoutId="nav-highlight"
                      className="absolute inset-0 -z-0 rounded-full bg-berry-deep"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 font-display text-sm font-bold tracking-[0.18em] -rotate-90 whitespace-nowrap transition-colors duration-200 ${
                      hovered === l.href ? "text-cream" : "text-chocolate"
                    }`}
                  >
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile: hamburger top-left inside hero */}
      <div className="md:hidden absolute left-4 top-4 z-10">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center h-10 w-10 rounded-full backdrop-blur-md bg-cream/20 border border-cream/30 text-chocolate shadow-[0_8px_32px_rgba(0,0,0,0.15)] transition-transform active:scale-90"
          aria-label="Menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        {open && (
          <div className="mt-2 rounded-2xl backdrop-blur-md bg-cream/20 border border-cream/30 p-4 shadow-lg animate-unroll min-w-[180px]">
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
