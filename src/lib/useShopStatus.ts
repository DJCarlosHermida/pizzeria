import { useEffect, useState } from "react"
import { getShopStatus, type ShopStatus } from "./hours"

export function useShopStatus(): ShopStatus {
  const [status, setStatus] = useState<ShopStatus>(() => getShopStatus())

  useEffect(() => {
    const tick = () => setStatus(getShopStatus())
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  return status
}
