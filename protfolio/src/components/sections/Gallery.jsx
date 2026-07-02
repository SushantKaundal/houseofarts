import { useRef, useEffect, useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { ZoomIn } from "lucide-react"
import SectionHeading from "../ui/SectionHeading"
import Button from "../ui/Button"
import { useSite } from "../../context/SiteContext"
import { resolveImageUrl } from "../../lib/api"

gsap.registerPlugin(ScrollTrigger)

const INITIAL_COUNT = 9
const LOAD_MORE_COUNT = 9

export default function Gallery() {
  const navigate = useNavigate()
  const { data, get } = useSite()
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const [activeCategory, setActiveCategory] = useState("All")
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)

  const galleryItems = data.gallery || []
  const galleryCategories = useMemo(() => {
    const cats = data.categories || []
    return ["All", ...cats.filter((c) => c !== "All")]
  }, [data.categories])

  const filtered = useMemo(() => {
    if (activeCategory === "All") return galleryItems
    return galleryItems.filter((item) => item.category === activeCategory)
  }, [activeCategory, galleryItems])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const openArtwork = (item) => {
    const id = item._id || item.id
    navigate(`/artwork/${id}`)
  }

  useEffect(() => {
    setVisibleCount(INITIAL_COUNT)
  }, [activeCategory])

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const ctx = gsap.context(() => {
      gsap.from(grid.querySelectorAll(".masonry-item"), {
        y: 60,
        opacity: 0,
        scale: 0.97,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      })
    }, grid)

    return () => ctx.revert()
  }, [visible.length, activeCategory])

  return (
    <section ref={sectionRef} id="gallery" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory-dark/50 via-ivory to-pearl" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          label="Gallery"
          title={get("gallery.title", "Artwork Showcase")}
          subtitle={get("gallery.subtitle")}
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-gold to-gold-light text-charcoal shadow-md"
                  : "glass theme-text-muted hover:theme-text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="masonry-grid">
          {visible.map((item) => (
            <motion.div
              key={item._id || item.id}
              layout
              className="masonry-item group relative rounded-2xl overflow-hidden cursor-pointer resin-shine shadow-lg shadow-charcoal/5"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => openArtwork(item)}
            >
              <img
                src={resolveImageUrl(item.src)}
                alt={item.title}
                className="w-full h-48 sm:h-52 md:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5">
                <span className="text-gold-light text-xs uppercase tracking-wider mb-1">{item.category}</span>
                <h3 className="text-white font-serif text-lg">{item.title}</h3>
                <ZoomIn size={20} className="absolute top-4 right-4 text-white/80" />
              </div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-12">
            <Button variant="secondary" onClick={() => setVisibleCount((c) => Math.min(c + LOAD_MORE_COUNT, filtered.length))}>
              View More Artworks ({filtered.length - visibleCount} remaining)
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
