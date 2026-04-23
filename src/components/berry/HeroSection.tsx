import { useRef } from "react";
import heroVideo from "@/assets/hero-video.mp4";
import berryMunchLogo from "@/assets/berry-munch-logo.png";
import { HeroCursor } from "./HeroCursor";
import { Nav } from "./Nav";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-berry flex items-center justify-center px-2 md:px-4 py-3 md:py-4"
    >
      {/* Video container — torn-paper rectangle, gentle wobble, nav floats inside it */}
      <div className="relative h-full w-full max-w-[1800px] animate-paper-wobble">
        <div className="torn-edge relative h-full w-full overflow-hidden">
          <video
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          />
          {/* Warm gradient + vignette to focus the eye */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 35%, color-mix(in oklab, var(--berry-deep) 35%, transparent) 75%, color-mix(in oklab, var(--berry-deep) 70%, transparent) 100%), linear-gradient(180deg, color-mix(in oklab, var(--gold) 18%, transparent) 0%, transparent 35%, transparent 65%, color-mix(in oklab, var(--chocolate) 25%, transparent) 100%)",
            }}
          />
          {/* Paper grain overlay */}
          <div aria-hidden className="paper-grain absolute inset-0 pointer-events-none" />
          <Nav />
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
