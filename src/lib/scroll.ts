export function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" })
}

export function isInAppPathLink(anchor: HTMLAnchorElement) {
  try {
    const url = new URL(anchor.href, window.location.href)
    return url.origin === window.location.origin && url.hash === ""
  } catch {
    return false
  }
}
