import { useRef } from "react";
import heroVideo from "@/assets/hero-video.mp4";
import berryMunchLogo from "@/assets/berry-munch-logo.png";
import { HeroCursor } from "./HeroCursor";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-berry flex flex-col items-center justify-center px-4 pt-28 pb-8 md:pt-32 md:pb-12"
    >
      {/* Logo above video */}
      <img
        src={berryMunchLogo}
        alt="Berry Munch"
        className="relative z-10 w-56 md:w-72 lg:w-80 h-auto mb-6 md:mb-8 animate-logo-drop drop-shadow-xl"
      />

      {/* Square video container */}
      <div
        className="relative z-10 w-full max-w-[min(90vw,calc(100vh-16rem))] aspect-square overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl ring-1 ring-black/10"
      >
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover animate-breathe"
        />
      </div>

      <HeroCursor containerRef={sectionRef} />
    </section>
  );
}
