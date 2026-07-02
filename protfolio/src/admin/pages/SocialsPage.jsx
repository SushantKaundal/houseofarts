import { useEffect, useState } from "react"
import { api } from "../../lib/api"
import { Plus, Trash2 } from "lucide-react"

const PLATFORMS = ["whatsapp", "instagram", "facebook", "youtube", "email", "phone", "custom"]
const ICONS = ["MessageCircle", "Instagram", "Facebook", "Youtube", "Mail", "Phone", "Link"]

export default function SocialsPage() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(null)

  const load = () => api.getSocials().then(setItems).catch(() => {})
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!form?.label || !form?.url) return
    if (form._id) await api.updateSocial(form._id, form)
    else await api.createSocial(form)
    setForm(null)
    load()
  }

  const remove = async (id) => {
    if (!confirm("Delete this social link?")) return
    await api.deleteSocial(id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl font-semibold">Social Links</h2>
          <p className="text-sm opacity-60">WhatsApp, Instagram, and other social handles.</p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn-primary flex items-center gap-2"
          onClick={() => setForm({ platform: "whatsapp", label: "", url: "", icon: "MessageCircle", order: items.length })}
        >
          <Plus size={16} /> Add Link
        </button>
      </div>

      {form && (
        <div className="admin-card p-5 mb-6 space-y-3">
          <select className="admin-input" value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}>
            {PLATFORMS.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <input className="admin-input" placeholder="Button label" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
          <input className="admin-input" placeholder="URL (e.g. https://wa.me/91...)" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
          <select className="admin-input" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}>
            {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
          <div className="flex gap-2">
            <button type="button" className="admin-btn admin-btn-primary" onClick={save}>Save</button>
            <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setForm(null)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item._id} className="admin-card p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">{item.label}</p>
              <p className="text-xs opacity-50">{item.platform} · {item.url}</p>
            </div>
            <div className="flex gap-2">
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
