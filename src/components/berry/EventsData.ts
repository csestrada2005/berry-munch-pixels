export const eventContact = {
  phoneDisplay: "+52 236 105 1055",
  phoneWhatsApp: "522361051055",
  email: "berryymunch@gmail.com",
  instagram: "@berrymunch__",
};

export const eventPackages = [
  {
    id: "frutas",
    title: "Frutas",
    subtitle: "Vasos con fresas premium cubiertas con chocolate belga.",
    tiers: [
      { volume: "50 – 100 vasos", price: "$90 MXN", note: "por vaso" },
      { volume: "100 – 200 vasos", price: "$85 MXN", note: "por vaso" },
      { volume: "200 vasos o más", price: "$80 MXN", note: "por vaso" },
    ],
  },
  {
    id: "mix",
    title: "Mix",
    subtitle: "Combinaciones Berry Munch para mesas dulces y momentos especiales.",
    tiers: [
      { volume: "100 vasos", price: "$95 MXN", note: "por vaso" },
      { volume: "200 vasos o más", price: "$90 MXN", note: "por vaso" },
    ],
  },
  {
    id: "bote-dubai",
    title: "Bote Dubai",
    subtitle: "Formato especial para eventos con el sabor premium de la casa.",
    tiers: [
      { volume: "1 bote", price: "$4,000 MXN", note: "" },
      { volume: "2 o más botes", price: "$3,500 MXN", note: "c/u" },
    ],
  },
];

export function eventWhatsAppUrl() {
  const message = "Hola Berry Munch, quiero cotizar un evento.";
  return `https://wa.me/${eventContact.phoneWhatsApp}?text=${encodeURIComponent(message)}`;
}
