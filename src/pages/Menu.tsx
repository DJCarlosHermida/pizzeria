import { useEffect, useMemo, useState } from "react"
import { useLocation, useSearchParams } from "react-router-dom"
import { OpenBadge } from "../components/OpenBadge"
import { ProductCard } from "../components/ProductCard"
import { CATEGORIES, PRODUCTS } from "../data/catalog"
import type { CategoryId } from "../types"

function isCategory(value: string | null): value is CategoryId {
  return CATEGORIES.some((item) => item.id === value)
}

export function Menu() {
  const location = useLocation()
  const [params, setParams] = useSearchParams()
  const [category, setCategory] = useState<CategoryId | "all">(() => {
    const cat = params.get("cat")
    return isCategory(cat) ? cat : "all"
  })

  const items = useMemo(
    () => (category === "all" ? PRODUCTS : PRODUCTS.filter((product) => product.category === category)),
    [category],
  )

  useEffect(() => {
    const cat = params.get("cat")
    setCategory(isCategory(cat) ? cat : "all")
  }, [params])

  useEffect(() => {
    const id = location.hash.replace("#", "")
    if (!id) return
    const node = document.getElementById(id)
    node?.scrollIntoView({ behavior: "smooth", block: "center" })
  }, [location.hash, items])

  function selectCategory(next: CategoryId | "all") {
    const nextParams = new URLSearchParams(params)
    if (next === "all") nextParams.delete("cat")
    else nextParams.set("cat", next)
    setParams(nextParams, { replace: true })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-display text-sm tracking-[0.3em] text-red">CARTA</p>
          <h1 className="mt-1 font-display text-4xl uppercase text-cream">Menú</h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            En pizzas con un gusto, elegí el extra antes de agregar.
          </p>
        </div>
        <OpenBadge />
      </div>

      <div className="sticky top-[4.25rem] z-30 -mx-4 mt-8 overflow-x-auto border-y border-white/10 bg-ink/95 px-4 py-3 backdrop-blur">
        <div className="flex gap-2">
          <FilterChip active={category === "all"} onClick={() => selectCategory("all")}>
            Todo
          </FilterChip>
          {CATEGORIES.map((item) => (
            <FilterChip
              key={item.id}
              active={category === item.id}
              onClick={() => selectCategory(item.id)}
            >
              {item.label}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} highlight={product.featured} />
        ))}
      </div>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-4 py-2 font-display text-sm uppercase tracking-wider ${
        active ? "bg-red text-white" : "border border-white/10 bg-card text-cream-2 hover:border-red"
      }`}
    >
      {children}
    </button>
  )
}
