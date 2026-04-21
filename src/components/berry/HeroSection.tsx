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
          <div className="-mt-40 md:-mt-44 ml-8 md:ml-16">
            <AccountButton />
          </div>
        </div>
      </div>

      {/* Producto destacado — Dubai Pistachio Strawberry */}
      <div className="absolute right-4 md:right-10 bottom-6 md:bottom-10 z-30 w-56 md:w-72">
        <div className="rounded-2xl bg-cream/95 backdrop-blur-sm shadow-2xl overflow-hidden">
          <div className="bg-berry p-3 flex items-center justify-center">
            <img
              src={dubaiPistachio}
              alt="Dubai Pistachio Strawberry"
              className="h-32 md:h-40 w-auto object-contain"
            />
          </div>
          <div className="p-3 md:p-4">
            <p className="font-display font-bold text-sm md:text-base text-chocolate leading-tight">
              DUBAI PISTACHIO<br />STRAWBERRY
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-bold text-base md:text-lg text-gold">$ 140.0</span>
              <button
                aria-label="Añadir Dubai Pistachio Strawberry"
                className="flex h-9 w-9 items-center justify-center rounded-md bg-gold text-cream transition-transform hover:scale-110"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
