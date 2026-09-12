import { Pizza } from "lucide-react"
import { Link } from "react-router-dom"
import { BRAND } from "../data/catalog"

export function BrandMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const icon = size === "lg" ? "h-9 w-9" : size === "sm" ? "h-6 w-6" : "h-7 w-7"
  const title = size === "lg" ? "text-4xl sm:text-6xl" : size === "sm" ? "text-lg" : "text-xl"
  const slogan =
    size === "lg"
      ? "mt-2 text-base sm:text-xl"
      : size === "sm"
        ? "mt-1 text-[10px] sm:text-[11px]"
        : "mt-1 text-xs"

  return (
    <Link to="/" className="inline-flex items-center gap-2 text-cream">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red text-cream shadow-[0_0_18px_rgba(225,6,0,0.45)]">
        <Pizza className={icon} strokeWidth={2.2} />
      </span>
      <span className={`font-display leading-none ${title}`}>
        {BRAND.name}
        <span className="mt-0.5 block text-[10px] font-semibold tracking-[0.28em] text-red">
          PIZZERÍA
        </span>
        <span
          className={`block font-sans font-semibold italic tracking-wide text-[#f0d27a] ${slogan}`}
        >
          {BRAND.tagline}
        </span>
      </span>
    </Link>
  )
}
