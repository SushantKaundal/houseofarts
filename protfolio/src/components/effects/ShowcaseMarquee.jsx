import { useSite } from "../../context/SiteContext"
import { resolveImageUrl } from "../../lib/api"

/**
 * Slim infinite-scroll filmstrip — showcases work without dominating the page.
 */
export default function ShowcaseMarquee() {
  const { data } = useSite()
  const marqueeImages = data.sliders?.filter((s) => s.section === "marquee") || []
  const items = [...marqueeImages, ...marqueeImages]

  if (items.length === 0) return null

  return (
    <section
      aria-label="Featured creations preview"
      className="relative py-8 overflow-hidden bg-gradient-to-r from-ivory via-pearl to-ivory-dark/40"
    >
      <div className="gold-line mb-8 opacity-40" />

      <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-4 animate-marquee shrink-0">
          {items.map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden shrink-0 shadow-md shadow-charcoal/10 border border-white/60"
            >
              <img
                src={resolveImageUrl(item.src)}
                alt={item.alt}
                className="w-full h-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="gold-line mt-8 opacity-40" />
    </section>
  )
}
