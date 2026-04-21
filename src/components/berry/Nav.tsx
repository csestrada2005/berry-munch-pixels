import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#productos", label: "Productos" },
  { href: "#pedir", label: "Pedir" },
  { href: "#sucursal", label: "Sucursal" },
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

  return (
    <nav className="absolute left-1/2 top-6 z-30 -translate-x-1/2 px-4 w-full max-w-5xl">
      <div className="flex items-center justify-between gap-4 rounded-full bg-cream px-6 py-3 shadow-lg">
        <span className="font-display text-lg font-bold text-berry">🍓 Berry Munch</span>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                className="text-sm font-medium text-chocolate transition-colors hover:text-berry"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#cuenta"
          className="hidden md:inline-flex items-center rounded-full border-2 border-berry px-5 py-1.5 text-sm font-medium text-berry transition-colors hover:bg-berry hover:text-cream"
        >
          Mi Cuenta
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-berry"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-2 rounded-2xl bg-cream p-4 shadow-lg">
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="block text-sm font-medium text-chocolate"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#cuenta"
                className="inline-block rounded-full border-2 border-berry px-5 py-1.5 text-sm font-medium text-berry"
              >
                Mi Cuenta
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
