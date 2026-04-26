import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
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
  priceValue: number;
};

export type BerryProduct = {
  id: string;
  name: string;
  category: string;
  description: string;
  price?: string;
  priceValue?: number;
  sizes?: ProductSize[];
  image: string;
  imageKey: string;
  featured?: boolean;
  active?: boolean;
  toppingsNote?: string | null;
  sortOrder?: number;
};

export type EditableProduct = {
  id: string;
  name: string;
  category: string;
  description: string;
  base_price: number | null;
  image_key: string;
  featured: boolean;
  active: boolean;
  toppings_note: string | null;
  sort_order: number;
  admin_product_sizes?: Array<{ label: "G" | "M" | "CH"; price: number; sort_order: number }>;
};

export const imageMap: Record<string, string> = {
  berriesCup,
  chocolateBerryCup,
  cup1,
  cup2,
  cup3,
  cup6,
  pistachioCup,
  productsGrid,
};

export const productSchema = z.object({
  id: z.string().trim().min(2).max(60).regex(/^[a-z0-9-]+$/),
  name: z.string().trim().min(1).max(80),
  category: z.string().trim().min(1).max(80),
  description: z.string().trim().min(1).max(500),
  base_price: z.number().int().min(0).nullable(),
  featured: z.boolean(),
  active: z.boolean(),
  toppings_note: z.string().trim().max(250).nullable(),
  sort_order: z.number().int().min(0).max(9999),
});

export const orderSchema = z.object({
  productId: z.string().trim().min(1).max(80),
  productName: z.string().trim().min(1).max(120),
  sizeLabel: z.enum(["G", "M", "CH"]).nullable(),
  estimatedTotal: z.number().int().min(0).nullable(),
  quantity: z.number().int().min(1).max(99),
});

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

export const whatsappPhone = "522213485534";

export function formatPrice(value: number) {
  return `$${value}`;
}

export function productPrice(product: BerryProduct) {
  return product.price ?? product.sizes?.map((size) => `${size.label} ${size.price}`).join(" · ") ?? "";
}

export function productToWhatsappMessage(product: BerryProduct, size?: string) {
  const sizeText = size ? ` tamaño ${size}` : "";
  return `Hola Berry Munch, quiero pedir ${product.name}${sizeText}.`;
}

export function whatsappUrl(product: BerryProduct, size?: string) {
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(productToWhatsappMessage(product, size))}`;
}

export function normalizeProduct(product: EditableProduct): BerryProduct {
  const sizes = product.admin_product_sizes
    ?.slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((size) => ({ label: size.label, price: formatPrice(size.price), priceValue: size.price }));

  return {
    id: product.id,
    name: product.name,
    category: product.category,
    description: product.description,
    price: product.base_price == null ? undefined : formatPrice(product.base_price),
    priceValue: product.base_price ?? undefined,
    sizes: sizes?.length ? sizes : undefined,
    image: imageMap[product.image_key] ?? productsGrid,
    imageKey: product.image_key,
    featured: product.featured,
    active: product.active,
    toppingsNote: product.toppings_note,
    sortOrder: product.sort_order,
  };
}

export async function fetchCatalogProducts(includeInactive = false) {
  const client = supabase as any;
  let query = client
    .from("admin_products")
    .select("*, admin_product_sizes(label, price, sort_order)")
    .order("sort_order", { ascending: true });

  if (!includeInactive) query = query.eq("active", true);

  const { data, error } = await query;
  if (error) throw error;
  return ((data ?? []) as EditableProduct[]).map(normalizeProduct);
}

export async function fetchEditableProducts() {
  const client = supabase as any;
  const { data, error } = await client
    .from("admin_products")
    .select("*, admin_product_sizes(label, price, sort_order)")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as EditableProduct[];
}

export async function registerWhatsappOrder(product: BerryProduct, sizeLabel?: "G" | "M" | "CH") {
  const size = product.sizes?.find((item) => item.label === sizeLabel);
  const estimatedTotal = size?.priceValue ?? product.priceValue ?? null;
  const whatsappMessage = productToWhatsappMessage(product, sizeLabel);
  const parsed = orderSchema.parse({
    productId: product.id,
    productName: product.name,
    sizeLabel: sizeLabel ?? null,
    estimatedTotal,
    quantity: 1,
  });

  const client = supabase as any;
  await client.from("orders").insert({
    product_id: parsed.productId,
    product_name: parsed.productName,
    size_label: parsed.sizeLabel,
    quantity: parsed.quantity,
    estimated_total: parsed.estimatedTotal,
    status: "whatsapp_started",
    whatsapp_message: whatsappMessage,
  });

  window.open(`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`, "_blank", "noopener,noreferrer");
}
