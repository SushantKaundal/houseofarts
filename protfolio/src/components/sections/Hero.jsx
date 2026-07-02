import { useRef, useEffect, useState, lazy, Suspense } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronDown } from "lucide-react"
import Button from "../ui/Button"
import FloatingElements from "../effects/FloatingElements"
import { useSite } from "../../context/SiteContext"
import { resolveImageUrl } from "../../lib/api"

const ResinScene3D = lazy(() => import("../effects/ResinScene3D"))

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const { data, get } = useSite()
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const textRef = useRef(null)
  const [show3D, setShow3D] = useState(false)

  const heroImg = data.images?.hero || { src: "", alt: "Ruchi" }

  useEffect(() => {
    setShow3D(window.innerWidth >= 768)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.from(textRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.2,
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const siteName = get("site.name", "House Of Arts")

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden theme-hero"
    >
      <div className="absolute inset-0 theme-hero-bg" />
      <FloatingElements />
      {show3D && (
        <Suspense fallback={null}>
          <ResinScene3D className="absolute inset-0 w-full h-full opacity-40 hidden md:block" />
        </Suspense>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 flex justify-center order-1">
            <motion.div
              ref={imageRef}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-[260px] sm:max-w-xs lg:max-w-sm mb-2"
            >
              <div className="absolute -inset-3 rounded-[2rem] theme-hero-glow blur-sm" />
              <div className="absolute -inset-0.5 rounded-[1.75rem] theme-hero-frame p-[2px]">
                <div className="rounded-[1.75rem] overflow-hidden bg-ivory">
                  <img
                    src={resolveImageUrl(heroImg.src)}
                    alt={heroImg.alt}
                    className="w-full aspect-[3/4] object-cover object-top"
                    fetchPriority="high"
                  />
                </div>
              </div>

              <motion.div
                className="absolute -bottom-3 -right-3 md:-right-6 glass rounded-xl px-3 py-2 shadow-lg z-10"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-[10px] text-gold font-medium uppercase tracking-wider">
                  {get("hero.accentTitle", "Premium Finishing")}
                </p>
                <p className="text-xs font-serif text-charcoal">
                  {get("hero.accentSubtitle", "100% Handmade")}
                </p>
              </motion.div>
            </motion.div>
          </div>

          <div ref={textRef} className="lg:col-span-7 order-2 text-center lg:text-left">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold font-medium mb-2"
            >
              {get("hero.badge", "Handcrafted with Love")}
            </motion.span>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold text-charcoal leading-[1.08] mb-3">
              {siteName.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-2 last:mr-0">
                  {word === "Arts" ? (
                    <span className="theme-accent-text bg-clip-text text-transparent">
                      {word}
                    </span>
                  ) : (
                    word
                  )}
                </span>
              ))}
            </h1>

            <p className="text-sm md:text-base text-charcoal-soft leading-relaxed max-w-md mx-auto lg:mx-0 mb-6">
              {get("site.tagline")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Button href="#gallery" variant="primary">
                View Artworks
              </Button>
              <Button href="#contact" variant="secondary">
                Book Custom Order
              </Button>
            </div>
          </div>
        </div>

        <motion.a
          href="#work-strip"
          className="flex flex-col items-center gap-1 mt-12 text-charcoal-soft/50 hover:text-gold transition-colors"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[9px] uppercase tracking-[0.2em]">Explore</span>
          <ChevronDown size={16} />
        </motion.a>
      </div>
    </section>
  )
}
