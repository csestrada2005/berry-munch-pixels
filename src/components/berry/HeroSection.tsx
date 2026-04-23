import { useRef } from "react";
import heroVideo from "@/assets/hero-video.mp4";
import berryMunchLogo from "@/assets/berry-munch-logo.png";
import { HeroCursor } from "./HeroCursor";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-berry flex items-center justify-center px-2 md:px-4 py-3 md:py-4"
    >
      {/* Video container — large rectangle, nav floats inside it */}
      <div className="relative h-full w-full max-w-[1800px]">
        {/* Soft glassy halo behind the morphing blob */}
        <div aria-hidden className="morph-blob morph-glow absolute inset-0 -z-0 pointer-events-none" />
        <div className="morph-blob relative h-full w-full overflow-hidden shadow-2xl">
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
