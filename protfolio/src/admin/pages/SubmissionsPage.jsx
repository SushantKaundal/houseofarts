import { useEffect, useState } from "react"
import { api } from "../../lib/api"
import { Trash2, Mail, Check } from "lucide-react"

export default function SubmissionsPage() {
  const [items, setItems] = useState([])

  const load = () => api.getSubmissions().then(setItems).catch(() => {})
  useEffect(() => { load() }, [])

  const markRead = async (id) => {
    await api.markSubmissionRead(id)
    load()
  }

  const remove = async (id) => {
    if (!confirm("Delete this submission?")) return
    await api.deleteSubmission(id)
    load()
  }

  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold mb-2">Form Submissions</h2>
      <p className="text-sm opacity-60 mb-6">Custom order inquiries from the contact form.</p>

      {items.length === 0 ? (
        <div className="admin-card p-10 text-center opacity-50">No submissions yet.</div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className={`admin-card p-5 ${!item.read ? "border-l-4 border-l-[var(--admin-accent)]" : ""}`}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="font-medium">{item.name}</p>
                    {!item.read && <span className="text-[10px] px-2 py-0.5 rounded-full admin-accent">New</span>}
                  </div>
                  <p className="text-sm opacity-70">{item.phone} {item.email && `· ${item.email}`}</p>
                  <p className="text-sm mt-3 leading-relaxed">{item.message}</p>
                  <p className="text-xs opacity-40 mt-2">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!item.read && (
                    <button type="button" className="admin-btn admin-btn-ghost text-xs" onClick={() => markRead(item._id)}>
                      <Check size={14} />
                    </button>
                  )}
                  <a href={`mailto:${item.email}`} className="admin-btn admin-btn-ghost text-xs">
                    <Mail size={14} />
                  </a>
                  <button type="button" className="admin-btn admin-btn-danger text-xs" onClick={() => remove(item._id)}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
