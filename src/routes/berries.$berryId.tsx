import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/berries/$berryId")({
  head: () => ({
    meta: [
      { title: "Berry Creation — Berry Munch" },
      {
        name: "description",
        content: "A preview page for a Berry Munch berry creation.",
      },
      { property: "og:title", content: "Berry Creation — Berry Munch" },
      {
        property: "og:description",
        content: "A preview page for a Berry Munch berry creation.",
      },
    ],
  }),
  component: BerryStubPage,
});

function BerryStubPage() {
  const { berryId } = Route.useParams();

  return (
    <main className="min-h-screen bg-berry px-6 py-16 text-cream">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center gap-8">
        <p className="font-display text-2xl italic">Berry creation #{berryId}</p>
        <h1 className="font-display text-6xl font-black leading-none md:text-8xl">
          Coming soon
        </h1>
        <p className="max-w-xl text-lg text-cream/85">
          This berry page is ready to become a full product detail view.
        </p>
        <Link
          to="/"
          className="font-display text-lg italic underline decoration-cream/60 underline-offset-8 transition hover:text-berry-pink"
        >
          Back to Berry Munch
        </Link>
      </div>
    </main>
  );
}