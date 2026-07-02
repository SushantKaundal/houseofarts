import { useEffect, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { api } from "../lib/api"
import AdminLogin from "./Login"
import AdminLayout from "./components/AdminLayout"
import Dashboard from "./pages/Dashboard"
import ContentPage from "./pages/ContentPage"
import ImagesPage from "./pages/ImagesPage"
import GalleryPage from "./pages/GalleryPage"
import ServicesPage from "./pages/ServicesPage"
import SlidersPage from "./pages/SlidersPage"
import TestimonialsPage from "./pages/TestimonialsPage"
import SocialsPage from "./pages/SocialsPage"
import SubmissionsPage from "./pages/SubmissionsPage"
import WebsiteThemesPage from "./pages/WebsiteThemesPage"

function ProtectedRoute({ admin, children }) {
  if (!admin) return <Navigate to="/admin/login" replace />
  return children
}

export default function AdminApp() {
  const [admin, setAdmin] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("ruchi_admin_token")
    if (!token) {
      setChecking(false)
      return
    }
    api
      .getMe()
      .then((data) => setAdmin(data))
      .catch(() => localStorage.removeItem("ruchi_admin_token"))
      .finally(() => setChecking(false))
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="opacity-50">Loading...</p>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="login" element={<AdminLogin onLogin={setAdmin} />} />
      <Route
        element={
          <ProtectedRoute admin={admin}>
            <AdminLayout
              admin={admin}
              onThemeChange={(theme) => setAdmin((a) => ({ ...a, theme }))}
              onLogout={() => setAdmin(null)}
            />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="submissions" element={<SubmissionsPage />} />
        <Route path="content" element={<ContentPage />} />
        <Route path="images" element={<ImagesPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="sliders" element={<SlidersPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
        <Route path="socials" element={<SocialsPage />} />
        <Route path="website-themes" element={<WebsiteThemesPage />} />
      </Route>
    </Routes>
  )
}
