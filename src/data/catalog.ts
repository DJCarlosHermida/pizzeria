import type { CategoryId, Product } from "../types"

export const BRAND = {
  name: "Q'Delicia",
  tagline: "¡En boca de todos!",
  type: "Pizzería",
  zone: "Flor de Maroñas",
  hoursLabel: "Lunes a sábados · 19:00 a 00:00 hs",
  deliveryOnly: true,
  phoneDisplay: "094 430 692",
  whatsappE164: "59894430692",
  timezone: "America/Montevideo",
} as const

export const GUSTOS = [
  "Jamón",
  "Napolitana",
  "Morrones",
  "Aceitunas",
  "Panceta",
  "Huevo",
] as const

export const PROTEINAS = ["Carne", "Pollo"] as const

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "pizzas", label: "Pizzas" },
  { id: "promos", label: "Promos" },
  { id: "milanesas", label: "Milanesas" },
  { id: "extras", label: "Extras" },
]

export const PRODUCTS: Product[] = [
  {
    id: "pizzeta-muzza",
    name: "Pizzeta con muzza",
    description: "Pizzeta recién salida del horno, bien cargada de muzzarella.",
    price: 275,
    category: "pizzas",
    image: "/img/menu/pizzeta-muzza.jpg",
  },
  {
    id: "pizzeta-salsa",
    name: "Pizzeta solo salsa",
    description: "Pizzeta con salsa de tomate, sin muzzarella.",
    price: 240,
    category: "pizzas",
    image: "/img/menu/pizzeta-salsa.jpg",
  },
  {
    id: "pizzeta-gusto",
    name: "Pizzeta con muzza + un gusto",
    description: "Muzzarella y el gusto que elijas.",
    price: 335,
    category: "pizzas",
    image: "/img/menu/pizzeta-jamon.jpg",
    optionKind: "gusto",
  },
  {
    id: "medio-metro-muzza",
    name: "1/2 metro con muzza",
    description: "Medio metro de pizza, mucha muzzarella.",
    price: 295,
    category: "pizzas",
    image: "/img/menu/metro-muzza.jpg",
  },
  {
    id: "metro-muzza",
    name: "1 metro con muzza",
    description: "Un metro de pizza para compartir, bien cargada.",
    price: 550,
    category: "pizzas",
    image: "/img/menu/metro-muzza.jpg",
  },
  {
    id: "metro-gusto",
    name: "1 metro con muzza + un gusto",
    description: "Metro de muzzarella con el gusto que elijas.",
    price: 655,
    category: "pizzas",
    image: "/img/menu/pizzeta-jamon.jpg",
    optionKind: "gusto",
  },
  {
    id: "promo-burgers",
    name: "2 hamburguesas doble carne + fritas",
    description: "Hamburguesas caseras doble carne. Promo del día.",
    price: 420,
    category: "promos",
    image: "/img/menu/burger.jpg",
    featured: true,
    highlights: ["Cheddar", "Panceta", "Ketchup", "Mayonesa", "Huevo frito", "Cebolla"],
  },
  {
    id: "promo-metro-limol",
    name: "1 metro de muzza + 2 fainá + Limol 2 L",
    description: "Combo para compartir: metro, fainá y refresco.",
    price: 780,
    category: "promos",
    image: "/img/menu/combo.jpg",
  },
  {
    id: "promo-medio-faina",
    name: "1/2 metro de muzza + 2 fainá",
    description: "Medio metro de muzzarella con dos fainá.",
    price: 475,
    category: "promos",
    image: "/img/menu/faina.jpg",
  },
  {
    id: "milanesa-pan",
    name: "Milanesa en dos panes completa + fritas",
    description: "Completa, con cheddar y panceta en las fritas.",
    price: 575,
    category: "milanesas",
    image: "/img/menu/milanesa-pan.jpg",
    highlights: [
      "Ketchup",
      "Mayonesa",
      "Cebolla",
      "Lechuga",
      "Tomate",
      "Panceta",
      "Jamón",
      "Muzza",
      "Huevo frito",
    ],
  },
  {
    id: "milanesa-napo",
    name: "Milanesa napolitana para 2 + frita y mixta",
    description: "Napolitana para compartir. Elegí carne o pollo.",
    price: 705,
    category: "milanesas",
    image: "/img/menu/milanesa-napo.jpg",
    optionKind: "proteina",
  },
  {
    id: "faina",
    name: "Porción fainá",
    description: "Porción de fainá para acompañar la pizza.",
    price: 90,
    category: "extras",
    image: "/img/menu/faina.jpg",
  },
]

export const SPECIALTIES = [
  {
    id: "muzza",
    label: "Muzzarella",
    detail: "Bien cargadas, recién del horno",
    image: "/img/menu/pizzeta-muzza.jpg",
    to: "/menu?cat=pizzas",
    featured: true,
  },
  {
    id: "burgers",
    label: "Hamburguesas",
    detail: "Caseras, doble carne",
    image: "/img/menu/burger.jpg",
    to: "/menu?cat=promos",
    featured: false,
  },
  {
    id: "napo",
    label: "Napolitana",
    detail: "Milanesa para compartir",
    image: "/img/menu/milanesa-napo.jpg",
    to: "/menu#milanesa-napo",
    featured: false,
  },
  {
    id: "milanesas",
    label: "Milanesas",
    detail: "Completas, al pan o napolitana",
    image: "/img/menu/milanesa-pan.jpg",
    to: "/menu?cat=milanesas",
    featured: false,
  },
] as const

export const FEATURES = [
  { id: "envio", title: "Envíos rápidos", text: "Solo delivery en Flor de Maroñas." },
  { id: "queso", title: "Mucho queso", text: "Bien cargadas, con muzzarella de verdad." },
  { id: "horno", title: "Recién salidas del horno", text: "Calientes, listas para la mesa." },
] as const

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((item) => item.id === id)
}

