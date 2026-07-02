import { NavLink, Outlet, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  FileText,
  Image,
  Grid3x3,
  Layers,
  MessageSquare,
  Star,
  Share2,
  Inbox,
  LogOut,
  Palette,
} from "lucide-react"
import { api } from "../../lib/api"
import "../admin.css"

const THEMES = [
  { id: "gold-pearl", label: "Gold & Pearl" },
  { id: "rose-blush", label: "Rose Blush" },
  { id: "ocean-lavender", label: "Ocean Lavender" },
  { id: "midnight", label: "Midnight" },
]

const NAV = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/submissions", icon: Inbox, label: "Form Submissions" },
  { to: "/admin/content", icon: FileText, label: "Text Content" },
  { to: "/admin/images", icon: Image, label: "Site Images" },
  { to: "/admin/gallery", icon: Grid3x3, label: "Gallery" },
  { to: "/admin/services", icon: Layers, label: "Service Cards" },
  { to: "/admin/website-themes", icon: Palette, label: "Website Themes" },
  { to: "/admin/sliders", icon: Image, label: "Slider Images" },
  { to: "/admin/testimonials", icon: Star, label: "Happy Customers" },
  { to: "/admin/socials", icon: Share2, label: "Social Links" },
]

export default function AdminLayout({ admin, onThemeChange, onLogout }) {
  const navigate = useNavigate()

  const handleTheme = async (theme) => {
    try {
      await api.updateTheme(theme)
      onThemeChange(theme)
    } catch {
      onThemeChange(theme)
    }
  }

  const logout = () => {
    localStorage.removeItem("ruchi_admin_token")
    onLogout()
    navigate("/admin/login")
  }

  return (
    <div className="admin-root flex" data-theme={admin?.theme || "gold-pearl"}>
      <aside className="admin-sidebar w-64 min-h-screen p-5 flex flex-col shrink-0">
        <div className="mb-8">
          <h1 className="font-serif text-xl font-semibold">House Of Arts</h1>
          <p className="text-xs opacity-60 mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `admin-nav-link${isActive ? " active" : ""}`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
          <div>
            <p className="text-xs uppercase tracking-wider opacity-50 mb-2 flex items-center gap-1">
              <Palette size={12} /> Admin Panel Theme
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTheme(t.id)}
                  className={`text-[10px] px-2 py-1.5 rounded-md transition-all ${
                    admin?.theme === t.id
                      ? "admin-accent font-medium"
                      : "bg-white/10 hover:bg-white/15"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs opacity-50">Logged in as {admin?.username}</p>
          <button type="button" onClick={logout} className="admin-nav-link w-full">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
