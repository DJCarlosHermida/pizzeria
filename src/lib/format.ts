export function formatPrice(n: number): string {
  return `$${n.toLocaleString("es-UY")}`
}

export function lineIdFor(productId: string, optionLabel?: string): string {
  return optionLabel ? `${productId}::${optionLabel}` : productId
}
