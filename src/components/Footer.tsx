import { Clock, Heart, MapPin, Phone } from "lucide-react"
import { BRAND } from "../data/catalog"
import { whatsappBlankUrl } from "../lib/whatsapp"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-2">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl leading-none text-cream">Q&apos;DELICIA</p>
          <p className="mt-1 text-[10px] font-semibold tracking-[0.28em] text-red">PIZZERÍA</p>
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
        <div className="text-sm text-muted">
          <p>Pedidos por WhatsApp, armados desde esta web.</p>
        </div>
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
