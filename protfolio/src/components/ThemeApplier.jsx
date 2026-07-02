import { useEffect } from "react"
import { useSite } from "../context/SiteContext"
import { DEFAULT_SITE_THEME } from "../themes/siteThemes"

/** Applies the active website theme to <html> */
export default function ThemeApplier({ children }) {
  const { get } = useSite()
  const theme = get("site.theme", DEFAULT_SITE_THEME)

  useEffect(() => {
    document.documentElement.setAttribute("data-site-theme", theme)
    return () => document.documentElement.removeAttribute("data-site-theme")
  }, [theme])

  return children
}
