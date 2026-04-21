

## Plan: Recrear la sección "¿Quiénes Somos?" según la referencia

Reorganizar el layout actual de `AboutSection.tsx` para que coincida con la imagen de referencia, manteniendo todos los elementos como componentes/imágenes individuales (responsive, editable, SEO-friendly).

### Cambios de layout

Pasar de la grid simétrica de 3 columnas a una composición asimétrica de 3 columnas con proporciones distintas:

```text
┌──────────────────────────────────────────────────────────────┐
│  [chocolate drip — sin cambios]                              │
│                                                              │
│  ┌─────────────┐  ┌──────────────────────┐  ┌─────────────┐ │
│  │             │  │  ¿QUIÉNES SOMOS?     │  │  polaroid 1 │ │
│  │  receipt-   │  │  (alineado izq)      │  │  (mercado)  │ │
│  │  fork.png   │  │                      │  │             │ │
│  │  (grande,   │  │  Párrafo descriptivo │  │  polaroid 2 │ │
│  │  colgando)  │  │  debajo del heading  │  │  (clientes) │ │
│  │             │  │                      │  │             │ │
│  │             │  │  [berries-cup +      │  │             │ │
│  │             │  │   callouts centrado] │  │             │ │
│  └─────────────┘  └──────────────────────┘  └─────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

### Detalles técnicos (`src/components/berry/AboutSection.tsx`)

1. **Grid principal**: cambiar a `md:grid-cols-[1fr_2fr_1fr]` para dar más espacio a la columna central (texto + cup).
2. **Columna izquierda**: solo `receipt-fork.png`, alineado al top, ligeramente más grande (`w-56 md:w-64`), con la rotación actual `-rotate-3`.
3. **Columna central**:
   - Heading `¿QUIÉNES SOMOS?` alineado a la izquierda (no centrado), quitar el `ml-` actual.
   - Párrafo nuevo (texto de la referencia: *"En Berrymunch, diseñamos momentos de pausa…"*) alineado a la izquierda debajo del heading, ancho limitado.
   - Debajo: el bloque `berries-cup` + `callouts` superpuestos, centrado horizontalmente, escala similar a la actual.
4. **Columna derecha**: las dos polaroids apiladas verticalmente con un leve solapamiento (`-mt-8` en la segunda) y rotaciones opuestas (`rotate-3` y `-rotate-2`).
5. **Texto del párrafo**: actualizar al copy de la referencia (más editorial). Si prefieres mantener el texto actual, lo conservo — confírmame.
6. **Espaciado vertical**: ajustar `-mt-40 md:-mt-56` actual si es necesario para que el receipt no se monte demasiado sobre el chocolate drip.
7. **Responsive**: en mobile (`<md`), apilar las 3 columnas verticalmente en orden: heading+párrafo → receipt → cup → polaroids.

### Validación

Tras aplicar, capturar screenshot a 1280px y a 375px para verificar que coincide con la referencia en desktop y se mantiene legible en mobile.

### Archivos modificados

- `src/components/berry/AboutSection.tsx` (único archivo)

