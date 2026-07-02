import { useEffect, useState } from "react"
import { api, resolveImageUrl } from "../../lib/api"
import ImageUploader from "../components/ImageUploader"
import { Plus, Trash2 } from "lucide-react"

export default function SlidersPage() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(null)

  const load = () => api.getSliders().then(setItems).catch(() => {})
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!form?.src) return
    if (form._id) await api.updateSlider(form._id, form)
    else await api.createSlider(form)
    setForm(null)
    load()
  }

  const remove = async (id) => {
    if (!confirm("Delete this slider image?")) return
    await api.deleteSlider(id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl font-semibold">Slider Images</h2>
          <p className="text-sm opacity-60">Images in the hero filmstrip and marquee.</p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn-primary flex items-center gap-2"
          onClick={() => setForm({ src: "", alt: "", section: "marquee", order: items.length })}
        >
          <Plus size={16} /> Add Image
        </button>
      </div>

      {form && (
        <div className="admin-card p-5 mb-6 space-y-3">
          <select className="admin-input" value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })}>
            <option value="marquee">Marquee (filmstrip)</option>
            <option value="hero">Hero showcase</option>
          </select>
          <ImageUploader value={form.src} onChange={(src) => setForm({ ...form, src })} />
          <input className="admin-input" placeholder="Alt text" value={form.alt || ""} onChange={(e) => setForm({ ...form, alt: e.target.value })} />
          <div className="flex gap-2">
            <button type="button" className="admin-btn admin-btn-primary" onClick={save}>Save</button>
            <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setForm(null)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
        {items.map((item) => (
          <div key={item._id} className="admin-card overflow-hidden relative group">
            <img src={resolveImageUrl(item.src)} alt={item.alt} className="w-full h-24 object-cover" />
            <span className="absolute top-1 left-1 text-[9px] bg-black/50 text-white px-1.5 py-0.5 rounded">{item.section}</span>
            <div className="p-2 flex gap-1">
              <button type="button" className="admin-btn admin-btn-ghost text-[10px] flex-1" onClick={() => setForm(item)}>Edit</button>
              <button type="button" className="admin-btn admin-btn-danger text-[10px]" onClick={() => remove(item._id)}>
                <Trash2 size={10} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
