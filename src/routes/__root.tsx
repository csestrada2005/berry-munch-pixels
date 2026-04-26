import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { SprinklesCursor } from "@/components/berry/SprinklesCursor";
import { BerryChatbot } from "@/components/berry/BerryChatbot";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-bold text-berry">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-berry px-6 py-2 text-sm font-medium text-cream transition-colors hover:bg-berry-deep"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Berry Munch — The Berry Sweet" },
      {
        name: "description",
        content:
          "Berry Munch — fresas frescas con chocolate belga premium. Descubre nuestros sabores y únete a nuestro programa de lealtad.",
      },
      { name: "author", content: "Berry Munch" },
      { property: "og:title", content: "Berry Munch — The Berry Sweet" },
      {
        property: "og:description",
        content: "Fresas frescas con chocolate belga premium.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "Berry Munch — The Berry Sweet" },
      { name: "description", content: "Berry Munch Website is a dynamic, interactive web experience built from a Figma design." },
      { property: "og:description", content: "Berry Munch Website is a dynamic, interactive web experience built from a Figma design." },
      { name: "twitter:description", content: "Berry Munch Website is a dynamic, interactive web experience built from a Figma design." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/50c7056a-2d2f-4ba8-963b-41ece12279a3/id-preview-daebc922--861b12b8-d1e2-4f48-959b-44bf215e496f.lovable.app-1777052804960.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/50c7056a-2d2f-4ba8-963b-41ece12279a3/id-preview-daebc922--861b12b8-d1e2-4f48-959b-44bf215e496f.lovable.app-1777052804960.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Great+Vibes&family=Inter:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <BerryChatbot />
        <SprinklesCursor />
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
