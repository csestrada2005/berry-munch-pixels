import heroVideo from "@/assets/hero-video.mp4";
import berryMunchLogo from "@/assets/berry-munch-logo.png";
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
          <div className="-mt-44 md:-mt-52 ml-2 md:ml-6">
            <AccountButton />
          </div>
        </div>
      </div>
    </section>
  );
}
