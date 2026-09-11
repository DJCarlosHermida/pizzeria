export type CategoryId = "pizzas" | "hamburguesas" | "milanesas" | "promos" | "extras"

export type OptionKind = "gusto" | "proteina"

export type Product = {
  id: string
  name: string
  description: string
  price: number
  category: CategoryId
  image: string
  optionKind?: OptionKind
  highlights?: string[]
  featured?: boolean
}

export type CartItem = {
  lineId: string
  productId: string
  name: string
  qty: number
  unitPrice: number
  optionLabel?: string
}

export type CheckoutForm = {
  name: string
  phone: string
  address: string
  payment: "efectivo" | "transferencia" | ""
  notes: string
}
