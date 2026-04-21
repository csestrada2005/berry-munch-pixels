import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import strawberryBg from "@/assets/strawberry-bg.png";
import berryLogo from "@/assets/berry-logo.png";
import strawberrySplash from "@/assets/strawberry-splash.png";

const schema = z.object({
  name: z.string().trim().min(1, "Nombre requerido").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  comments: z.string().trim().max(1000).optional(),
});

export function LoyaltyFooter() {
  const [form, setForm] = useState({ name: "", email: "", comments: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("loyalty_signups").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      comments: parsed.data.comments ?? null,
    });
    setLoading(false);

    if (error) {
      toast.error("Algo salió mal. Inténtalo de nuevo.");
      return;
    }
    toast.success("¡Bienvenido al Berry Club! 🍓");
    setForm({ name: "", email: "", comments: "" });
  }

  return (
    <footer
      id="pedir"
      className="relative bg-berry-deep text-cream scroll-mt-24 overflow-visible"
      style={{
        backgroundImage: `linear-gradient(rgba(20,5,5,0.65), rgba(20,5,5,0.75)), url(${strawberryBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Strawberry + chocolate splash peeking from the previous section */}
      <img
        src={strawberrySplash}
        alt=""
        aria-hidden="true"
        className="absolute -top-24 md:-top-40 -left-24 md:-left-48 w-80 md:w-[36rem] h-auto pointer-events-none select-none z-20 drop-shadow-2xl animate-sway"
      />

      <div id="cuenta" className="mx-auto max-w-6xl px-6 py-24 grid md:grid-cols-[1fr_auto_1fr] gap-10 items-center">
        <div className="hidden md:block" />

        <div className="relative w-full max-w-md mx-auto">
          {/* Logo on top of the card */}
          <img
            src={berryLogo}
            alt="Berry Munch"
            className="absolute -top-72 md:-top-80 left-1/2 -translate-x-1/2 w-96 md:w-[30rem] h-auto drop-shadow-xl pointer-events-none z-10 animate-float"
          />

          <div
            className="rounded-3xl bg-cream/90 text-chocolate px-8 pt-16 pb-10 shadow-2xl backdrop-blur-sm"
            style={{
              outline: "2px dashed oklch(0.25 0.05 40 / 0.5)",
              outlineOffset: "-12px",
            }}
          >
          <h2 className="text-center font-display text-3xl md:text-4xl font-bold tracking-wide mb-8">
            LOYALTY PROGRAM
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="ln" className="block text-base font-bold mb-2">
                Nombres
              </label>
              <Input
                id="ln"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-cream-soft border-0 rounded-full h-11 px-4 text-chocolate placeholder:text-chocolate/40 shadow-inner"
                placeholder="Enter your name"
                maxLength={100}
              />
            </div>
            <div>
              <label htmlFor="le" className="block text-base font-bold mb-2">
                Email
              </label>
              <Input
                id="le"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-cream-soft border-0 rounded-full h-11 px-4 text-chocolate placeholder:text-chocolate/40 shadow-inner"
                placeholder="Enter your email"
                maxLength={255}
              />
            </div>
            <div>
              <label htmlFor="lc" className="block text-base font-bold mb-2">
                Comentarios
              </label>
              <Textarea
                id="lc"
                value={form.comments}
                onChange={(e) => setForm({ ...form, comments: e.target.value })}
                className="bg-cream-soft border-0 rounded-2xl min-h-20 px-4 py-2 text-chocolate placeholder:text-chocolate/40 shadow-inner resize-none"
                maxLength={1000}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-fill w-full rounded-full bg-berry px-6 py-3 font-display font-bold tracking-wider text-cream transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
            >
              {loading ? "ENVIANDO..." : "UNIRME!"}
            </button>
          </form>
          </div>
        </div>

        <div className="text-cream max-w-xs mx-auto md:mx-0">
          <h3 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-wide">
            UBICACIÓN
          </h3>
          <p className="flex items-start gap-3 text-cream/90 text-base leading-relaxed">
            <MapPin size={22} className="mt-1 shrink-0 animate-bounce-soft" />
            Luxury Hall, Plaza Dorada, Parque Puebla
          </p>
        </div>
      </div>

      <p className="pb-6 text-center text-sm text-cream/70">
        © 2026 Berry Munch. Todos los derechos reservados.
      </p>
    </footer>
  );
}
