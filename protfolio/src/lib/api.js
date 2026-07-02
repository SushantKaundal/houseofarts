const API_BASE = import.meta.env.VITE_API_URL || "/api"
const API_ORIGIN = (() => {
  if (import.meta.env.VITE_UPLOADS_BASE) return import.meta.env.VITE_UPLOADS_BASE
  if (API_BASE.startsWith("http")) return API_BASE.replace(/\/api\/?$/, "")
  return ""
})()

function getToken() {
  return localStorage.getItem("ruchi_admin_token")
}

async function request(path, options = {}) {
  const headers = { ...options.headers }
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json"
  }
  const token = getToken()
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || "Request failed")
  return data
}

export const api = {
  getSite: () => request("/site"),
  login: (username, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  getMe: () => request("/auth/me"),
  updateTheme: (theme) =>
    request("/auth/theme", { method: "PUT", body: JSON.stringify({ theme }) }),

  getContent: () => request("/admin/content"),
  updateContent: (key, value, group) =>
    request(`/admin/content/${key}`, {
      method: "PUT",
      body: JSON.stringify({ value, group }),
    }),
  bulkUpdateContent: (items) =>
    request("/admin/content", { method: "PUT", body: JSON.stringify({ items }) }),

  getImages: () => request("/admin/images"),
  updateImage: (key, data) =>
    request(`/admin/images/${key}`, { method: "PUT", body: JSON.stringify(data) }),
  uploadImage: (file) => {
    const form = new FormData()
    form.append("image", file)
    return request("/admin/upload", { method: "POST", body: form })
  },

  getCategories: () => request("/admin/categories"),
  createCategory: (data) =>
    request("/admin/categories", { method: "POST", body: JSON.stringify(data) }),
  updateCategory: (id, data) =>
    request(`/admin/categories/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteCategory: (id) => request(`/admin/categories/${id}`, { method: "DELETE" }),

  getGallery: () => request("/admin/gallery"),
  createGalleryItem: (data) =>
    request("/admin/gallery", { method: "POST", body: JSON.stringify(data) }),
  updateGalleryItem: (id, data) =>
    request(`/admin/gallery/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteGalleryItem: (id) => request(`/admin/gallery/${id}`, { method: "DELETE" }),

  getServices: () => request("/admin/services"),
  createService: (data) =>
    request("/admin/services", { method: "POST", body: JSON.stringify(data) }),
  updateService: (id, data) =>
    request(`/admin/services/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteService: (id) => request(`/admin/services/${id}`, { method: "DELETE" }),

  getTestimonials: () => request("/admin/testimonials"),
  createTestimonial: (data) =>
    request("/admin/testimonials", { method: "POST", body: JSON.stringify(data) }),
  updateTestimonial: (id, data) =>
    request(`/admin/testimonials/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteTestimonial: (id) => request(`/admin/testimonials/${id}`, { method: "DELETE" }),

  getSliders: () => request("/admin/sliders"),
  createSlider: (data) =>
    request("/admin/sliders", { method: "POST", body: JSON.stringify(data) }),
  updateSlider: (id, data) =>
    request(`/admin/sliders/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSlider: (id) => request(`/admin/sliders/${id}`, { method: "DELETE" }),

  getSocials: () => request("/admin/socials"),
  createSocial: (data) =>
    request("/admin/socials", { method: "POST", body: JSON.stringify(data) }),
  updateSocial: (id, data) =>
    request(`/admin/socials/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSocial: (id) => request(`/admin/socials/${id}`, { method: "DELETE" }),

  getSubmissions: () => request("/admin/submissions"),
  markSubmissionRead: (id, read = true) =>
    request(`/admin/submissions/${id}/read`, {
      method: "PUT",
      body: JSON.stringify({ read }),
    }),
  deleteSubmission: (id) => request(`/admin/submissions/${id}`, { method: "DELETE" }),

  submitContact: (data) =>
    request("/contact", { method: "POST", body: JSON.stringify(data) }),
}

export function resolveImageUrl(src) {
  if (!src) return ""
  if (src.startsWith("http")) return src
  if (src.startsWith("/uploads")) return `${API_ORIGIN}${src}`
  return src
}
