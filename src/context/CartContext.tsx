import { useCallback, useContext, useMemo, useState, type ReactNode, createContext } from "react"
import { lineIdFor } from "../lib/format"
import type { CartItem, Product } from "../types"

const STORAGE_KEY = "qdelicia-cart"

type CartContextValue = {
  items: CartItem[]
  count: number
  total: number
  add: (product: Product, optionLabel?: string) => void
  setQty: (lineId: string, qty: number) => void
  remove: (lineId: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false
  const item = value as CartItem
  return (
    typeof item.lineId === "string" &&
    typeof item.productId === "string" &&
    typeof item.name === "string" &&
    typeof item.qty === "number" &&
    typeof item.unitPrice === "number"
  )
}

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isCartItem)
  } catch {
    return []
  }
}

function persist(items: CartItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() =>
    typeof window === "undefined" ? [] : readCart(),
  )

  const add = useCallback((product: Product, optionLabel?: string) => {
    const lineId = lineIdFor(product.id, optionLabel)
    setItems((current) => {
      const existing = current.find((item) => item.lineId === lineId)
      const next = existing
        ? current.map((item) =>
            item.lineId === lineId ? { ...item, qty: item.qty + 1 } : item,
          )
        : [
            ...current,
            {
              lineId,
              productId: product.id,
              name: product.name,
              qty: 1,
              unitPrice: product.price,
              optionLabel,
            },
          ]
      persist(next)
      return next
    })
  }, [])

  const setQty = useCallback((lineId: string, qty: number) => {
    setItems((current) => {
      const next =
        qty < 1
          ? current.filter((item) => item.lineId !== lineId)
          : current.map((item) => (item.lineId === lineId ? { ...item, qty } : item))
      persist(next)
      return next
    })
  }, [])

  const remove = useCallback((lineId: string) => {
    setItems((current) => {
      const next = current.filter((item) => item.lineId !== lineId)
      persist(next)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    persist([])
    setItems([])
  }, [])

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0)
    const total = items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0)
    return { items, count, total, add, setQty, remove, clear }
  }, [items, add, setQty, remove, clear])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider")
  return ctx
}
