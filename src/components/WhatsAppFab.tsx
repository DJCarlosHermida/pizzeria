import { MessageCircle } from "lucide-react"
import { useLocation } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { BRAND } from "../data/catalog"
import { whatsappBlankUrl } from "../lib/whatsapp"

export function WhatsAppFab() {
  const { count } = useCart()
  const location = useLocation()
  const raised = count > 0 && location.pathname !== "/pedido"

  return (
    <a
      href={whatsappBlankUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label={`Escribir a ${BRAND.name} por WhatsApp`}
      className={`fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] ${
        raised ? "bottom-24" : "bottom-[max(1.25rem,env(safe-area-inset-bottom))]"
      }`}
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </a>
  )
}
