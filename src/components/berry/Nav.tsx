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
    <nav className="fixed left-1/2 top-6 md:top-10 z-40 -translate-x-1/2 px-4 w-full max-w-2xl">
      <div
        className="flex items-center justify-between rounded-full px-4 py-2 md:px-6 md:py-3 backdrop-blur-md bg-cream/20 border border-cream/30 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
      >
        <span className="font-display text-sm md:text-base font-bold text-cream tracking-wider md:hidden pl-2">
          BERRY MUNCH
        </span>

        <ul
          className="hidden md:flex items-center justify-around w-full gap-1"
          onMouseLeave={() => setHovered(null)}
        >
          {links.map((l) => (
            <li key={l.href} className="relative">
              <a
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                onMouseEnter={() => setHovered(l.href)}
                className="relative block px-5 py-2 font-display text-sm lg:text-base font-bold tracking-[0.18em] transition-colors duration-200"
              >
                {hovered === l.href && (
                  <motion.span
                    layoutId="nav-highlight"
                    className="absolute inset-0 -z-0 rounded-md bg-berry-deep"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    hovered === l.href ? "text-cream" : "text-cream/95"
                  }`}
                >
                  {l.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-cream transition-transform active:scale-90 pr-2"
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-2 rounded-2xl backdrop-blur-md bg-cream/20 border border-cream/30 p-4 shadow-lg animate-unroll">
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="block font-display text-sm font-bold text-cream tracking-[0.2em] px-2 py-1 rounded-md hover:bg-berry-deep transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
