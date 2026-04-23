import { useRef } from "react";
import heroVideo from "@/assets/hero-video.mp4";
import berryMunchLogo from "@/assets/berry-munch-logo.png";
import { HeroCursor } from "./HeroCursor";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative h-[80vh] min-h-[520px] max-h-[720px] overflow-hidden bg-berry flex items-center justify-center px-4 pt-24 pb-8"
    >
      {/* Video container — wide rectangle, centered */}
      <div className="relative h-full w-full max-w-6xl">
        <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl ring-1 ring-black/10">
          <video
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover animate-breathe"
          />
        </div>

        {/* Logo hovering above the video, overlapping its top edge */}
        <img
          src={berryMunchLogo}
          alt="Berry Munch"
          className="pointer-events-none absolute left-1/2 -top-10 md:-top-14 -translate-x-1/2 z-20 w-48 md:w-64 lg:w-72 h-auto animate-logo-drop drop-shadow-2xl"
        />
      </div>

      <HeroCursor containerRef={sectionRef} />
    </section>
  );
}
