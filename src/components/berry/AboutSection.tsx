import { ChocolateDrip } from "./ChocolateDrip";

const callouts = [
  { label: "Deep red", side: "left" as const, top: "18%" },
  { label: "100% disinfected", side: "right" as const, top: "32%" },
  { label: "Flawless", side: "left" as const, top: "55%" },
  { label: "Fresh", side: "right" as const, top: "70%" },
];

export function AboutSection() {
  return (
    <section id="sucursal" className="relative bg-cream text-chocolate scroll-mt-24">
      <ChocolateDrip className="block w-full h-12 text-chocolate -mt-px" />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center font-display text-4xl md:text-6xl font-bold text-berry mb-4">
          ¿Quiénes Somos?
        </h2>
        <p className="text-center max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-16">
          En Berry Munch seleccionamos las fresas más frescas y las bañamos en chocolate belga
          premium. Cada bocado es una experiencia única, hecha con amor y los mejores ingredientes.
        </p>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Receipt */}
          <div className="relative mx-auto w-56 bg-cream-soft border border-chocolate/20 shadow-xl p-5 -rotate-3">
            <div className="text-xs font-mono space-y-1">
              <p className="font-display font-bold text-base text-berry text-center">Berry Munch</p>
              <hr className="border-dashed border-chocolate/40 my-2" />
              <p>1x Strawberry Cup ........ $140.00</p>
              <p>1x Dubai Pistachio ....... $140.00</p>
              <p>1x Lotus Special ......... $120.00</p>
              <hr className="border-dashed border-chocolate/40 my-2" />
              <p className="font-bold">TOTAL ................... $400.00</p>
            </div>
            <div className="absolute -bottom-4 -right-4 rotate-12 rounded-full border-4 border-berry px-3 py-2">
              <p className="font-display font-bold text-berry text-xs">The Berry Best!</p>
            </div>
          </div>

          {/* Center cup with callouts */}
          <div className="relative mx-auto w-64 h-80">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-berry/20 to-chocolate/30 border-2 border-chocolate/20 flex items-center justify-center text-7xl">
              🍓
            </div>
            {callouts.map((c) => (
              <div
                key={c.label}
                className="absolute hidden lg:flex items-center gap-2"
                style={{
                  top: c.top,
                  [c.side === "left" ? "right" : "left"]: "100%",
                }}
              >
                {c.side === "right" && <span className="w-10 h-px bg-chocolate" />}
                <span className="whitespace-nowrap font-display italic text-sm">{c.label}</span>
                {c.side === "left" && <span className="w-10 h-px bg-chocolate" />}
              </div>
            ))}
          </div>

          {/* Polaroids */}
          <div className="flex flex-col gap-6 items-center">
            <div className="bg-cream-soft p-3 pb-10 shadow-xl rotate-3 w-44">
              <div className="aspect-square bg-berry/20 flex items-center justify-center text-4xl">
                🛒
              </div>
              <p className="font-display italic text-center text-xs mt-2 text-chocolate">
                Mercado
              </p>
            </div>
            <div className="bg-cream-soft p-3 pb-10 shadow-xl -rotate-3 w-44">
              <div className="aspect-square bg-berry/20 flex items-center justify-center text-4xl">
                😊
              </div>
              <p className="font-display italic text-center text-xs mt-2 text-chocolate">
                Clientes felices
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
