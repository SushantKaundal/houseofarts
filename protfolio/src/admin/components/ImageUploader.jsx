import { useState } from "react"
import { api, resolveImageUrl } from "../../lib/api"

export default function ImageUploader({ value, onChange, label = "Image" }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError("")
    try {
      const { url } = await api.uploadImage(file)
      onChange(url)
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-wider opacity-60">{label}</label>
      <div className="flex gap-3 items-start">
        {value && (
          <img
            src={resolveImageUrl(value)}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-lg border border-[var(--admin-border)]"
          />
        )}
        <div className="flex-1 space-y-2">
          <input
            className="admin-input"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/... or upload"
          />
          <label className="admin-btn admin-btn-ghost inline-block cursor-pointer text-xs">
            {uploading ? "Uploading..." : "Upload Image"}
            <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </label>
          {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
      </div>
    </div>
  )
}
