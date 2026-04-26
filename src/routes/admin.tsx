import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { LogOut, Package, ReceiptText, Save, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { fetchEditableProducts, imageMap, productSchema, type EditableProduct } from "@/components/berry/adminCatalog";
import berryLogo from "@/assets/berry-munch-logo.png";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Berry Munch — Productos y pedidos" },
      { name: "description", content: "Panel administrativo para gestionar productos y pedidos Berry Munch." },
      { property: "og:title", content: "Admin Berry Munch" },
      { property: "og:description", content: "Gestión de productos y pedidos Berry Munch." },
    ],
  }),
  component: AdminPage,
});

type Order = {
  id: string;
  product_name: string;
  size_label: string | null;
  quantity: number;
  estimated_total: number | null;
  status: string;
  whatsapp_message: string;
  created_at: string;
};

const statusOptions = ["whatsapp_started", "confirmed", "preparing", "delivered", "cancelled"];

function AdminPage() {
  const [sessionReady, setSessionReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState<EditableProduct[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [tab, setTab] = useState<"products" | "orders">("products");
  const [busy, setBusy] = useState(false);

  const selected = useMemo(() => products.find((product) => product.id === selectedId) ?? products[0], [products, selectedId]);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user.id ?? null);
      setSessionReady(true);
    });

    supabase.auth.getSession().then(({ data: sessionData }) => {
      setUserId(sessionData.session?.user.id ?? null);
      setSessionReady(true);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }
    checkAdmin();
  }, [userId]);

  useEffect(() => {
    if (isAdmin) loadAdminData();
  }, [isAdmin]);

  const checkAdmin = async () => {
    const client = supabase as any;
    const { data } = await client.from("user_roles").select("role").eq("role", "admin").maybeSingle();
    setIsAdmin(Boolean(data));
  };

  const loadAdminData = async () => {
    setBusy(true);
    try {
      const [editableProducts, ordersResult] = await Promise.all([
        fetchEditableProducts(),
        (supabase as any).from("orders").select("*").order("created_at", { ascending: false }).limit(100),
      ]);
      setProducts(editableProducts);
      setSelectedId((current) => current || editableProducts[0]?.id || "");
      setOrders((ordersResult.data ?? []) as Order[]);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No se pudo cargar el panel.");
    } finally {
      setBusy(false);
    }
  };

  const handleAuth = async (event: FormEvent) => {
    event.preventDefault();
    setMessage("");
    setBusy(true);
    try {
      const redirectTo = window.location.origin + "/admin";
      const result = authMode === "signup"
        ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } })
        : await supabase.auth.signInWithPassword({ email, password });
      if (result.error) throw result.error;
      setMessage(authMode === "signup" ? "Revisa tu correo para confirmar tu cuenta." : "Sesión iniciada.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No se pudo iniciar sesión.");
    } finally {
      setBusy(false);
    }
  };

  const handleGoogle = async () => {
    await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/admin" });
  };

  const claimAdmin = async () => {
    setBusy(true);
    const { data, error } = await (supabase as any).rpc("claim_initial_admin");
    setBusy(false);
    if (error) setMessage(error.message);
    else {
      setIsAdmin(Boolean(data));
      setMessage(data ? "Admin activado." : "Ya existe un administrador.");
    }
  };

  const saveProduct = async (product: EditableProduct) => {
    const parsed = productSchema.safeParse({
      id: product.id,
      name: product.name,
      category: product.category,
      description: product.description,
      base_price: product.base_price,
      featured: product.featured,
      active: product.active,
      toppings_note: product.toppings_note,
      sort_order: product.sort_order,
    });
    if (!parsed.success) {
      setMessage("Revisa nombre, categoría, descripción y precio.");
      return;
    }

    setBusy(true);
    const { error } = await (supabase as any)
      .from("admin_products")
      .update(parsed.data)
      .eq("id", product.id);
    setBusy(false);
    if (error) setMessage(error.message);
    else {
      setMessage("Producto guardado.");
      loadAdminData();
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    const { error } = await (supabase as any).from("orders").update({ status }).eq("id", orderId);
    if (error) setMessage(error.message);
    else loadAdminData();
  };

  if (!sessionReady) return <main className="min-h-screen bg-berry p-6 text-cream">Cargando...</main>;

  if (!userId) {
    return (
      <main className="grid min-h-screen place-items-center bg-berry px-5 py-12 text-cream">
        <section className="w-full max-w-md rounded-3xl bg-cream p-7 text-chocolate shadow-2xl">
          <img src={berryLogo} alt="Berry Munch" className="mx-auto mb-6 w-44" />
          <h1 className="font-display text-4xl font-black text-berry">Admin</h1>
          <p className="mt-2 text-sm text-chocolate/70">Acceso para gestionar productos y pedidos.</p>
          <form onSubmit={handleAuth} className="mt-6 space-y-3">
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required placeholder="Email" className="w-full rounded-2xl bg-cream-soft px-4 py-3 outline-none ring-1 ring-berry/15" />
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required minLength={6} placeholder="Contraseña" className="w-full rounded-2xl bg-cream-soft px-4 py-3 outline-none ring-1 ring-berry/15" />
            <button disabled={busy} className="w-full rounded-full bg-berry px-5 py-3 font-display font-bold text-cream disabled:opacity-60">
              {authMode === "login" ? "Entrar" : "Crear cuenta"}
            </button>
          </form>
          <button onClick={handleGoogle} className="mt-3 w-full rounded-full border border-berry/25 px-5 py-3 font-display font-bold text-berry">
            Entrar con Google
          </button>
          <button onClick={() => setAuthMode(authMode === "login" ? "signup" : "login")} className="mt-4 text-sm font-bold text-berry underline underline-offset-4">
            {authMode === "login" ? "Crear cuenta nueva" : "Ya tengo cuenta"}
          </button>
          {message && <p className="mt-4 rounded-2xl bg-cream-soft p-3 text-sm text-chocolate/75">{message}</p>}
        </section>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="grid min-h-screen place-items-center bg-berry px-5 py-12 text-cream">
        <section className="w-full max-w-lg rounded-3xl bg-cream p-7 text-chocolate shadow-2xl">
          <ShieldCheck className="text-berry" size={42} />
          <h1 className="mt-4 font-display text-4xl font-black text-berry">Activar admin</h1>
          <p className="mt-3 text-chocolate/75">Si este es el primer acceso administrativo, activa el rol de admin para esta cuenta.</p>
          <button onClick={claimAdmin} disabled={busy} className="mt-6 rounded-full bg-berry px-6 py-3 font-display font-bold text-cream disabled:opacity-60">
            Activar primer admin
          </button>
          <button onClick={() => supabase.auth.signOut()} className="ml-3 rounded-full border border-berry/30 px-6 py-3 font-display font-bold text-berry">
            Salir
          </button>
          {message && <p className="mt-4 text-sm text-chocolate/75">{message}</p>}
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-cream-soft px-5 py-8 text-chocolate md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-xl italic text-berry">Berry Munch</p>
            <h1 className="font-display text-5xl font-black tracking-normal text-chocolate">Panel admin</h1>
          </div>
          <button onClick={() => supabase.auth.signOut()} className="inline-flex items-center gap-2 rounded-full bg-berry px-5 py-3 font-display font-bold text-cream">
            <LogOut size={18} /> Salir
          </button>
        </header>

        <div className="mt-8 flex gap-3">
          <button onClick={() => setTab("products")} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-display font-bold ${tab === "products" ? "bg-berry text-cream" : "bg-cream text-chocolate"}`}>
            <Package size={18} /> Productos
          </button>
          <button onClick={() => setTab("orders")} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 font-display font-bold ${tab === "orders" ? "bg-berry text-cream" : "bg-cream text-chocolate"}`}>
            <ReceiptText size={18} /> Pedidos
          </button>
        </div>

        {message && <p className="mt-5 rounded-2xl bg-cream p-4 text-sm font-semibold text-berry shadow">{message}</p>}

        {tab === "products" && selected && (
          <section className="mt-6 grid gap-6 lg:grid-cols-[18rem_1fr]">
            <aside className="rounded-3xl bg-cream p-4 shadow-xl">
              {products.map((product) => (
                <button key={product.id} onClick={() => setSelectedId(product.id)} className={`mb-2 block w-full rounded-2xl px-4 py-3 text-left font-bold ${selected.id === product.id ? "bg-berry text-cream" : "bg-cream-soft text-chocolate"}`}>
                  {product.name}
                  {!product.active && <span className="block text-xs opacity-70">Oculto</span>}
                </button>
              ))}
            </aside>
            <ProductEditor product={selected} onChange={(next) => setProducts((current) => current.map((item) => item.id === next.id ? next : item))} onSave={saveProduct} busy={busy} />
          </section>
        )}

        {tab === "orders" && (
          <section className="mt-6 overflow-hidden rounded-3xl bg-cream shadow-xl">
            <div className="grid gap-3 p-4">
              {orders.map((order) => (
                <article key={order.id} className="grid gap-3 rounded-2xl bg-cream-soft p-4 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <p className="font-display text-2xl font-bold text-berry">{order.product_name}{order.size_label ? ` · ${order.size_label}` : ""}</p>
                    <p className="mt-1 text-sm text-chocolate/70">{new Date(order.created_at).toLocaleString("es-MX")} · {order.estimated_total ? `$${order.estimated_total}` : "Sin total"}</p>
                    <p className="mt-2 text-sm text-chocolate/80">{order.whatsapp_message}</p>
                  </div>
                  <select value={order.status} onChange={(event) => updateOrderStatus(order.id, event.target.value)} className="rounded-full bg-cream px-4 py-3 font-bold text-chocolate outline-none">
                    {statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
                  </select>
                </article>
              ))}
              {!orders.length && <p className="p-6 text-center text-chocolate/60">Aún no hay pedidos registrados.</p>}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function ProductEditor({ product, onChange, onSave, busy }: { product: EditableProduct; onChange: (product: EditableProduct) => void; onSave: (product: EditableProduct) => void; busy: boolean }) {
  const preview = imageMap[product.image_key];
  return (
    <section className="rounded-3xl bg-cream p-5 shadow-xl md:p-7">
      <div className="grid gap-6 md:grid-cols-[14rem_1fr]">
        <div className="rounded-3xl bg-cream-soft p-4">
          {preview && <img src={preview} alt={product.name} className="h-56 w-full object-contain" />}
          <label className="mt-4 flex items-center gap-2 font-bold text-berry">
            <input type="checkbox" checked={product.active} onChange={(event) => onChange({ ...product, active: event.target.checked })} /> Visible en tienda
          </label>
          <label className="mt-3 flex items-center gap-2 font-bold text-berry">
            <input type="checkbox" checked={product.featured} onChange={(event) => onChange({ ...product, featured: event.target.checked })} /> Destacado
          </label>
        </div>
        <div className="grid gap-4">
          <input value={product.name} onChange={(event) => onChange({ ...product, name: event.target.value })} className="rounded-2xl bg-cream-soft px-4 py-3 text-lg font-bold outline-none" />
          <input value={product.category} onChange={(event) => onChange({ ...product, category: event.target.value })} className="rounded-2xl bg-cream-soft px-4 py-3 outline-none" />
          <textarea value={product.description} onChange={(event) => onChange({ ...product, description: event.target.value })} rows={4} className="rounded-2xl bg-cream-soft px-4 py-3 outline-none" />
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-bold text-chocolate/70">Precio base
              <input type="number" value={product.base_price ?? ""} onChange={(event) => onChange({ ...product, base_price: event.target.value ? Number(event.target.value) : null })} className="mt-2 w-full rounded-2xl bg-cream-soft px-4 py-3 text-chocolate outline-none" />
            </label>
            <label className="text-sm font-bold text-chocolate/70">Orden
              <input type="number" value={product.sort_order} onChange={(event) => onChange({ ...product, sort_order: Number(event.target.value) })} className="mt-2 w-full rounded-2xl bg-cream-soft px-4 py-3 text-chocolate outline-none" />
            </label>
          </div>
          <button onClick={() => onSave(product)} disabled={busy} className="inline-flex w-fit items-center gap-2 rounded-full bg-berry px-6 py-3 font-display font-bold text-cream disabled:opacity-60">
            <Save size={18} /> Guardar producto
          </button>
        </div>
      </div>
    </section>
  );
}
