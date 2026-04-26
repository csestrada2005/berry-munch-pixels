import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/berry/Nav";
import {
  findProduct,
  productPrice,
  toppings,
  whatsappUrl,
} from "@/components/berry/productCatalog";

export const Route = createFileRoute("/berries/$berryId")({
  loader: ({ params }) => {
    const product = findProduct(params.berryId);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData.name} — Berry Munch` },
      { name: "description", content: loaderData.description },
      { property: "og:title", content: `${loaderData.name} — Berry Munch` },
      { property: "og:description", content: loaderData.description },
    ],
  }),
  notFoundComponent: ProductNotFound,
  errorComponent: ProductError,
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-berry text-cream">
      <Nav />
      <section className="px-5 pb-16 pt-24 md:px-8 md:pt-28">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <div className="relative rounded-[2rem] bg-cream p-8 shadow-2xl">
            <img
              src={product.image}
              alt={product.name}
              className="mx-auto h-[22rem] w-full object-contain md:h-[30rem]"
              loading="eager"
              decoding="async"
            />
          </div>

          <div>
            <Link
              to="/tienda"
              className="font-display text-base italic text-cream/75 underline decoration-cream/40 underline-offset-8 transition hover:text-cream"
            >
              Volver a tienda
            </Link>
            <p className="mt-8 font-bold uppercase tracking-[0.24em] text-cream/70">{product.category}</p>
            <h1 className="mt-4 font-display text-6xl font-black leading-none tracking-normal md:text-8xl">
              {product.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85">{product.description}</p>

            <div className="mt-8 rounded-3xl bg-chocolate p-5 shadow-xl md:p-6">
              {product.sizes ? (
                <div className="grid grid-cols-3 gap-3">
                  {product.sizes.map((size) => (
                    <a
                      key={size.label}
                      href={whatsappUrl(product, size.label)}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-2xl bg-cream px-4 py-5 text-center text-chocolate transition-transform hover:scale-105"
                    >
                      <span className="block font-display text-2xl font-black">{size.label}</span>
                      <span className="mt-1 block font-bold text-berry">{size.price}</span>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-between gap-5 rounded-2xl bg-cream px-5 py-5 text-chocolate">
                  <span className="font-display text-3xl font-black text-berry">{productPrice(product)}</span>
                  <a
                    href={whatsappUrl(product)}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-berry px-6 py-3 font-display font-bold text-cream transition-transform hover:scale-105"
                  >
                    Comprar
                  </a>
                </div>
              )}
            </div>

            {product.toppingsNote && (
              <div className="mt-8">
                <p className="font-display text-xl font-bold">{product.toppingsNote}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {toppings.map((topping) => (
                    <span key={topping.name} className="rounded-full bg-cream/95 px-4 py-2 text-sm font-bold text-chocolate">
                      {topping.name} {topping.price}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function ProductNotFound() {
  return (
    <main className="min-h-screen bg-berry px-6 py-16 text-cream">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center gap-6">
        <h1 className="font-display text-5xl font-black">Producto no encontrado</h1>
        <Link to="/tienda" className="font-display text-lg italic underline decoration-cream/60 underline-offset-8">
          Volver a tienda
        </Link>
      </div>
    </main>
  );
}

function ProductError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen bg-berry px-6 py-16 text-cream">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center gap-6">
        <h1 className="font-display text-5xl font-black">Algo salió mal</h1>
        <p className="text-cream/80">{error.message}</p>
        <button onClick={reset} className="w-fit rounded-full bg-cream px-6 py-3 font-display font-bold text-berry">
          Intentar de nuevo
        </button>
      </div>
    </main>
  );
}