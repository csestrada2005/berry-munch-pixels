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

      <div className="mx-auto max-w-6xl px-6 pt-0 pb-16 -mt-32 md:-mt-48 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-8 md:gap-6 items-start">
          {/* Left: receipt-fork combined image — pegado al chocolate drip */}
          <div className="order-2 md:order-1 flex justify-center md:justify-start md:-mt-12 lg:-mt-20 md:ml-2 lg:ml-4">
            <img
              src={receiptFork}
              alt="Fresa con chocolate sobre recibo Berry Munch — The Berry Best"
              className="w-64 md:w-80 lg:w-96 -rotate-3 drop-shadow-xl"
            />
          </div>

          {/* Center: heading + paragraph + cup with callouts */}
          <div className="order-1 md:order-2 flex flex-col items-center">
            <h2 className="self-start font-display text-4xl md:text-5xl lg:text-6xl font-bold text-berry mb-4 text-left">
              ¿Quiénes Somos?
            </h2>
            <p className="self-start text-left text-base md:text-lg leading-relaxed mb-8 max-w-md">
              En Berry Munch seleccionamos las fresas más frescas y las bañamos en chocolate belga
              premium. Cada bocado es una experiencia única, hecha con amor y los mejores
              ingredientes.
            </p>

            <div className="relative mx-auto w-full max-w-sm">
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
          </div>

          {/* Right: polaroids stack */}
          <div className="order-3 flex flex-col items-center md:pt-4">
            <div className="bg-cream-soft p-3 pb-8 shadow-xl rotate-3 w-48 md:w-52">
              <img
                src={marketDisplay}
                alt="Mostrador con vasos de fresas y uvas"
                className="aspect-square w-full object-cover"
              />
            </div>
            <div className="bg-cream-soft p-3 pb-8 shadow-xl -rotate-2 w-48 md:w-52 -mt-8">
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
