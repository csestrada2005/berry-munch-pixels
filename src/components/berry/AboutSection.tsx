import chocolateDrip from "@/assets/chocolate-drip.png";
import receipt from "@/assets/receipt.png";
import pistachioCup from "@/assets/pistachio-cup.png";
import hand from "@/assets/hand.png";

const callouts = [
  { label: "Deep red", side: "left" as const, top: "18%" },
  { label: "100% disinfected", side: "right" as const, top: "32%" },
  { label: "Flawless", side: "left" as const, top: "55%" },
  { label: "Fresh", side: "right" as const, top: "70%" },
];

export function AboutSection() {
  return (
    <section id="sucursal" className="relative bg-cream text-chocolate scroll-mt-24">
      {/* Chocolate drip border */}
      <img
        src={chocolateDrip}
        alt=""
        aria-hidden="true"
        className="block w-full h-auto -mt-px select-none pointer-events-none"
      />

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
          <div className="flex justify-center">
            <img
              src={receipt}
              alt="Recibo Berry Munch — The Berry Best"
              className="w-56 -rotate-3 drop-shadow-xl"
            />
          </div>

          {/* Center cup with callouts */}
          <div className="relative mx-auto w-72 h-96">
            <img
              src={pistachioCup}
              alt="Dubai Pistachio Strawberry cup"
              className="absolute inset-0 w-full h-full object-contain"
            />
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

          {/* Hand reaching */}
          <div className="flex justify-center">
            <img
              src={hand}
              alt="Mano alcanzando producto"
              className="w-48 rotate-6 drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
