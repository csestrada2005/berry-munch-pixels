import heroVideo from "@/assets/hero-video.mp4";
import berryMunchLogo from "@/assets/berry-munch-logo.png";

export function HeroSection() {
  return (
    <section className="relative min-h-[480px] md:min-h-[540px] lg:min-h-[600px] overflow-hidden bg-white pt-24 pb-12">
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

      {/* Wordmark — left aligned */}
      <div className="relative z-40 mx-auto max-w-7xl px-6 md:px-10 mt-2">
        <div className="flex flex-col items-start">
          <img
            src={berryMunchLogo}
            alt="Berry Munch"
            className="w-88 md:w-[28rem] lg:w-[32rem] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
