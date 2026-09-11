import { Bike, Clock, Flame, MapPin } from "lucide-react"
import { Link } from "react-router-dom"
import { BRAND, FEATURES, getProduct } from "../data/catalog"
import { formatPrice } from "../lib/format"
import { whatsappBlankUrl } from "../lib/whatsapp"
import { OpenBadge } from "./OpenBadge"
import { Specialties } from "./Specialties"

function CheeseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3.5 14.5 12 4l8.5 10.5v4.2c0 .7-.6 1.3-1.3 1.3H4.8c-.7 0-1.3-.6-1.3-1.3z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="9.2" cy="14.2" r="1.15" fill="currentColor" />
      <circle cx="13.6" cy="16.4" r="0.95" fill="currentColor" />
      <circle cx="15.8" cy="12.6" r="0.8" fill="currentColor" />
    </svg>
  )
}

const FEATURE_ICONS = {
  envio: Bike,
  queso: CheeseIcon,
  horno: Flame,
} as const

export function Hero() {
  const promo = getProduct("promo-burgers")

  return (
    <section className="relative overflow-hidden">
      <img
        src="/img/menu/pizzeta-muzza.jpg"
        alt="Pizza de Q'Delicia con muzzarella y aceitunas"
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/40" />

      <div className="relative mx-auto grid min-h-[88vh] max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <OpenBadge />
          <p className="mt-5 font-display text-sm tracking-[0.35em] text-red">PIZZERÍA · SOLO DELIVERY</p>
          <h1 className="mt-2 font-display text-5xl uppercase leading-[0.92] text-cream sm:text-7xl">
            Q&apos;Delicia
            <span className="mt-3 block text-2xl font-semibold normal-case tracking-normal text-cream-2 sm:text-3xl">
              {BRAND.tagline}
            </span>
          </h1>
          <p className="mt-5 max-w-md text-base text-muted">
            Pizzas al metro, hamburguesas caseras, milanesas y fainá. Pedís acá y te lo mandamos por WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/menu"
              className="rounded-xl bg-red px-6 py-3 font-display uppercase tracking-wider text-white hover:bg-red-2"
            >
              Ver menú
            </Link>
            <a
              href={whatsappBlankUrl()}
              className="rounded-xl border border-cream/30 px-6 py-3 font-display uppercase tracking-wider text-cream hover:border-cream"
            >
              WhatsApp {BRAND.phoneDisplay}
            </a>
          </div>
        </div>

        {promo && (
          <Link
            to="/menu#promo-burgers"
            className="justify-self-end overflow-hidden rounded-3xl border border-white/10 bg-card/80 shadow-2xl backdrop-blur-sm lg:max-w-md"
          >
            <div className="relative h-52">
              <img
                src="/img/menu/burger.jpg"
                alt="Hamburguesa completa, promo del día"
                width={1920}
                height={1080}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
              <span className="ribbon absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Promo del día
              </span>
            </div>
            <div className="p-5">
              <p className="font-display text-sm uppercase tracking-widest text-red">Hamburguesa completa</p>
              <h2 className="mt-1 font-display text-2xl uppercase text-cream">{promo.name}</h2>
              <p className="mt-2 text-sm text-muted">{promo.highlights?.join(" · ")}</p>
              <p className="mt-4 font-display text-4xl text-cream">{formatPrice(promo.price)}</p>
            </div>
          </Link>
        )}
      </div>
    </section>
  )
}

export function HomeExtras() {
  return (
    <>
      <Specialties />
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="grid gap-4 md:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = FEATURE_ICONS[feature.id]
            return (
              <div key={feature.id} className="rounded-2xl border border-white/10 bg-ink-2 p-5">
                <Icon className="h-6 w-6 text-red" />
                <h3 className="mt-3 font-display text-lg uppercase text-cream">{feature.title}</h3>
                <p className="mt-1 text-sm text-muted">{feature.text}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-ink-2">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-3">
          <p className="flex items-center gap-3 text-sm text-cream-2">
            <Clock className="h-5 w-5 text-red" />
            {BRAND.hoursLabel}
          </p>
          <p className="flex items-center gap-3 text-sm text-cream-2">
            <MapPin className="h-5 w-5 text-red" />
            Zona de reparto: {BRAND.zone}
          </p>
          <p className="flex items-center gap-3 text-sm text-cream-2">
            <Bike className="h-5 w-5 text-red" />
            Solo delivery · Pedidos al {BRAND.phoneDisplay}
          </p>
        </div>
      </section>
    </>
  )
}
