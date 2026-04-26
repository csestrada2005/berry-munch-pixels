export {
  type BerryProduct,
  type ProductSize,
  toppings,
  whatsappPhone,
  productPrice,
  whatsappUrl,
  fetchCatalogProducts,
  registerWhatsappOrder,
} from "./adminCatalog";

import { fetchCatalogProducts } from "./adminCatalog";
import berriesCup from "@/assets/berries-cup.png";
import chocolateBerryCup from "@/assets/chocolate-berry-cup.png";
import cup1 from "@/assets/cup1.png";
import cup2 from "@/assets/cup2.png";
import cup3 from "@/assets/cup3.png";
import cup6 from "@/assets/cup6.png";
import pistachioCup from "@/assets/pistachio-cup.png";
import productsGrid from "@/assets/products-grid.png";
import type { BerryProduct } from "./adminCatalog";

export const products: BerryProduct[] = [
  { id: "berry-munch", name: "Berry Munch", category: "Fresas con Chocolate", description: "Nuestro vaso clásico de fresas frescas cubiertas con chocolate Berry Munch.", price: "$140", priceValue: 140, image: berriesCup, imageKey: "berriesCup", featured: true, toppingsNote: "Personalízalo con toppings del menú." },
  { id: "berry-bite", name: "Berry Bite", category: "Fresas con Chocolate", description: "Una versión más ligera para antojos rápidos, con el mismo chocolate de la casa.", price: "$120", priceValue: 120, image: chocolateBerryCup, imageKey: "chocolateBerryCup", featured: true, toppingsNote: "Personalízalo con toppings del menú." },
  { id: "fresas-dubai", name: "Fresas Dubái", category: "Premium", description: "Fresas con chocolate y el crunch estilo Dubái en tamaños G, M y CH.", sizes: [{ label: "G", price: "$250", priceValue: 250 }, { label: "M", price: "$220", priceValue: 220 }, { label: "CH", price: "$190", priceValue: 190 }], image: cup1, imageKey: "cup1", featured: true },
  { id: "fresas-lotus", name: "Fresas Lotus", category: "Premium", description: "Fresas con chocolate y notas caramelizadas de Lotus para un perfil más especiado.", sizes: [{ label: "G", price: "$230", priceValue: 230 }, { label: "M", price: "$200", priceValue: 200 }, { label: "CH", price: "$170", priceValue: 170 }], image: cup2, imageKey: "cup2", featured: true },
  { id: "mix-dubai", name: "Mix Dubái", category: "Premium", description: "Combinación premium con toppings estilo Dubái y chocolate Berry Munch.", sizes: [{ label: "G", price: "$250", priceValue: 250 }, { label: "M", price: "$220", priceValue: 220 }, { label: "CH", price: "$190", priceValue: 190 }], image: cup3, imageKey: "cup3", featured: true },
  { id: "mix-uvas-blueberry", name: "Mix Uvas / Blueberry", category: "Mix", description: "Mix de uvas y blueberry con chocolate, ideal para compartir o probar algo distinto.", sizes: [{ label: "G", price: "$250", priceValue: 250 }, { label: "M", price: "$220", priceValue: 220 }, { label: "CH", price: "$190", priceValue: 190 }], image: cup6, imageKey: "cup6" },
  { id: "relleno-dubai", name: "Relleno Dubai", category: "Especial", description: "Relleno especial Dubái para elevar tu pedido con una capa extra de indulgencia.", price: "$500", priceValue: 500, image: pistachioCup, imageKey: "pistachioCup" },
  { id: "bombones", name: "Bombones", category: "Dulces", description: "Bombones cubiertos para acompañar tu pedido Berry Munch.", price: "$60", priceValue: 60, image: productsGrid, imageKey: "productsGrid" },
  { id: "pretzels", name: "Pretzels", category: "Dulces", description: "Pretzels con chocolate para un contraste crujiente y salado.", price: "$60", priceValue: 60, image: productsGrid, imageKey: "productsGrid" },
];

export const featuredGalleryProductIds = ["berry-munch", "berry-bite", "fresas-dubai", "fresas-lotus", "mix-dubai"];

export function findProduct(id: string) {
  return products.find((product) => product.id === id);
}

export async function findCatalogProduct(id: string) {
  try {
    const catalog = await fetchCatalogProducts();
    return catalog.find((product) => product.id === id) ?? findProduct(id);
  } catch {
    return findProduct(id);
  }
}
