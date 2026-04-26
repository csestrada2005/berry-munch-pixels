import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const schema = z.object({
  name: z.string().trim().min(1, "Nombre requerido").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  comments: z.string().trim().max(1000).optional(),
});

export function LoyaltyFooter() {
  const [form, setForm] = useState({ name: "", email: "", comments: "" });
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

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
    <div ref={wrapperRef} className="bg-berry px-3 md:px-6 pb-3 md:pb-6 pt-12">
      <motion.footer
        id="pedir"
        style={{
          scale,
          opacity,
          backgroundColor: "var(--berry)",
          borderTopLeftRadius: "8rem",
          borderTopRightRadius: "8rem",
          borderBottomLeftRadius: "2rem",
          borderBottomRightRadius: "2rem",
        }}
        className="relative text-cream scroll-mt-24 overflow-hidden shadow-2xl origin-bottom"
      >
        <div
          id="cuenta"
          className="mx-auto max-w-5xl px-6 py-20 md:py-28 grid md:grid-cols-[1.2fr_1fr] gap-12 items-center"
        >
          {/* LEFT: form card */}
          <div className="relative w-full max-w-md mx-auto md:mx-0">
            <div
              className="rounded-3xl bg-cream/95 text-chocolate px-8 pt-10 pb-10 shadow-2xl backdrop-blur-sm"
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

          {/* RIGHT: location */}
          <div className="text-cream max-w-xs mx-auto md:mx-0 opacity-100">
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-4 tracking-wide">
              UBICACIÓN
            </h3>
            <p className="flex items-start gap-3 text-cream text-base leading-relaxed">
              <MapPin size={22} className="mt-1 shrink-0 animate-bounce-soft" />
              Luxury Hall, Plaza Dorada, Parque Puebla
            </p>
          </div>
        </div>

        <p className="pb-6 text-center text-sm text-cream">
          © 2026 Berry Munch. Todos los derechos reservados.
        </p>
      </motion.footer>
    </div>
  );
}
