import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Restablecer contraseña — Berry Munch" }] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const updatePassword = async (event: FormEvent) => {
    event.preventDefault();
    if (!window.location.hash.includes("type=recovery")) {
      setMessage("Abre esta página desde el enlace de recuperación de tu correo.");
      return;
    }
    const { error } = await supabase.auth.updateUser({ password });
    setMessage(error ? error.message : "Contraseña actualizada. Ya puedes entrar al panel.");
  };

  return (
    <main className="grid min-h-screen place-items-center bg-berry px-5 text-cream">
      <form onSubmit={updatePassword} className="w-full max-w-md rounded-3xl bg-cream p-7 text-chocolate shadow-2xl">
        <h1 className="font-display text-4xl font-black text-berry">Nueva contraseña</h1>
        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required minLength={6} className="mt-6 w-full rounded-2xl bg-cream-soft px-4 py-3 outline-none" />
        <button className="mt-4 w-full rounded-full bg-berry px-5 py-3 font-display font-bold text-cream">Guardar</button>
        {message && <p className="mt-4 text-sm text-chocolate/75">{message}</p>}
      </form>
    </main>
  );
}
