import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import strawberryBg from "@/assets/strawberry-bg.png";

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
      className="relative bg-berry-deep text-cream scroll-mt-24"
      style={{
        backgroundImage: `linear-gradient(rgba(20,5,5,0.65), rgba(20,5,5,0.75)), url(${strawberryBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div id="cuenta" className="mx-auto max-w-6xl px-6 py-24 flex items-center justify-center">
        <div
          className="w-full max-w-md rounded-3xl bg-cream/90 text-chocolate px-8 py-10 shadow-2xl backdrop-blur-sm"
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
              className="w-full rounded-full bg-berry px-6 py-3 font-display font-bold tracking-wider text-cream transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {loading ? "ENVIANDO..." : "UNIRME!"}
            </button>
          </form>
        </div>
      </div>

      <p className="pb-6 text-center text-sm text-cream/70">
        © 2026 Berry Munch. Todos los derechos reservados.
      </p>
    </footer>
  );
}
