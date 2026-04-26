import { useRef, useState } from "react";
import { Bot, MessageCircle, Send, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterMessages: ChatMessage[] = [
  {
    role: "assistant",
    content: "¡Hola! Soy el asistente de Berry Munch. Puedo ayudarte con productos, precios, eventos y pedidos.",
  },
];

export function BerryChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/berry-chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "No pude responder en este momento.");

      setMessages((current) => [
        ...current,
        { role: "assistant", content: data.reply || "¿Me puedes repetir tu pregunta?" },
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "No pude conectar con el asistente. Intenta de nuevo en un momento.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {open && (
        <section className="mb-4 flex h-[min(34rem,calc(100vh-7rem))] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-3xl border border-cream/50 bg-cream text-chocolate shadow-2xl">
          <header className="flex items-center justify-between gap-3 bg-berry px-5 py-4 text-cream">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/20">
                <Bot size={20} />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold tracking-normal">Berry Bot</h2>
                <p className="text-xs font-semibold text-cream/75">Productos · Eventos · Pedidos</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/15 text-cream transition hover:bg-cream/25"
              aria-label="Cerrar chatbot"
            >
              <X size={18} />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-cream-soft p-4">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    message.role === "user" ? "bg-berry text-cream" : "bg-cream text-chocolate"
                  }`}
                >
                  {message.content}
                </p>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <p className="rounded-2xl bg-cream px-4 py-3 text-sm font-semibold text-chocolate shadow-sm">
                  Escribiendo...
                </p>
              </div>
            )}
          </div>

          <form
            className="border-t border-berry/10 bg-cream p-3"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <div className="flex items-end gap-2 rounded-2xl bg-cream-soft p-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                rows={2}
                placeholder="Pregunta por eventos o productos..."
                className="min-h-12 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-chocolate outline-none placeholder:text-chocolate/50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-berry text-cream transition hover:scale-105 disabled:opacity-50"
                aria-label="Enviar mensaje"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="ml-auto flex h-16 w-16 items-center justify-center rounded-full bg-berry text-cream shadow-2xl ring-4 ring-cream/70 transition hover:scale-105"
        aria-label="Abrir chatbot IA"
      >
        {open ? <X size={24} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}
