
## Plan: Posicionar el logo justo debajo de la navbar

### Diagnóstico
La navbar (`Nav.tsx`) está posicionada con `absolute top-6` y vive dentro del layout padre (probablemente el root o `index`), no dentro de `HeroSection`. La navbar pill mide aproximadamente ~52px de alto + 24px de offset desde arriba = ~76px de espacio ocupado desde el tope de la página.

Actualmente `HeroSection` tiene `pt-16` (64px) y el contenedor del logo `-mt-4` (-16px), dando un offset efectivo de ~48px desde el tope del hero. Pero como la navbar está superpuesta encima del hero (absolute), el logo aparece **debajo** del área de la navbar, no pegado a ella visualmente.

Para que el logo quede inmediatamente debajo de la pill de la navbar, necesita comenzar alrededor de los ~85-95px desde el tope de la página (navbar termina aprox. en ~76px + un pequeño gap de 8-16px).

### Cambios

**Archivo: `src/components/berry/HeroSection.tsx`**

- Cambiar `pt-16` → `pt-24` (96px) en el `<section>` para empujar el logo debajo del área que ocupa la navbar absoluta.
- Eliminar `-mt-4` del contenedor del logo (ya no es necesario el ajuste negativo).

```tsx
<section className="relative min-h-[480px] md:min-h-[540px] lg:min-h-[600px] overflow-hidden bg-white pt-24 pb-12">
  <video ... />
  <div className="relative z-40 mx-auto max-w-7xl px-6 md:px-10">
    <div className="flex flex-col items-start">
      <img src={berryMunchLogo} alt="Berry Munch" className="w-88 md:w-[28rem] lg:w-[32rem] h-auto" />
    </div>
  </div>
</section>
```

### Validación visual
Tras aplicar el cambio, verificar visualmente con screenshot que el logo quede separado de la navbar por aproximadamente 8-16px (un gap pequeño y agradable, no pegado pero tampoco lejos). Si queda demasiado cerca o lejos, ajustar `pt-24` a `pt-20` (80px) o `pt-28` (112px) según corresponda.

### Archivos modificados
- `src/components/berry/HeroSection.tsx`
