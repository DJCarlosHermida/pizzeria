import { ShoppingBag } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { formatPrice } from "../lib/format"

export function CartBar() {
  const { count, total } = useCart()
  const location = useLocation()

  if (count === 0 || location.pathname === "/pedido") return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <Link
        to="/pedido"
        className="pointer-events-auto mx-auto flex max-w-xl items-center justify-between gap-3 rounded-2xl bg-red px-5 py-3 text-white shadow-[0_12px_40px_rgba(225,6,0,0.45)]"
      >
        <span className="flex items-center gap-2 font-display uppercase tracking-wider">
          <ShoppingBag className="h-5 w-5" />
          Ver pedido
        </span>
        <span className="text-sm font-semibold">
          {count} {count === 1 ? "ítem" : "ítems"} · {formatPrice(total)}
        </span>
      </Link>
    </div>
  )
}
