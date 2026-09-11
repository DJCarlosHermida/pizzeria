import { useShopStatus } from "../lib/useShopStatus"

export function OpenBadge({ compact = false }: { compact?: boolean }) {
  const status = useShopStatus()

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
        status.open
          ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
          : "border-white/15 bg-white/5 text-cream-2"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${status.open ? "bg-emerald-400" : "bg-red"}`}
        aria-hidden
      />
      {compact ? (status.open ? "Abierto" : "Cerrado") : status.label}
    </span>
  )
}
