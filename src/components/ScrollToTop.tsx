import { useLayoutEffect } from "react"
import { useLocation } from "react-router-dom"
import { scrollToTop } from "../lib/scroll"

export function ScrollToTop() {
  const { pathname, search, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) return
    scrollToTop()
  }, [pathname, search, hash])

  return null
}
