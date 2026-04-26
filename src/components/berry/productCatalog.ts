import berriesCup from "@/assets/berries-cup.png";
import chocolateBerryCup from "@/assets/chocolate-berry-cup.png";
import cup1 from "@/assets/cup1.png";
import cup2 from "@/assets/cup2.png";
import cup3 from "@/assets/cup3.png";
import cup6 from "@/assets/cup6.png";
import pistachioCup from "@/assets/pistachio-cup.png";
import productsGrid from "@/assets/products-grid.png";

export type ProductSize = {
  label: "G" | "M" | "CH";
  price: string;
};

export type BerryProduct = {
  id: string;
  name: string;
  category: string;
  description: string;
  price?: string;
  sizes?: ProductSize[];
  image: string;
  featured?: boolean;
  toppingsNote?: string;
};

export const toppings = [
  { name: "Oreo", price: "$10" },
  { name: "Nuez", price: "$10" },
  { name: "Pretzels", price: "$10" },
  { name: "Mazapán", price: "$10" },
  { name: "Bombones", price: "$10" },
  { name: "Lotus", price: "$15" },
  { name: "Pistache", price: "$15" },
  { name: "Chocolate extra", price: "$20" },
];

const premiumSizes: ProductSize[] = [
  { label: "G", price: "$250" },
  { label: "M", price: "$220" },
  { label: "CH", price: "$190" },
];

export const products: BerryProduct[] = [
  {
    id: "berry-munch",
    name: "Berry Munch",
    category: "Fresas con Chocolate",
    description: "Nuestro vaso clásico de fresas frescas cubiertas con chocolate Berry Munch.",
    price: "$140",
    image: berriesCup,
    featured: true,
    toppingsNote: "Personalízalo con toppings del menú.",
  },
  {
    id: "berry-bite",
    name: "Berry Bite",
    category: "Fresas con Chocolate",
    description: "Una versión más ligera para antojos rápidos, con el mismo chocolate de la casa.",
    price: "$120",
    image: chocolateBerryCup,
    featured: true,
    toppingsNote: "Personalízalo con toppings del menú.",
  },
  {
    id: "fresas-dubai",
    name: "Fresas Dubái",
    category: "Premium",
    description: "Fresas con chocolate y el crunch estilo Dubái en tamaños G, M y CH.",
    sizes: premiumSizes,
    image: cup1,
    featured: true,
  },
  {
    id: "fresas-lotus",
    name: "Fresas Lotus",
    category: "Premium",
    description: "Fresas con chocolate y notas caramelizadas de Lotus para un perfil más especiado.",
    sizes: [
      { label: "G", price: "$230" },
      { label: "M", price: "$200" },
      { label: "CH", price: "$170" },
    ],
    image: cup2,
    featured: true,
  },
  {
    id: "mix-dubai",
    name: "Mix Dubái",
    category: "Premium",
    description: "Combinación premium con toppings estilo Dubái y chocolate Berry Munch.",
    sizes: premiumSizes,
    image: cup3,
    featured: true,
  },
  {
    id: "mix-uvas-blueberry",
    name: "Mix Uvas / Blueberry",
    category: "Mix",
    description: "Mix de uvas y blueberry con chocolate, ideal para compartir o probar algo distinto.",
    sizes: premiumSizes,
    image: cup6,
  },
  {
    id: "relleno-dubai",
    name: "Relleno Dubai",
    category: "Especial",
    description: "Relleno especial Dubái para elevar tu pedido con una capa extra de indulgencia.",
    price: "$500",
    image: pistachioCup,
  },
  {
    id: "bombones",
    name: "Bombones",
    category: "Dulces",
    description: "Bombones cubiertos para acompañar tu pedido Berry Munch.",
    price: "$60",
    image: productsGrid,
  },
  {
    id: "pretzels",
    name: "Pretzels",
    category: "Dulces",
    description: "Pretzels con chocolate para un contraste crujiente y salado.",
    price: "$60",
    image: productsGrid,
  },
];

export const featuredGalleryProductIds = [
  "berry-munch",
  "berry-bite",
  "fresas-dubai",
  "fresas-lotus",
  "mix-dubai",
];

export const whatsappPhone = "522213485534";

export function productPrice(product: BerryProduct) {
  return product.price ?? product.sizes?.map((size) => `${size.label} ${size.price}`).join(" · ") ?? "";
}

export function whatsappUrl(product: BerryProduct, size?: string) {
  const sizeText = size ? ` tamaño ${size}` : "";
  const message = `Hola Berry Munch, quiero pedir ${product.name}${sizeText}.`;
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

export function findProduct(id: string) {
  return products.find((product) => product.id === id);
}