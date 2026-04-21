import chocolateDrip from "@/assets/chocolate-drip.png";
import receipt from "@/assets/receipt.png";
import berriesCup from "@/assets/berries-cup.png";
import callouts from "@/assets/callouts.png";
import customers from "@/assets/customers.jpg";
import marketDisplay from "@/assets/market-display.jpg";

export function AboutSection() {
  return (
    <section id="sucursal" className="relative bg-cream text-chocolate scroll-mt-24">
      <img
        src={chocolateDrip}
        alt=""
        aria-hidden="true"
        className="block w-full h-auto -mt-px select-none pointer-events-none"
      />

      <div className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-center font-display text-3xl md:text-5xl font-bold text-berry mb-3">
          ¿Quiénes Somos?
        </h2>
        <p className="text-center max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-10">
          En Berry Munch seleccionamos las fresas más frescas y las bañamos en chocolate belga
          premium. Cada bocado es una experiencia única, hecha con amor y los mejores ingredientes.
        </p>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {/* Receipt */}
          <div className="flex justify-center">
            <img
              src={receipt}
              alt="Recibo Berry Munch — The Berry Best"
              className="w-44 -rotate-3 drop-shadow-xl"
            />
          </div>

          {/* Center: berries cup with handwritten callouts */}
          <div className="relative mx-auto w-full max-w-xs">
            <img
              src={callouts}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            />
            <img
              src={berriesCup}
              alt="Vaso de fresas frescas — Berries before Worries"
              className="relative w-full h-auto"
            />
          </div>

          {/* Polaroids stack */}
          <div className="flex flex-col gap-4 items-center">
            <div className="bg-cream-soft p-2 pb-6 shadow-xl rotate-3 w-36">
              <img
                src={marketDisplay}
                alt="Mostrador con vasos de fresas y uvas"
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="bg-cream-soft p-2 pb-6 shadow-xl -rotate-3 w-36">
              <img
                src={customers}
                alt="Clientes felices disfrutando Berry Munch"
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
