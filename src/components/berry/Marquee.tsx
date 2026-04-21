const text =
  "picked STRAWBERRIES & BELGIUM CHOCOLATE for those WHO taste WITH their IDEA";

export function Marquee() {
  return (
    <div className="overflow-hidden bg-cream py-4 border-y-2 border-chocolate/20">
      <div className="flex marquee-track whitespace-nowrap">
        {[0, 1].map((i) => (
          <div key={i} className="flex shrink-0 items-center gap-6 pr-6">
            {Array.from({ length: 4 }).map((_, j) => (
              <span
                key={j}
                className="font-display italic text-2xl md:text-3xl text-chocolate"
              >
                {text} <span className="text-berry mx-3">★</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
