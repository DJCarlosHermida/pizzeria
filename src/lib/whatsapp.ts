import { BRAND } from "../data/catalog"
import { formatPrice } from "./format"
import type { CartItem, CheckoutForm } from "../types"

export function buildWhatsAppMessage(
  items: CartItem[],
  form: CheckoutForm,
  closed: boolean,
): string {
  const lines = items.map((item) => {
    const option = item.optionLabel ? ` (${item.optionLabel})` : ""
    const subtotal = formatPrice(item.unitPrice * item.qty)
    return `- ${item.qty}x ${item.name}${option} — ${subtotal}`
  })

  const total = items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0)
  const payment = form.payment === "transferencia" ? "Transferencia" : "Efectivo"

  const header = [
    `Pedido ${BRAND.name}`,
    closed ? "(Pedido enviado fuera de horario)" : null,
    `Nombre: ${form.name.trim()}`,
    `Dirección: ${form.address.trim()} (${BRAND.zone})`,
    `Tel: ${form.phone.trim()}`,
    `Pago: ${payment}`,
    form.notes.trim() ? `Notas: ${form.notes.trim()}` : null,
    "",
    ...lines,
    "",
    `Total: ${formatPrice(total)}`,
  ].filter((line): line is string => line !== null)

  return header.join("\n")
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${BRAND.whatsappE164}?text=${encodeURIComponent(message)}`
}

export function whatsappBlankUrl(): string {
  return `https://wa.me/${BRAND.whatsappE164}`
}
