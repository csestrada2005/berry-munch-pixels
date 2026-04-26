import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const brandContext = `
Berry Munch es una marca de fresas frescas con chocolate belga premium. Tono: amable, dulce, claro y útil.
Productos de tienda:
- Berry Munch: $140. Vaso clásico de fresas frescas cubiertas con chocolate.
- Berry Bite: $120. Versión más ligera.
- Fresas Dubái: G $250, M $220, CH $190.
- Fresas Lotus: G $230, M $200, CH $170.
- Mix Dubái: G $250, M $220, CH $190.
- Mix Uvas / Blueberry: G $250, M $220, CH $190.
- Relleno Dubai: $500.
- Bombones: $60.
- Pretzels: $60.
Toppings: Oreo $10, Nuez $10, Pretzels $10, Mazapán $10, Bombones $10, Lotus $15, Pistache $15, Chocolate extra $20.
Pedidos tienda: WhatsApp +52 221 348 5534.
Eventos según tabulador:
- Frutas: 50–100 vasos $90 MXN por vaso; 100–200 vasos $85 MXN por vaso; 200 vasos o más $80 MXN por vaso.
- Mix: 100 vasos $95 MXN por vaso; 200 vasos o más $90 MXN por vaso.
- Bote Dubai: 1 bote $4,000 MXN; 2 o más botes $3,500 MXN c/u.
Eventos contacto: teléfono +52 236 105 1055, email berryymunch@gmail.com, Instagram @berrymunch__.
Precios especiales para eventos. Disponibilidad sujeta a agenda y volumen solicitado.
Reglas: responde en español salvo que te hablen en otro idioma. Si preguntan por pedidos o eventos, invita a contactar por WhatsApp. No inventes disponibilidad, sucursales ni políticas no dadas.
`;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = (await req.json()) as { messages?: ChatMessage[] };
    const validMessages = Array.isArray(messages)
      ? messages
          .filter((message) =>
            (message.role === "user" || message.role === "assistant") &&
            typeof message.content === "string" &&
            message.content.trim().length > 0,
          )
          .slice(-12)
      : [];

    if (!validMessages.length) {
      return new Response(JSON.stringify({ error: "Envía una pregunta para Berry Bot." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "El asistente IA no está configurado todavía." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: brandContext },
          ...validMessages,
        ],
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Berry Bot tiene muchas solicitudes. Intenta de nuevo en un momento." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "Berry Bot necesita créditos de IA para seguir respondiendo." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await aiResponse.text();
      console.error("AI gateway error", aiResponse.status, errorText);
      return new Response(JSON.stringify({ error: "Berry Bot no pudo responder ahora." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiResponse.json();
    const reply = data?.choices?.[0]?.message?.content || "¿Me puedes compartir un poco más de detalle?";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("berry-chat error", error);
    return new Response(JSON.stringify({ error: "No pude conectar con Berry Bot." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
