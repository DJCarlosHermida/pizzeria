import { Minus, Plus, Trash2 } from "lucide-react"
import { useMemo, useState, type FormEvent } from "react"
import { Link } from "react-router-dom"
import { OpenBadge } from "../components/OpenBadge"
import { useCart } from "../context/CartContext"
import { BRAND } from "../data/catalog"
import { formatPrice } from "../lib/format"
import { useShopStatus } from "../lib/useShopStatus"
import { buildWhatsAppMessage, whatsappUrl } from "../lib/whatsapp"
import type { CheckoutForm } from "../types"

const FORM_KEY = "qdelicia-checkout"

const EMPTY_FORM: CheckoutForm = {
  name: "",
  phone: "",
  address: "",
  payment: "",
  notes: "",
}

function readForm(): CheckoutForm {
  try {
    const raw = localStorage.getItem(FORM_KEY)
    if (!raw) return EMPTY_FORM
    const parsed = { ...EMPTY_FORM, ...(JSON.parse(raw) as Partial<CheckoutForm>) }
    if (parsed.payment !== "efectivo" && parsed.payment !== "debito") {
      parsed.payment = ""
    }
    return parsed
  } catch {
    return EMPTY_FORM
  }
}

export function Checkout() {
  const { items, total, setQty, remove, clear } = useCart()
  const status = useShopStatus()
  const [form, setForm] = useState<CheckoutForm>(() =>
    typeof window === "undefined" ? EMPTY_FORM : readForm(),
  )
  const [error, setError] = useState<string | null>(null)

  const canSend = items.length > 0

  const preview = useMemo(
    () => (canSend ? buildWhatsAppMessage(items, { ...form, payment: form.payment || "efectivo" }, !status.open) : ""),
    [canSend, items, form, status.open],
  )

  function update<K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) {
    setForm((current) => {
      const next = { ...current, [key]: value }
      localStorage.setItem(FORM_KEY, JSON.stringify(next))
      return next
    })
  }

  function validate(): string | null {
    if (!form.name.trim() || form.name.trim().length < 2) return "Ingresá tu nombre."
    const digits = form.phone.replace(/\D/g, "")
    if (digits.length < 8) return "Ingresá un teléfono válido."
    if (form.address.trim().length < 8) return "Ingresá la dirección de entrega."
    if (!form.payment) return "Elegí forma de pago."
    return null
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!canSend) return
    const message = validate()
    if (message) {
      setError(message)
      return
    }
    setError(null)
    const url = whatsappUrl(buildWhatsAppMessage(items, form, !status.open))
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1.1fr_0.9fr]">
      <section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-display text-sm tracking-[0.3em] text-red">DELIVERY</p>
            <h1 className="mt-1 font-display text-4xl uppercase text-cream">Tu pedido</h1>
            <p className="mt-2 text-sm text-muted">Solo delivery en {BRAND.zone}.</p>
          </div>
          <OpenBadge />
        </div>

        {!status.open && (
          <p className="mt-5 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
            El local está cerrado ahora ({BRAND.hoursLabel}). Podés armar el pedido igual; lo mandamos con aviso de
            fuera de horario.
          </p>
        )}

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-card p-6 text-center">
            <p className="text-cream">Todavía no hay nada en el carrito.</p>
            <Link to="/menu" className="mt-4 inline-flex font-display uppercase tracking-wider text-red">
              Ir al menú
            </Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {items.map((item) => (
              <li
                key={item.lineId}
                className="flex items-start justify-between gap-3 rounded-2xl border border-white/10 bg-card p-4"
              >
                <div>
                  <p className="font-display text-lg uppercase leading-tight text-cream">{item.name}</p>
                  {item.optionLabel && <p className="text-sm text-cream-2">{item.optionLabel}</p>}
                  <p className="mt-1 text-sm text-muted">
                    {formatPrice(item.unitPrice)} · {formatPrice(item.unitPrice * item.qty)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10"
                    onClick={() => setQty(item.lineId, item.qty - 1)}
                    aria-label="Quitar uno"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10"
                    onClick={() => setQty(item.lineId, item.qty + 1)}
                    aria-label="Agregar uno"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    className="ml-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-red"
                    onClick={() => remove(item.lineId)}
                    aria-label="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <div className="mt-4 flex items-center justify-between">
            <button type="button" onClick={clear} className="text-sm text-muted hover:text-cream">
              Vaciar pedido
            </button>
            <p className="font-display text-3xl text-cream">{formatPrice(total)}</p>
          </div>
        )}
      </section>

      <section className="rounded-3xl border border-white/10 bg-card p-5 sm:p-6">
        <h2 className="font-display text-2xl uppercase text-cream">Datos de entrega</h2>
        <form className="mt-5 space-y-4" onSubmit={onSubmit}>
          <input
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className="input"
            autoComplete="name"
            placeholder="Nombre"
            aria-label="Nombre"
            required
          />
          <input
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            className="input"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Teléfono"
            aria-label="Teléfono"
            required
          />
          <input
            value={form.address}
            onChange={(event) => update("address", event.target.value)}
            className="input"
            autoComplete="street-address"
            placeholder="Dirección"
            aria-label="Dirección"
            required
          />
          <select
            value={form.payment}
            onChange={(event) => update("payment", event.target.value as CheckoutForm["payment"])}
            className="input"
            aria-label="Forma de pago"
            required
          >
            <option value="">Forma de pago</option>
            <option value="efectivo">Efectivo</option>
            <option value="debito">Débito</option>
          </select>
          <textarea
            value={form.notes}
            onChange={(event) => update("notes", event.target.value)}
            className="input min-h-24"
            placeholder="Información adicional"
            aria-label="Información adicional"
          />

          {error && <p className="text-sm text-red">{error}</p>}

          <button
            type="submit"
            disabled={!canSend}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-display uppercase tracking-wider text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <WhatsAppIcon />
            Enviar por WhatsApp
          </button>
        </form>

        {preview && (
          <pre className="mt-5 overflow-x-auto whitespace-pre-wrap rounded-xl bg-ink p-4 text-xs text-cream-2">
            {preview}
          </pre>
        )}
      </section>
    </div>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
