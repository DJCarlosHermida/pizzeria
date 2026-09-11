import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import { SPECIALTIES } from "../data/catalog"

export function Specialties() {
  const featured = SPECIALTIES.find((item) => item.featured) ?? SPECIALTIES[0]
  const rest = SPECIALTIES.filter((item) => item.id !== featured.id)

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-display text-sm tracking-[0.3em] text-red">NUESTRAS ESPECIALIDADES</p>
          <h2 className="mt-2 font-display text-3xl uppercase text-cream sm:text-5xl">Lo que más pedimos</h2>
          <p className="mt-3 max-w-lg text-sm text-muted">
            Lo de siempre, bien cargado. Entrá al menú y armá el pedido en un toque.
          </p>
        </div>
        <Link
          to="/menu"
          className="hidden items-center gap-1 font-display text-sm uppercase tracking-wider text-cream-2 hover:text-cream md:inline-flex"
        >
          Ver carta completa
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <SpecialtyCard item={featured} featured />
        <div className="grid gap-4">
          <SpecialtyCard item={rest[0]} />
          <div className="grid gap-4 sm:grid-cols-2">
            {rest.slice(1).map((item) => (
              <SpecialtyCard key={item.id} item={item} compact />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SpecialtyCard({
  item,
  featured = false,
  compact = false,
}: {
  item: (typeof SPECIALTIES)[number]
  featured?: boolean
  compact?: boolean
}) {
  return (
    <Link
      to={item.to}
      className={`group relative block overflow-hidden rounded-3xl border border-white/10 ${
        featured ? "h-full min-h-[22rem] lg:min-h-[32rem]" : compact ? "min-h-[12rem]" : "min-h-[14.5rem]"
      }`}
    >
      <img
        src={item.image}
        alt={item.label}
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-transparent" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 transition group-hover:ring-red/70" />
      <div className={`relative flex h-full flex-col justify-end ${compact ? "p-4" : "p-6"}`}>
        <p className="font-display text-xs tracking-[0.28em] text-red">ESPECIALIDAD</p>
        <h3 className={`mt-1 font-display uppercase leading-none text-cream ${featured ? "text-4xl" : "text-2xl"}`}>
          {item.label}
        </h3>
        <p className="mt-2 max-w-sm text-sm text-cream-2">{item.detail}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-cream">
          Pedir ahora
          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  )
}
