import { useEffect, useState } from "react"
import { api } from "../../lib/api"

const GROUPS = {
  site: "Site Info",
  menu: "Menu Badges",
  hero: "Hero Section",
  about: "About Section",
  services: "Services Section",
  workshop: "Workshop Section",
  gallery: "Gallery Section",
  process: "Process Section",
  testimonials: "Testimonials Section",
  contact: "Contact Section",
  footer: "Footer",
  stats: "Stats",
}

const REQUIRED_CONTENT_ITEMS = [
  { key: "menu.workshop.badge", group: "menu", value: "New" },
  { key: "menu.gallery.badge", group: "menu", value: "" },
  { key: "workshop.badge", group: "workshop", value: "Workshop" },
  { key: "workshop.title", group: "workshop", value: "Learn Resin Art with Ruchi" },
  { key: "workshop.subtitle", group: "workshop", value: "Join hands-on creative workshops and make your own resin pieces." },
  { key: "workshop.description", group: "workshop", value: "Beginner-friendly resin workshops covering materials, safety, pouring techniques, finishing, and design basics." },
  { key: "workshop.schedule", group: "workshop", value: "Weekend batches available" },
  { key: "workshop.location", group: "workshop", value: "Jalandhar Studio" },
  { key: "workshop.seats", group: "workshop", value: "Limited seats per batch" },
  { key: "workshop.cta", group: "workshop", value: "Book Workshop Seat" },
]

export default function ContentPage() {
  const [items, setItems] = useState([])
  const [saving, setSaving] = useState(null)
  const [msg, setMsg] = useState("")

  const load = () =>
    api
      .getContent()
      .then((loaded) => {
        const map = new Map(loaded.map((item) => [item.key, item]))
        const merged = [...loaded]
        REQUIRED_CONTENT_ITEMS.forEach((required) => {
          if (!map.has(required.key)) {
            merged.push({ _id: `new-${required.key}`, ...required })
          }
        })
        setItems(merged)
      })
      .catch(() => {})

  useEffect(() => { load() }, [])

  const save = async (key, value, group) => {
    setSaving(key)
    try {
      await api.updateContent(key, value, group)
      setMsg("Saved!")
      setTimeout(() => setMsg(""), 2000)
    } catch (err) {
      setMsg(err.message)
    } finally {
      setSaving(null)
    }
  }

  const grouped = items.reduce((acc, item) => {
    const g = item.group || "general"
    if (!acc[g]) acc[g] = []
    acc[g].push(item)
    return acc
  }, {})

  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold mb-2">Text Content</h2>
      <p className="text-sm opacity-60 mb-6">Edit all text shown on the website dynamically.</p>
      {msg && <p className="text-sm mb-4 text-green-600">{msg}</p>}

      <div className="space-y-8">
        {Object.entries(grouped).map(([group, groupItems]) => (
          <div key={group} className="admin-card p-6">
            <h3 className="font-medium mb-4 text-lg">{GROUPS[group] || group}</h3>
            <div className="space-y-4">
              {groupItems.map((item) => (
                <div key={item.key}>
                  <label className="text-xs uppercase tracking-wider opacity-50">
                    {item.key.replace(`${group}.`, "")}
                  </label>
                  {String(item.value).length > 80 ? (
                    <textarea
                      className="admin-input mt-1 min-h-[80px]"
                      defaultValue={item.value}
                      onBlur={(e) => {
                        if (e.target.value !== item.value) save(item.key, e.target.value, group)
                      }}
                    />
                  ) : (
                    <input
                      className="admin-input mt-1"
                      defaultValue={item.value}
                      onBlur={(e) => {
                        if (e.target.value !== item.value) save(item.key, e.target.value, group)
                      }}
                    />
                  )}
                  {saving === item.key && <span className="text-xs opacity-50 ml-2">Saving...</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
