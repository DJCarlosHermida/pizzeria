import { Clock, Heart, MapPin, Phone } from "lucide-react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { BRAND, CATEGORIES } from "../data/catalog"
import { whatsappBlankUrl } from "../lib/whatsapp"

const PAGE_LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/menu", label: "Menú" },
  { to: "/pedido", label: "Pedido" },
]

export function Footer() {
  const location = useLocation()
  const menuCat = location.pathname === "/menu" ? new URLSearchParams(location.search).get("cat") : null

  return (
    <footer className="border-t border-white/10 bg-ink-2">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <Link to="/" className="inline-block text-cream hover:text-cream-2">
            <p className="font-display text-2xl leading-none">{BRAND.name}</p>
            <p className="mt-1 text-[10px] font-semibold tracking-[0.28em] text-red">PIZZERÍA</p>
          </Link>
        </div>
        <div className="space-y-3 text-sm text-cream-2">
          <p className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 text-red" />
            {BRAND.hoursLabel}
          </p>
          <p className="flex items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 text-red" />
            Zona de reparto: {BRAND.zone}
          </p>
          <a className="flex items-center gap-2 hover:text-cream" href={whatsappBlankUrl()}>
            <Phone className="h-4 w-4 text-red" />
            {BRAND.phoneDisplay}
          </a>
        </div>
        <nav aria-label="Navegación">
          <p className="font-display text-xs tracking-[0.28em] text-red">NAVEGACIÓN</p>
          {/* <ul className="mt-3 space-y-2">
            {PAGE_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `font-display text-sm uppercase tracking-wider ${
                      isActive ? "text-cream" : "text-muted hover:text-cream"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul> */}
          <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
            {CATEGORIES.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/menu?cat=${item.id}`}
                  className={`text-sm ${
                    menuCat === item.id ? "text-cream" : "text-muted hover:text-cream"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="ribbon">
        <p className="flex items-center justify-center gap-3 px-4 py-3 text-center font-display text-lg uppercase tracking-wide text-[#f0d27a] sm:text-2xl">
          <Heart className="h-4 w-4 fill-current sm:h-5 sm:w-5" />
          {BRAND.tagline}
          <Heart className="h-4 w-4 fill-current sm:h-5 sm:w-5" />
        </p>
      </div>
    </footer>
  )
}
