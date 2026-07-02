import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useSite } from "../../context/SiteContext"
import { resolveImageUrl } from "../../lib/api"

export default function HeroWorkStrip() {
  const navigate = useNavigate()
  const { data } = useSite()

  const showcaseImages = useMemo(() => {
    const gallery = data.gallery || []
    const findGalleryId = (src) => {
      const match = gallery.find((g) => g.src === src)
      return match ? String(match._id || match.id) : null
    }

    const heroSliders = data.sliders?.filter((s) => s.section === "hero") || []
    const marquee = data.sliders?.filter((s) => s.section === "marquee") || []
    const combined = [...heroSliders, ...marquee].slice(0, 10).map((item) => ({
      src: item.src,
      alt: item.alt,
      galleryId: findGalleryId(item.src),
    }))

    if (combined.length === 0 && gallery.length) {
      return gallery.slice(0, 8).map((g) => ({
        src: g.src,
        alt: g.title,
        galleryId: String(g._id || g.id),
      }))
    }
    return combined
  }, [data.sliders, data.gallery])

  if (showcaseImages.length === 0) return null

  const filmstrip = [...showcaseImages, ...showcaseImages]

  const openArtwork = (item) => {
    if (item.galleryId) navigate(`/artwork/${item.galleryId}`)
  }

  return (
    <section
      aria-label="Featured work preview"
      id="work-strip"
      className="relative z-10 -mt-2 md:-mt-4 py-4 md:py-6 pb-10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <p className="text-[10px] uppercase tracking-[0.25em] theme-text-muted mb-4 text-center">
          A glimpse of my work
        </p>
        <div className="flex overflow-hidden rounded-2xl [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
          <div className="flex gap-3 md:gap-4 animate-marquee shrink-0 py-1">
            {filmstrip.map((item, i) => (
              <button
                key={`${item.src}-strip-${i}`}
                type="button"
                onClick={() => openArtwork(item)}
                disabled={!item.galleryId}
                className={`w-[3.75rem] h-[3.75rem] sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 shadow-lg border-2 border-white/70 resin-shine theme-work-thumb ${
                  item.galleryId ? "cursor-pointer hover:scale-105 transition-transform" : "cursor-default"
                }`}
              >
                <img
                  src={resolveImageUrl(item.src)}
                  alt={item.alt || `Creation ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
