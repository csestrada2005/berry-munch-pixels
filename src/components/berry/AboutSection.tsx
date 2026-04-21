import chocolateDrip from "@/assets/chocolate-drip.png";
import receiptFork from "@/assets/receipt-fork.png";
import strawberryCupPour from "@/assets/strawberry-cup-pour.jpg";
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
          <div className="order-2 md:order-1 flex flex-col items-center md:items-start md:-mt-12 lg:-mt-20 md:-ml-6 lg:-ml-12">
            <img
              src={receiptFork}
              alt="Fresa con chocolate sobre recibo Berry Munch — The Berry Best"
              className="w-64 md:w-80 lg:w-96 -rotate-3 drop-shadow-xl"
            />
            <div
              className="bg-white p-3 pb-10 shadow-2xl w-56 md:w-64 lg:w-72 -mt-4 md:-mt-6 md:ml-6 lg:ml-8 animate-wiggle"
              style={{ ["--wiggle-base" as string]: "-3deg" }}
            >
              <img
                src={strawberryCupPour}
                alt="Vaso de fresas con chocolate derretido cayendo — Berry Munch"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>

          {/* Center: heading + paragraph + cup with callouts */}
          <div className="order-1 md:order-2 flex flex-col items-center md:-ml-6 lg:-ml-10 md:pl-[70px]">
            <h2 className="self-start font-display text-4xl md:text-5xl lg:text-6xl font-bold text-berry mb-4 text-left whitespace-nowrap uppercase tracking-tight">
              ¿Quiénes Somos?
            </h2>
            <p
              className="text-center text-base md:text-lg leading-relaxed mb-8 max-w-md mx-auto"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              En Berrymunch, diseñamos momentos de pausa. Creemos en la elegancia de los pocos
              ingredientes cuando estos son excepcionales. Nuestra obsesión es el equilibrio: entre
              lo amargo y lo dulce, entre la textura y la suavidad, entre la naturaleza y la
              técnica.
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
          <div className="order-3 flex flex-col items-center md:items-end md:pt-28 lg:pt-40 md:-mr-2 lg:-mr-6">
            <div
              className="bg-white p-3 pb-10 shadow-2xl w-56 md:w-64 lg:w-72 animate-wiggle md:-mr-4 lg:-mr-8"
              style={{ ["--wiggle-base" as string]: "4deg" }}
            >
              <img
                src={marketDisplay}
                alt="Mostrador con vasos de fresas y uvas"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div
              className="bg-white p-3 pb-10 shadow-2xl w-56 md:w-64 lg:w-72 -mt-10 md:mr-6 lg:mr-10 animate-wiggle"
              style={{ ["--wiggle-base" as string]: "-5deg", animationDelay: "0.4s" }}
            >
              <img
                src={customers}
                alt="Clientes felices disfrutando Berry Munch"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
