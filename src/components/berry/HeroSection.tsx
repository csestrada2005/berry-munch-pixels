import { useEffect, useRef, useState } from "react";
import heroVideo from "@/assets/hero-video.mp4";
import berryMunchLogo from "@/assets/berry-munch-logo.png";
import dubaiPistachio from "@/assets/dubai-pistachio-strawberry.png";
import { Plus } from "lucide-react";
import { AccountButton } from "./AccountButton";
import { ConfettiBurst } from "./fx/ConfettiBurst";

export function HeroSection() {
  const cupRef = useRef<HTMLImageElement>(null);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    function onMove(e: MouseEvent) {
      const el = cupRef.current;
      if (!el) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      el.style.transform = `translate(-50%, 0) translate(${x}px, ${y}px) rotate(${x * 0.3}deg)`;
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  function handleAdd() {
    setBurst(true);
    setTimeout(() => setBurst(false), 700);
  }

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden bg-white">
      <video
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover z-0 scale-110 animate-breathe"
      />

      <div className="absolute left-0 right-0 top-20 z-40 mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col items-start">
          <img
            src={berryMunchLogo}
            alt="Berry Munch"
            className="w-88 md:w-[28rem] lg:w-[32rem] h-auto -mt-32 md:-mt-40 animate-logo-drop"
          />
          <div className="-mt-24 md:-mt-28 ml-16 md:ml-32">
            <AccountButton />
          </div>
        </div>
      </div>

      <div className="absolute right-4 md:right-10 bottom-6 md:bottom-10 z-30 w-44 md:w-52 group">
        <div className="relative rounded-2xl bg-berry shadow-2xl pt-32 md:pt-40 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
          <img
            ref={cupRef}
            src={dubaiPistachio}
            alt="Dubai Pistachio Strawberry"
            className="absolute -top-24 md:-top-28 left-1/2 -translate-x-1/2 h-64 md:h-72 w-auto object-contain drop-shadow-xl pointer-events-none transition-transform duration-300 ease-out animate-wiggle"
          />
          <div className="rounded-2xl bg-cream px-4 py-4 md:px-5 md:py-5">
            <p className="font-display font-bold text-base md:text-lg text-chocolate leading-tight">
              DUBAI PISTACHIO<br />STRAWBERRY
            </p>
            <div className="mt-2 flex items-end justify-between">
              <span className="font-bold text-lg md:text-xl text-[oklch(0.55_0.15_145)]">$ 140.0</span>
              <div className="relative">
                <ConfettiBurst show={burst} />
                <button
                  onClick={handleAdd}
                  aria-label="Añadir Dubai Pistachio Strawberry"
                  className="flex h-10 w-10 items-center justify-center rounded-md bg-[oklch(0.55_0.15_145)] text-cream transition-transform hover:scale-110 active:scale-90 -mb-1 -mr-1 group-hover:animate-heartbeat"
                >
                  <Plus size={20} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
