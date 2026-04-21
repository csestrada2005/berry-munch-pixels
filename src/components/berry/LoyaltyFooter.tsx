import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Instagram, Facebook, MapPin, Phone } from "lucide-react";
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
        backgroundImage:
          "linear-gradient(rgba(60,15,15,0.85), rgba(60,15,15,0.95)), radial-gradient(circle at 20% 30%, oklch(0.45 0.18 25) 0%, transparent 50%), radial-gradient(circle at 80% 70%, oklch(0.3 0.1 30) 0%, transparent 50%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center font-script text-7xl md:text-8xl text-cream mb-4">
          Berry Munch
        </h2>
        <p className="text-center font-display italic text-lg mb-12 text-cream/80">
          Únete a nuestro Programa de Lealtad
        </p>

        <div id="cuenta" className="grid md:grid-cols-2 gap-12 items-start">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="ln" className="block text-sm font-medium mb-1">
                Nombres
              </label>
              <Input
                id="ln"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="bg-cream/10 border-cream/30 text-cream placeholder:text-cream/50"
                placeholder="Tu nombre"
                maxLength={100}
              />
            </div>
            <div>
              <label htmlFor="le" className="block text-sm font-medium mb-1">
                Email
              </label>
              <Input
                id="le"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="bg-cream/10 border-cream/30 text-cream placeholder:text-cream/50"
                placeholder="tu@email.com"
                maxLength={255}
              />
            </div>
            <div>
              <label htmlFor="lc" className="block text-sm font-medium mb-1">
                Comentarios
              </label>
              <Textarea
                id="lc"
                value={form.comments}
                onChange={(e) => setForm({ ...form, comments: e.target.value })}
                className="bg-cream/10 border-cream/30 text-cream placeholder:text-cream/50 min-h-24"
                placeholder="Cuéntanos qué te gustaría ver..."
                maxLength={1000}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-cream px-6 py-3 font-display font-semibold text-berry transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Unirme al Berry Club"}
            </button>
          </form>

          <div className="space-y-8">
            <div>
              <h3 className="font-display text-2xl font-bold mb-3">Ubicación</h3>
              <p className="flex items-start gap-2 text-cream/90">
                <MapPin size={18} className="mt-1 shrink-0" />
                Av. Principal #123, Centro Comercial Berry, Local 4
              </p>
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold mb-3">Contáctanos</h3>
              <p className="flex items-center gap-2 text-cream/90">
                <Phone size={18} /> +52 555 123 4567
              </p>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-berry transition-transform hover:scale-110"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-cream text-berry transition-transform hover:scale-110"
                >
                  <Facebook size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-16 text-center text-sm text-cream/60">
          © 2026 Berry Munch. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
