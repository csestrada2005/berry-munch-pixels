import heroVideo from "@/assets/hero-video.mp4";
import berryMunchLogo from "@/assets/berry-munch-logo.png";
import dubaiPistachio from "@/assets/dubai-pistachio-strawberry.png";
import { Plus } from "lucide-react";
import { AccountButton } from "./AccountButton";

export function HeroSection() {
  return (
    <section className="relative min-h-[480px] md:min-h-[540px] lg:min-h-[600px] overflow-hidden bg-white">
      {/* Background video */}
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover z-0 scale-110"
        style={{ filter: "saturate(0.85) hue-rotate(-8deg)" }}
      />

      {/* Wordmark — pegado debajo de la navbar */}
      <div className="absolute left-0 right-0 top-20 z-40 mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-start">
          <img
            src={berryMunchLogo}
            alt="Berry Munch"
            className="w-88 md:w-[28rem] lg:w-[32rem] h-auto -mt-32 md:-mt-40"
          />
          <div className="-mt-24 md:-mt-28 ml-16 md:ml-32">
            <AccountButton />
          </div>
        </div>
      </div>

      {/* Producto destacado — Dubai Pistachio Strawberry */}
      <div className="absolute right-4 md:right-10 bottom-6 md:bottom-10 z-30 w-44 md:w-52">
        <div className="relative rounded-2xl bg-berry shadow-2xl pt-24 md:pt-32">
          {/* Imagen flotante que sobresale por arriba */}
          <img
            src={dubaiPistachio}
            alt="Dubai Pistachio Strawberry"
            className="absolute -top-16 md:-top-20 left-1/2 -translate-x-1/2 h-48 md:h-56 w-auto object-contain drop-shadow-xl pointer-events-none"
          />
          {/* Panel blanco inferior */}
          <div className="rounded-2xl bg-cream px-4 py-4 md:px-5 md:py-5">
            <p className="font-display font-bold text-base md:text-lg text-chocolate leading-tight">
              DUBAI PISTACHIO<br />STRAWBERRY
            </p>
            <div className="mt-2 flex items-end justify-between">
              <span className="font-bold text-lg md:text-xl text-[oklch(0.55_0.15_145)]">$ 140.0</span>
              <button
                aria-label="Añadir Dubai Pistachio Strawberry"
                className="flex h-10 w-10 items-center justify-center rounded-md bg-[oklch(0.55_0.15_145)] text-cream transition-transform hover:scale-110 -mb-1 -mr-1"
              >
                <Plus size={20} strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
