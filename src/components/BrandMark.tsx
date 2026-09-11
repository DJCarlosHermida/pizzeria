import { Pizza } from "lucide-react"
import { Link } from "react-router-dom"

export function BrandMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const icon = size === "lg" ? "h-9 w-9" : size === "sm" ? "h-6 w-6" : "h-7 w-7"
  const title = size === "lg" ? "text-4xl sm:text-6xl" : size === "sm" ? "text-lg" : "text-xl"

  return (
    <Link to="/" className="group inline-flex items-center gap-2 text-cream">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red text-cream shadow-[0_0_18px_rgba(225,6,0,0.45)]">
        <Pizza className={icon} strokeWidth={2.2} />
      </span>
      <span className={`font-display leading-none ${title}`}>
        Q&apos;DELICIA
        <span className="mt-0.5 block text-[10px] font-semibold tracking-[0.28em] text-red">
          PIZZERÍA
        </span>
      </span>
    </Link>
  )
}
