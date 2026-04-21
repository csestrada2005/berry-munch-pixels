
## Plan: Eliminar tinte rojo del video en Hero Section

### Problema identificado
El video en la hero section sigue viéndose con tinte rojizo a pesar de haber cambiado el fondo a blanco. Tras revisar `src/components/berry/HeroSection.tsx`, identifiqué dos causas:

1. **Clase `text-cream`** aplicada al `<section>`: aunque es para texto, no afecta el color del video, pero indica intención de tinte cálido en el contenedor.
2. **Causa principal — overlay residual**: existe un `<div className="absolute inset-0 bg-white/0 z-10">` que aunque tiene opacidad 0, ocupa espacio en el árbol. No es el culpable real.
3. **Causa real más probable**: el video MP4 fue generado con tonos cálidos/rojizos intrínsecos (fresas + chocolate). El "tinte" no proviene de CSS sino del contenido propio del video. Adicionalmente, navegadores pueden aplicar perfiles de color que acentúan los rojos saturados.

### Solución
Aplicar un filtro CSS al elemento `<video>` que neutralice la dominante roja sin desaturar completamente la imagen:

- Usar `filter: saturate(0.85) hue-rotate(-5deg)` para reducir ligeramente la saturación de los rojos y desplazar el matiz hacia tonos neutros.
- Eliminar el overlay `bg-white/0` innecesario.
- Quitar la clase `text-cream` del `<section>` (no aporta nada al no haber texto).

### Cambios

**Archivo: `src/components/berry/HeroSection.tsx`**

```tsx
<section className="relative min-h-[480px] md:min-h-[540px] lg:min-h-[600px] overflow-hidden bg-white pt-20 pb-12">
  <video
    src={heroVideo}
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 h-full w-full object-cover z-0"
    style={{ filter: "saturate(0.85) hue-rotate(-8deg)" }}
  />
  {/* Overlay eliminado */}
  <div className="relative z-40 mx-auto max-w-7xl px-6 md:px-10">
    <div className="flex flex-col items-start">
      <img src={berryMunchLogo} alt="Berry Munch" className="w-88 md:w-[28rem] lg:w-[32rem] h-auto" />
    </div>
  </div>
</section>
```

### Notas técnicas
- Si tras aplicar el filtro persiste el tinte, significa que el video en sí tiene rojos muy dominantes (es contenido de fresas) y se requeriría un ajuste mayor (`saturate(0.7)`) o reemplazar el video. Empezamos con un ajuste sutil para no perder el aspecto natural del producto.
- No se modifican otros archivos.
