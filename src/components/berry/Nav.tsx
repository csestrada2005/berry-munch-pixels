import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#productos", label: "PRODUCTOS" },
  { href: "#pedir", label: "PEDIR" },
  { href: "#sucursal", label: "SUCURSAL" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

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

  // Decorative ribbon end (SVG) — scalloped / banner tail
  const RibbonEnd = ({ flip = false }: { flip?: boolean }) => (
    <svg
      viewBox="0 0 40 56"
      className={`h-full w-8 md:w-10 shrink-0 ${flip ? "-scale-x-100" : ""}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Back shadow layer */}
      <path
        d="M0 6 L28 6 L40 28 L28 50 L0 50 Z"
        fill="oklch(0.88 0.04 85)"
      />
      {/* Front ribbon layer with notch */}
      <path
        d="M0 0 L32 0 L20 28 L32 56 L0 56 Z"
        fill="var(--cream)"
      />
    </svg>
  );

  return (
    <nav className="absolute left-1/2 top-6 z-30 -translate-x-1/2 px-4 w-full max-w-3xl">
      {/* Banner row */}
      <div className="flex items-stretch h-12 md:h-14 drop-shadow-xl">
        <RibbonEnd />
        <div className="flex-1 flex items-center justify-between bg-cream border-y-2 border-chocolate/20 px-6 md:px-10">
          <span className="font-display text-base md:text-lg font-bold text-black tracking-wider md:hidden">
            BERRY MUNCH
          </span>

          <ul className="hidden md:flex items-center justify-around w-full">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="font-display text-sm lg:text-base font-bold text-black tracking-[0.2em] transition-colors hover:text-berry"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-black"
            aria-label="Menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        <RibbonEnd flip />
      </div>

      {open && (
        <div className="md:hidden mt-2 rounded-lg bg-cream p-4 shadow-lg border-2 border-chocolate/20">
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="block font-display text-sm font-bold text-black tracking-[0.2em]"
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
