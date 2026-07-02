import { useEffect, useState } from "react"
import { api } from "../../lib/api"
import { Plus, Trash2 } from "lucide-react"

export default function TestimonialsPage() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState(null)

  const load = () => api.getTestimonials().then(setItems).catch(() => {})
  useEffect(() => { load() }, [])

  const save = async () => {
    if (!form?.name || !form?.text) return
    if (form._id) await api.updateTestimonial(form._id, form)
    else await api.createTestimonial(form)
    setForm(null)
    load()
  }

  const remove = async (id) => {
    if (!confirm("Delete this testimonial?")) return
    await api.deleteTestimonial(id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl font-semibold">Happy Customers</h2>
          <p className="text-sm opacity-60">Manage customer reviews and testimonials.</p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn-primary flex items-center gap-2"
          onClick={() => setForm({ name: "", location: "", text: "", rating: 5, highlight: "", order: items.length })}
        >
          <Plus size={16} /> Add Review
        </button>
      </div>

      {form && (
        <div className="admin-card p-5 mb-6 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input className="admin-input" placeholder="Customer name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="admin-input" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <textarea className="admin-input min-h-[100px]" placeholder="Review text" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <input className="admin-input" placeholder="Highlight tag" value={form.highlight} onChange={(e) => setForm({ ...form, highlight: e.target.value })} />
            <select className="admin-input" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
              {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} Stars</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <button type="button" className="admin-btn admin-btn-primary" onClick={save}>Save</button>
            <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setForm(null)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="admin-card p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{item.name} <span className="text-xs opacity-50">— {item.location}</span></p>
                <p className="text-sm opacity-70 mt-2 italic">&ldquo;{item.text}&rdquo;</p>
                <span className="text-xs mt-2 inline-block opacity-50">{item.highlight} · {item.rating}★</span>
              </div>
              <div className="flex gap-2 shrink-0">
                <button type="button" className="admin-btn admin-btn-ghost text-xs" onClick={() => setForm(item)}>Edit</button>
                <button type="button" className="admin-btn admin-btn-danger text-xs" onClick={() => remove(item._id)}>
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
