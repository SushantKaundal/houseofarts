import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { api } from "../../lib/api"
import { Inbox, Grid3x3, Star, ExternalLink } from "lucide-react"

export default function Dashboard() {
  const [stats, setStats] = useState({ submissions: 0, unread: 0, gallery: 0, testimonials: 0 })

  useEffect(() => {
    Promise.all([
      api.getSubmissions(),
      api.getGallery(),
      api.getTestimonials(),
    ])
      .then(([subs, gallery, testimonials]) => {
        setStats({
          submissions: subs.length,
          unread: subs.filter((s) => !s.read).length,
          gallery: gallery.length,
          testimonials: testimonials.length,
        })
      })
      .catch(() => {})
  }, [])

  const cards = [
    { label: "Form Submissions", value: stats.submissions, sub: `${stats.unread} unread`, to: "/admin/submissions", icon: Inbox },
    { label: "Gallery Items", value: stats.gallery, to: "/admin/gallery", icon: Grid3x3 },
    { label: "Testimonials", value: stats.testimonials, to: "/admin/testimonials", icon: Star },
  ]

  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold mb-2">Dashboard</h2>
      <p className="text-sm opacity-60 mb-8">Welcome back, Ruchi! Manage your website content from here.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {cards.map(({ label, value, sub, to, icon: Icon }) => (
          <Link key={to} to={to} className="admin-card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <Icon size={22} className="opacity-50" />
              <span className="font-serif text-3xl font-semibold">{value}</span>
            </div>
            <p className="font-medium">{label}</p>
            {sub && <p className="text-xs opacity-50 mt-1">{sub}</p>}
          </Link>
        ))}
      </div>

      <div className="admin-card p-6">
        <h3 className="font-medium mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/content" className="admin-btn admin-btn-primary">Edit Text</Link>
          <Link to="/admin/gallery" className="admin-btn admin-btn-ghost">Add Gallery Item</Link>
          <Link to="/admin/testimonials" className="admin-btn admin-btn-ghost">Add Review</Link>
          <a href="/" target="_blank" rel="noreferrer" className="admin-btn admin-btn-ghost flex items-center gap-2">
            <ExternalLink size={14} /> View Website
          </a>
        </div>
      </div>
    </div>
  )
}
