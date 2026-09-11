import { Minus, Plus, Trash2 } from "lucide-react"
import { useMemo, useState, type FormEvent, type ReactNode } from "react"
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
    return { ...EMPTY_FORM, ...(JSON.parse(raw) as Partial<CheckoutForm>) }
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
    if (form.address.trim().length < 8) return "Ingresá la dirección en Flor de Maroñas."
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
          <Field label="Nombre">
            <input
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              className="input"
              autoComplete="name"
              required
            />
          </Field>
          <Field label="Teléfono">
            <input
              value={form.phone}
              onChange={(event) => update("phone", event.target.value)}
              className="input"
              inputMode="tel"
              autoComplete="tel"
              placeholder="094..."
              required
            />
          </Field>
          <Field label={`Dirección en ${BRAND.zone}`}>
            <input
              value={form.address}
              onChange={(event) => update("address", event.target.value)}
              className="input"
              autoComplete="street-address"
              placeholder="Calle y número"
              required
            />
          </Field>
          <fieldset>
            <legend className="mb-2 text-xs uppercase tracking-wider text-muted">Forma de pago</legend>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="payment"
                  checked={form.payment === "efectivo"}
                  onChange={() => update("payment", "efectivo")}
                />
                Efectivo
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="payment"
                  checked={form.payment === "transferencia"}
                  onChange={() => update("payment", "transferencia")}
                />
                Transferencia
              </label>
            </div>
          </fieldset>
          <Field label="Notas (opcional)">
            <textarea
              value={form.notes}
              onChange={(event) => update("notes", event.target.value)}
              className="input min-h-24"
              placeholder="Timbre, sin cebolla, etc."
            />
          </Field>

          {error && <p className="text-sm text-red">{error}</p>}

          <button
            type="submit"
            disabled={!canSend}
            className="w-full rounded-xl bg-[#25D366] px-4 py-3 font-display uppercase tracking-wider text-white hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Enviar pedido por WhatsApp
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

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-wider text-muted">{label}</span>
      {children}
    </label>
  )
}
