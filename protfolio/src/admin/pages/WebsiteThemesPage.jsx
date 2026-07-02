import { useState, useEffect } from "react"
import { api } from "../../lib/api"
import { SITE_THEMES, DEFAULT_SITE_THEME } from "../../themes/siteThemes"
import { Check, ExternalLink } from "lucide-react"

export default function WebsiteThemesPage() {
  const [active, setActive] = useState(DEFAULT_SITE_THEME)
  const [saving, setSaving] = useState(null)
  const [msg, setMsg] = useState("")

  useEffect(() => {
    api.getContent().then((items) => {
      const t = items.find((i) => i.key === "site.theme")
      if (t?.value) setActive(t.value)
    }).catch(() => {})
  }, [])

  const select = async (themeId) => {
    setSaving(themeId)
    setMsg("")
    try {
      await api.updateContent("site.theme", themeId, "site")
      setActive(themeId)
      setMsg("Website theme updated! Refresh the main site to see changes.")
      setTimeout(() => setMsg(""), 4000)
    } catch (err) {
      setMsg(err.message || "Failed to save theme")
    } finally {
      setSaving(null)
    }
  }

  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold mb-2">Website Themes</h2>
      <p className="text-sm opacity-60 mb-2">
        Change the entire look & feel of the public website — colors, gradients, and visual style.
      </p>
      <p className="text-xs opacity-40 mb-8">
        This changes the main site visitors see, not the admin panel appearance.
      </p>

      {msg && (
        <p className={`text-sm mb-6 ${msg.includes("Failed") ? "text-red-500" : "text-green-600"}`}>
          {msg}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {SITE_THEMES.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => select(theme.id)}
            disabled={saving === theme.id}
            className={`admin-card p-0 overflow-hidden text-left transition-all hover:shadow-xl hover:scale-[1.02] ${
              active === theme.id ? "ring-2 ring-[var(--admin-accent)]" : ""
            }`}
          >
            {/* Visual preview strip */}
            <div
              className="h-28 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${theme.preview[0]} 0%, ${theme.preview[1]} 50%, ${theme.preview[2]} 100%)`,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center gap-2 p-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-lg shadow-lg border-2 border-white/50"
                    style={{ backgroundColor: theme.preview[i % theme.preview.length] }}
                  />
                ))}
              </div>
              {active === theme.id && (
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full admin-accent flex items-center justify-center shadow">
                  <Check size={14} />
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="font-semibold text-base">{theme.name}</h3>
              <p className="text-xs opacity-60 mt-1 leading-relaxed">{theme.description}</p>
              <div className="flex gap-1.5 mt-3">
                {theme.preview.map((c) => (
                  <span
                    key={c}
                    className="w-5 h-5 rounded-full border border-black/10 shadow-sm"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              {saving === theme.id && (
                <p className="text-xs mt-2 opacity-50">Applying...</p>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="admin-card p-5 mt-8">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="admin-btn admin-btn-ghost inline-flex items-center gap-2 text-sm"
        >
          <ExternalLink size={14} />
          Preview live website
        </a>
      </div>
    </div>
  )
}
