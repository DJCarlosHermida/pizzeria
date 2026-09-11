import type { ReactNode } from "react"
import { useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { CartBar } from "./CartBar"
import { Footer } from "./Footer"
import { Navbar } from "./Navbar"
import { WhatsAppFab } from "./WhatsAppFab"

export function Layout({ children }: { children: ReactNode }) {
  const { count } = useCart()
  const location = useLocation()
  const extraPad = count > 0 && location.pathname !== "/pedido"

  return (
    <div className={`texture min-h-screen ${extraPad ? "pb-28" : "pb-8"}`}>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CartBar />
      <WhatsAppFab />
    </div>
  )
}
