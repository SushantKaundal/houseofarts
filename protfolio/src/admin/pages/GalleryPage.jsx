import { useEffect, useState } from "react"
import { api } from "../../lib/api"
import ImageUploader from "../components/ImageUploader"
import { resolveImageUrl } from "../../lib/api"
import { Plus, Trash2 } from "lucide-react"

export default function GalleryPage() {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [newCat, setNewCat] = useState("")
  const [form, setForm] = useState(null)

  const load = async () => {
    const [g, c] = await Promise.all([api.getGallery(), api.getCategories()])
    setItems(g)
    setCategories(c)
  }

  useEffect(() => { load().catch(() => {}) }, [])

  const addCategory = async () => {
    if (!newCat.trim()) return
    await api.createCategory({ name: newCat.trim(), order: categories.length })
    setNewCat("")
    load()
  }

  const saveItem = async () => {
    if (!form?.title || !form?.src || !form?.category) return
    if (form._id) await api.updateGalleryItem(form._id, form)
    else await api.createGalleryItem(form)
    setForm(null)
    load()
  }

  const deleteItem = async (id) => {
    if (!confirm("Delete this gallery item?")) return
    await api.deleteGalleryItem(id)
    load()
  }

  const deleteCat = async (id) => {
    if (!confirm("Delete this category?")) return
    await api.deleteCategory(id)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl font-semibold">Gallery</h2>
          <p className="text-sm opacity-60">Manage categories and artwork cards.</p>
        </div>
        <button
          type="button"
          className="admin-btn admin-btn-primary flex items-center gap-2"
          onClick={() => setForm({ title: "", src: "", alt: "", description: "", category: categories[0]?.name || "Home Decor", order: items.length })}
        >
          <Plus size={16} /> Add Item
        </button>
      </div>

      {/* Categories */}
      <div className="admin-card p-5 mb-6">
        <h3 className="font-medium mb-3">Categories (Headers)</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs bg-[var(--admin-accent)] text-[var(--admin-sidebar)]">All</span>
          {categories.map((c) => (
            <span key={c._id} className="px-3 py-1 rounded-full text-xs admin-card flex items-center gap-2">
              {c.name}
              <button type="button" onClick={() => deleteCat(c._id)} className="opacity-50 hover:opacity-100">
                <Trash2 size={12} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="admin-input flex-1"
            placeholder="New category name (e.g. Home Decor)"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
          />
          <button type="button" className="admin-btn admin-btn-primary" onClick={addCategory}>Add</button>
        </div>
      </div>

      {/* Add/Edit form */}
      {form && (
        <div className="admin-card p-5 mb-6 space-y-4">
          <h3 className="font-medium">{form._id ? "Edit" : "New"} Gallery Item</h3>
          <input className="admin-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="admin-input" placeholder="Alt text" value={form.alt || ""} onChange={(e) => setForm({ ...form, alt: e.target.value })} />
          <textarea
            className="admin-input min-h-24"
            placeholder="Artwork description (shown on artwork detail page and WhatsApp order text)"
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <select className="admin-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {categories.map((c) => <option key={c._id} value={c.name}>{c.name}</option>)}
          </select>
          <ImageUploader value={form.src} onChange={(src) => setForm({ ...form, src })} />
          <div className="flex gap-2">
            <button type="button" className="admin-btn admin-btn-primary" onClick={saveItem}>Save</button>
            <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setForm(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item._id} className="admin-card overflow-hidden">
            <img src={resolveImageUrl(item.src)} alt={item.title} className="w-full h-36 object-cover" />
            <div className="p-3">
              <p className="text-sm font-medium truncate">{item.title}</p>
              <p className="text-xs opacity-50">{item.category}</p>
              <p className="text-xs opacity-60 line-clamp-2 mt-1">{item.description || "No description set"}</p>
              <div className="flex gap-2 mt-2">
                <button type="button" className="admin-btn admin-btn-ghost text-xs flex-1" onClick={() => setForm(item)}>Edit</button>
                <button type="button" className="admin-btn admin-btn-danger text-xs" onClick={() => deleteItem(item._id)}>
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
