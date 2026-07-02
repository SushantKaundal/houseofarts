import { useMemo } from "react"
import { useSite } from "../../context/SiteContext"
import { resolveImageUrl } from "../../lib/api"

/** Standalone work strip — sits below hero, never overlaps the main image */
export default function HeroWorkStrip() {
  const { data } = useSite()

  const showcaseImages = useMemo(() => {
    const heroSliders = data.sliders?.filter((s) => s.section === "hero") || []
    const marquee = data.sliders?.filter((s) => s.section === "marquee") || []
    const combined = [...heroSliders, ...marquee].slice(0, 10)
    if (combined.length === 0 && data.gallery?.length) {
      return data.gallery.slice(0, 8).map((g) => ({ src: g.src, alt: g.title }))
    }
    return combined
  }, [data.sliders, data.gallery])

  if (showcaseImages.length === 0) return null

  const filmstrip = [...showcaseImages, ...showcaseImages]

  return (
    <section
      aria-label="Featured work preview"
      id="work-strip"
      className="relative z-10 theme-work-strip py-8 md:py-10 border-t border-gold/10"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-charcoal-soft/60 mb-4 text-center">
          A glimpse of my work
        </p>
        <div className="flex overflow-hidden rounded-2xl [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
          <div className="flex gap-3 md:gap-4 animate-marquee shrink-0 py-1">
            {filmstrip.map((item, i) => (
              <div
                key={`${item.src}-strip-${i}`}
                className="w-[4.5rem] h-[4.5rem] sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 shadow-lg border-2 border-white/70 resin-shine theme-work-thumb"
              >
                <img
                  src={resolveImageUrl(item.src)}
                  alt={item.alt || `Creation ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
