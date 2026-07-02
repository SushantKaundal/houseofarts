import { useEffect, useState } from "react"
import { api } from "../../lib/api"
import { Plus, Trash2 } from "lucide-react"

const ICONS = ["Tag", "Clock", "LayoutGrid", "Frame", "Gift", "Heart", "Sparkles"]
const COLORS = [
  "from-blush-light to-blush",
  "from-lavender-light to-lavender",
  "from-ocean/30 to-ocean",
  "from-gold-light/40 to-gold",
  "from-blush-light to-lavender-light",
  "from-lavender-light to-blush",
]

export default function ServicesPage() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(null)

  const load = () => api.getServices().then(setItems).catch(() => {})
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!form?.title) return
    if (form._id) await api.updateService(form._id, form)
    else await api.createService(form)
    setForm(null)
    load()
  }

  const remove = async (id) => {
    if (!confirm("Delete this service card?")) return
    await api.deleteService(id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl font-semibold">Service Cards</h2>
          <p className="text-sm opacity-60">Manage &quot;What I Create&quot; cards.</p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn-primary flex items-center gap-2"
          onClick={() => setForm({ title: "", description: "", icon: "Sparkles", color: COLORS[0], order: items.length })}
        >
          <Plus size={16} /> Add Card
        </button>
      </div>

      {form && (
        <div className="admin-card p-5 mb-6 space-y-3">
          <input className="admin-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <textarea className="admin-input min-h-[80px]" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <select className="admin-input" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}>
            {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
          <select className="admin-input" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}>
            {COLORS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <div className="flex gap-2">
            <button type="button" className="admin-btn admin-btn-primary" onClick={save}>Save</button>
            <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setForm(null)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item._id} className="admin-card p-5">
            <h3 className="font-medium">{item.title}</h3>
            <p className="text-sm opacity-60 mt-1">{item.description}</p>
            <p className="text-xs opacity-40 mt-2">Icon: {item.icon}</p>
            <div className="flex gap-2 mt-3">
              <button type="button" className="admin-btn admin-btn-ghost text-xs" onClick={() => setForm(item)}>Edit</button>
              <button type="button" className="admin-btn admin-btn-danger text-xs" onClick={() => remove(item._id)}>
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
