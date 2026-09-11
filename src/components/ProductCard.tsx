import { Check, Plus } from "lucide-react"
import { useState } from "react"
import { useCart } from "../context/CartContext"
import { GUSTOS, PROTEINAS } from "../data/catalog"
import { formatPrice } from "../lib/format"
import type { Product } from "../types"

export function ProductCard({ product, highlight = false }: { product: Product; highlight?: boolean }) {
  const { add } = useCart()
  const [option, setOption] = useState("")
  const [added, setAdded] = useState(false)
  const needsOption = Boolean(product.optionKind)
  const choices = product.optionKind === "proteina" ? PROTEINAS : GUSTOS

  function handleAdd() {
    if (needsOption && !option) return
    add(product, option || undefined)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1200)
  }

  return (
    <article
      id={product.id}
      className={`scroll-mt-28 overflow-hidden rounded-2xl border bg-card shadow-lg ${
        highlight ? "border-red ring-1 ring-red/40" : "border-white/10"
      }`}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-black/10" />
        {product.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-red px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
            Promo del día
          </span>
        )}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl uppercase leading-tight text-cream">{product.name}</h3>
            <p className="mt-1 text-sm text-muted">{product.description}</p>
          </div>
          <p className="shrink-0 font-display text-2xl text-cream">{formatPrice(product.price)}</p>
        </div>

        {product.highlights && (
          <p className="text-xs leading-5 text-cream-2">{product.highlights.join(" · ")}</p>
        )}

        {needsOption && (
          <label className="block text-sm">
            <span className="mb-1 block text-xs uppercase tracking-wider text-muted">
              {product.optionKind === "proteina" ? "Carne o pollo" : "Elegí el gusto"}
            </span>
            <select
              value={option}
              onChange={(event) => setOption(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-ink px-3 py-2 text-sm text-cream outline-none focus:border-red"
            >
              <option value="">Seleccioná una opción</option>
              {choices.map((choice) => (
                <option key={choice} value={choice}>
                  {choice}
                </option>
              ))}
            </select>
          </label>
        )}

        <button
          type="button"
          onClick={handleAdd}
          disabled={needsOption && !option}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red px-4 py-2.5 font-display text-sm uppercase tracking-wider text-white transition hover:bg-red-2 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {added ? "Agregado" : "Agregar"}
        </button>
      </div>
    </article>
  )
}
