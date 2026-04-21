import chocolateDrip from "@/assets/chocolate-drip.png";
import receiptFork from "@/assets/receipt-fork.png";
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

      <div className="mx-auto max-w-6xl px-6 pt-0 pb-16 -mt-40 md:-mt-56 relative z-10">
        <h2 className="text-center font-display text-4xl md:text-6xl font-bold text-berry mb-4 ml-0 md:ml-24 lg:ml-40">
          ¿Quiénes Somos?
        </h2>
        <p className="text-center max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-12">
          En Berry Munch seleccionamos las fresas más frescas y las bañamos en chocolate belga
          premium. Cada bocado es una experiencia única, hecha con amor y los mejores ingredientes.
        </p>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Receipt + strawberry-fork combined image */}
          <div className="flex justify-center">
            <img
              src={receiptFork}
              alt="Fresa con chocolate sobre recibo Berry Munch — The Berry Best"
              className="w-52 md:w-60 -rotate-3 drop-shadow-xl"
            />
          </div>

          {/* Center: berries cup with handwritten callouts */}
          <div className="relative mx-auto w-full max-w-md">
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
          <div className="flex flex-col gap-6 items-center">
            <div className="bg-cream-soft p-3 pb-8 shadow-xl rotate-3 w-52 md:w-56">
              <img
                src={marketDisplay}
                alt="Mostrador con vasos de fresas y uvas"
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="bg-cream-soft p-3 pb-8 shadow-xl -rotate-3 w-52 md:w-56">
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
