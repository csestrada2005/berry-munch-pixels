import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, Sparkles } from "lucide-react";
import { Nav } from "@/components/berry/Nav";
import { eventContact, eventPackages, eventWhatsAppUrl } from "@/components/berry/EventsData";
import berriesCup from "@/assets/berries-cup.png";
import cup1 from "@/assets/cup1.png";
import marketDisplay from "@/assets/market-display.jpg";

export const Route = createFileRoute("/eventos")({
  head: () => ({
    meta: [
      { title: "Eventos Berry Munch — Tabulador" },
      {
        name: "description",
        content:
          "Cotiza Berry Munch para eventos: vasos de frutas, mix y Bote Dubai con precios especiales por volumen.",
      },
      { property: "og:title", content: "Eventos Berry Munch — Tabulador" },
      {
        property: "og:description",
        content: "Fresas premium con chocolate belga para eventos, mesas dulces y celebraciones.",
      },
    ],
  }),
  component: EventosPage,
});

function EventosPage() {
  return (
    <main className="min-h-screen bg-cream text-chocolate">
      <Nav />
      <section className="relative overflow-hidden bg-berry px-5 pb-14 pt-24 text-cream md:px-8 md:pt-28">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_0.9fr] md:items-center">
          <div>
            <p className="font-display text-xl italic text-cream/85">Munch Club</p>
            <h1 className="mt-3 font-display text-6xl font-black leading-none tracking-normal md:text-8xl">
              Eventos
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85">
              Lleva la experiencia Berry Munch a tu celebración con fresas premium cubiertas con chocolate belga y precios especiales por volumen.
            </p>
            <a
              href={eventWhatsAppUrl()}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-full bg-cream px-7 py-3 font-display text-lg font-bold text-berry shadow-xl transition-transform hover:scale-105"
            >
              Cotizar evento
            </a>
          </div>

          <div className="relative min-h-[22rem] md:min-h-[30rem]">
            <img
              src={marketDisplay}
              alt="Mesa de productos Berry Munch para eventos"
              className="absolute right-0 top-4 h-72 w-64 rotate-3 rounded-[2rem] object-cover shadow-2xl md:h-96 md:w-80"
            />
            <img
              src={berriesCup}
              alt="Vaso de fresas Berry Munch"
              className="absolute bottom-0 left-0 h-56 w-56 -rotate-6 object-contain drop-shadow-2xl md:h-72 md:w-72"
            />
            <img
              src={cup1}
              alt="Producto premium Berry Munch estilo Dubái"
              className="absolute bottom-4 right-10 h-44 w-44 rotate-6 object-contain drop-shadow-2xl md:h-60 md:w-60"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream-soft px-5 py-14 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-xl italic text-berry">Tabulador para eventos</p>
              <h2 className="mt-2 font-display text-4xl font-black tracking-normal md:text-6xl">Precios por volumen</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-chocolate/70">
              Disponibilidad sujeta a agenda y volumen solicitado.
            </p>
          </div>

          <div className="mt-9 grid gap-5 lg:grid-cols-3">
            {eventPackages.map((eventPackage) => (
              <article key={eventPackage.id} className="rounded-3xl bg-cream p-6 shadow-xl ring-2 ring-berry/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-berry text-cream">
                  <Sparkles size={22} />
                </div>
                <h3 className="mt-5 font-display text-3xl font-black tracking-normal text-berry">
                  {eventPackage.title}
                </h3>
                <p className="mt-2 min-h-12 text-sm leading-relaxed text-chocolate/70">{eventPackage.subtitle}</p>
                <div className="mt-6 space-y-3">
                  {eventPackage.tiers.map((tier) => (
                    <div key={tier.volume} className="rounded-2xl bg-cream-soft px-4 py-4">
                      <p className="text-sm font-bold uppercase tracking-[0.12em] text-chocolate/60">{tier.volume}</p>
                      <p className="mt-1 font-display text-3xl font-black text-berry">{tier.price}</p>
                      {tier.note && <p className="text-sm font-bold text-chocolate/65">{tier.note}</p>}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-berry px-5 py-14 text-cream md:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_0.85fr] md:items-center">
          <div>
            <p className="font-display text-xl italic text-cream/80">Be your berry best</p>
            <h2 className="mt-2 font-display text-4xl font-black tracking-normal md:text-6xl">Agenda tu fecha</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-cream/80">
              Para cotizar mejor, comparte fecha, ciudad, número aproximado de invitados y el paquete que te interesa.
            </p>
          </div>
          <div className="rounded-3xl bg-chocolate p-6 shadow-2xl">
            <a href={eventWhatsAppUrl()} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl bg-cream px-5 py-4 font-bold text-chocolate transition hover:scale-[1.02]">
              <Phone size={20} className="text-berry" />
              {eventContact.phoneDisplay}
            </a>
            <a href={`mailto:${eventContact.email}`} className="mt-3 flex items-center gap-3 rounded-2xl bg-cream px-5 py-4 font-bold text-chocolate transition hover:scale-[1.02]">
              <Mail size={20} className="text-berry" />
              {eventContact.email}
            </a>
            <p className="mt-5 text-center font-display text-2xl font-bold text-cream">{eventContact.instagram}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
