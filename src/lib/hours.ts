import { BRAND } from "../data/catalog"

const TZ = BRAND.timezone

export type ShopStatus = {
  open: boolean
  label: string
  dayLabel: string
  timeLabel: string
}

function partsInMontevideo(now: Date) {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
  }).format(now)

  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: TZ,
      hour: "2-digit",
      hourCycle: "h23",
    }).format(now),
  )

  const minute = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: TZ,
      minute: "2-digit",
    }).format(now),
  )

  const timeLabel = new Intl.DateTimeFormat("es-UY", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).format(now)

  const dayLabel = new Intl.DateTimeFormat("es-UY", {
    timeZone: TZ,
    weekday: "long",
  }).format(now)

  return { weekday, hour, minute, timeLabel, dayLabel }
}

export function getShopStatus(now = new Date()): ShopStatus {
  const { weekday, hour, timeLabel, dayLabel } = partsInMontevideo(now)
  const isSunday = weekday === "Sun"
  const open = !isSunday && hour >= 19

  return {
    open,
    label: open ? "Abierto ahora" : "Cerrado ahora",
    dayLabel,
    timeLabel,
  }
}
