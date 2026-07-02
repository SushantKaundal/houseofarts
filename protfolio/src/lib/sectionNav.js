/** Navigate to an on-page section; works from home and other routes (e.g. /artwork/:id). */
export function goToSection(hash, navigate, pathname) {
  const target = hash.startsWith("#") ? hash : `#${hash}`
  const id = target.slice(1)

  if (pathname === "/" || pathname === "") {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
      window.history.replaceState(null, "", target)
    } else {
      window.location.hash = id
    }
    return
  }

  navigate({ pathname: "/", hash: id })
}

export function handleSectionClick(event, href, navigate, pathname, onAfterNavigate) {
  if (!href?.startsWith("#")) return false
  event.preventDefault()
  goToSection(href, navigate, pathname)
  onAfterNavigate?.()
  return true
}
