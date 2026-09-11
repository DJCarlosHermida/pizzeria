import { Menu, ShoppingBag, X } from "lucide-react"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { BrandMark } from "./BrandMark"
import { OpenBadge } from "./OpenBadge"

const LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/menu", label: "Menú" },
  { to: "/pedido", label: "Pedido" },
]

export function Navbar() {
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <BrandMark size="sm" />

        <nav className="hidden items-center gap-6 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-display text-sm tracking-wider uppercase ${
                  isActive ? "text-cream" : "text-muted hover:text-cream"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex">
            <OpenBadge compact />
          </span>
          <NavLink
            to="/pedido"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-card text-cream hover:border-red"
            aria-label="Ver pedido"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </NavLink>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-3">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-display text-lg uppercase ${isActive ? "text-cream" : "text-muted"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
