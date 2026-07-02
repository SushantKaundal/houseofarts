import { useEffect, useState } from "react"
import { api } from "../../lib/api"
import ImageUploader from "../components/ImageUploader"
import { resolveImageUrl } from "../../lib/api"

const REQUIRED_IMAGES = [
  {
    key: "workshopMain",
    src: "/images/ruchinew/image00014.jpg",
    alt: "Resin workshop session",
    section: "workshop",
  },
]

export default function ImagesPage() {
  const [images, setImages] = useState([])

  const load = () =>
    api
      .getImages()
      .then((loaded) => {
        const map = new Map(loaded.map((item) => [item.key, item]))
        const merged = [...loaded]
        REQUIRED_IMAGES.forEach((required) => {
          if (!map.has(required.key)) merged.push({ _id: `new-${required.key}`, ...required })
        })
        setImages(merged)
      })
      .catch(() => {})

  useEffect(() => { load() }, [])

  const update = async (key, data) => {
    await api.updateImage(key, data)
    load()
  }

  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold mb-2">Site Images</h2>
      <p className="text-sm opacity-60 mb-6">Update images used across hero, about, process sections.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {images.map((img) => (
          <div key={img.key} className="admin-card p-5">
            <h3 className="font-medium mb-3 capitalize">{img.key}</h3>
            <img
              src={resolveImageUrl(img.src)}
              alt={img.alt}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <ImageUploader
              label="Image URL"
              value={img.src}
              onChange={(src) => update(img.key, { ...img, src })}
            />
            <div className="mt-3">
              <label className="text-xs uppercase tracking-wider opacity-50">Alt Text</label>
              <input
                className="admin-input mt-1"
                defaultValue={img.alt}
                onBlur={(e) => update(img.key, { ...img, alt: e.target.value })}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
