import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Nav } from "@/components/berry/Nav";
import {
  fetchCatalogProducts,
  products,
  productPrice,
  registerWhatsappOrder,
  toppings,
  type BerryProduct,
} from "@/components/berry/productCatalog";
import berryLogo from "@/assets/berry-munch-logo.png";

export const Route = createFileRoute("/tienda")({
  head: () => ({
    meta: [
      { title: "Tienda Berry Munch — Menú a domicilio" },
      {
        name: "description",
        content: "Menú Berry Munch a domicilio: fresas con chocolate, premium, mix, toppings y dulces.",
      },
      { property: "og:title", content: "Tienda Berry Munch — Menú a domicilio" },
      {
        property: "og:description",
        content: "Pide fresas con chocolate, toppings y dulces Berry Munch por WhatsApp.",
      },
    ],
  }),
  component: TiendaPage,
});

function TiendaPage() {
  const [catalogProducts, setCatalogProducts] = useState<BerryProduct[]>(products);
  const featured = catalogProducts.filter((product) => product.featured);

  useEffect(() => {
    fetchCatalogProducts().then(setCatalogProducts).catch(() => setCatalogProducts(products));
  }, []);

  return (
    <main className="min-h-screen bg-berry text-cream">
      <Nav />
      <section className="relative overflow-hidden px-5 pb-16 pt-24 md:px-8 md:pt-28">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <img src={berryLogo} alt="Berry Munch" className="mb-8 h-auto w-44 md:w-56" />
            <p className="font-display text-xl italic text-cream/90">Pedidos a domicilio</p>
            <h1 className="mt-3 font-display text-6xl font-black leading-none tracking-normal md:text-8xl">
              Tienda
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-cream/85 md:text-lg">
              Fresas frescas, chocolate y toppings para pedir directo por WhatsApp.
            </p>
            <a
              href="https://wa.me/522213485534?text=Hola%20Berry%20Munch%2C%20quiero%20hacer%20un%20pedido."
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-full bg-cream px-7 py-3 font-display text-lg font-bold text-berry shadow-xl transition-transform hover:scale-105"
            >
              Pedir por WhatsApp
            </a>
          </div>

          <div className="rounded-[2rem] bg-cream p-5 text-chocolate shadow-2xl md:p-7">
            <div className="grid grid-cols-2 gap-4">
              {featured.slice(0, 4).map((product) => (
                <ProductTile key={product.id} product={product} compact />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-soft px-5 py-14 text-chocolate md:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-4xl font-black tracking-normal md:text-6xl">Menú</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {catalogProducts.map((product) => (
              <ProductTile key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-berry px-5 py-14 text-cream md:px-8">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-chocolate p-7 shadow-2xl md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-display text-lg italic text-cream/80">Extras</p>
              <h2 className="font-display text-4xl font-black tracking-normal md:text-5xl">Toppings</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-cream/75">
              Agrégalos a tus fresas con chocolate o confirma disponibilidad al pedir.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {toppings.map((topping) => (
              <div key={topping.name} className="rounded-2xl bg-cream/95 px-4 py-4 text-chocolate">
                <p className="font-display text-lg font-bold">{topping.name}</p>
                <p className="mt-1 font-bold text-berry">{topping.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductTile({ product, compact = false }: { product: BerryProduct; compact?: boolean }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-cream text-chocolate shadow-xl ring-2 ring-berry/10">
      <Link to="/berries/$berryId" params={{ berryId: product.id }} className="block">
        <div className={`${compact ? "h-36" : "h-48"} relative bg-cream-soft`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-5">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-berry">{product.category}</p>
          <h3 className="mt-2 font-display text-2xl font-bold tracking-normal">{product.name}</h3>
          {!compact && <p className="mt-2 text-sm leading-relaxed text-chocolate/75">{product.description}</p>}
          <p className="mt-4 font-display text-xl font-bold text-berry">{productPrice(product)}</p>
        </div>
      </Link>
      {!compact && (
        <div className="px-5 pb-5">
          <button
            type="button"
            onClick={() => registerWhatsappOrder(product)}
            className="inline-flex w-full justify-center rounded-full bg-berry px-5 py-2.5 font-display font-bold text-cream transition-transform hover:scale-[1.02]"
          >
            Comprar
          </button>
        </div>
      )}
    </article>
  );
}