import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../lib/api"
import "./admin.css"

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const { token, admin } = await api.login(username.trim(), password.trim())
      localStorage.setItem("ruchi_admin_token", token)
      onLogin(admin)
      navigate("/admin")
    } catch (err) {
      setError(err.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-root min-h-screen flex items-center justify-center p-6" data-theme="gold-pearl">
      <div className="admin-card p-8 w-full max-w-md shadow-xl">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-semibold mb-2">House Of Arts</h1>
          <p className="text-sm opacity-60">Admin — sign in to manage your website</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wider opacity-60">Username</label>
            <input
              className="admin-input mt-1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ruchi"
              required
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider opacity-60">Password</label>
            <input
              type="password"
              className="admin-input mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="admin-btn admin-btn-primary w-full py-3"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-xs opacity-40 mt-6">
          <a href="/" className="hover:opacity-70">← Back to website</a>
        </p>
      </div>
    </div>
  )
}
