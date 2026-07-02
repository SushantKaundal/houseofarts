import { useRef, useEffect, useState, lazy, Suspense } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Button from "../ui/Button"
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
    <section ref={sectionRef} id="hero" className="relative z-10">
      {show3D && (
        <Suspense fallback={null}>
          <ResinScene3D className="absolute inset-0 w-full h-full opacity-30 hidden md:block pointer-events-none" />
        </Suspense>
      )}

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full pt-24 pb-6 md:pt-28 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center order-1">
            <motion.div
              ref={imageRef}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[330px]"
            >
              <div className="absolute -inset-3 rounded-[2rem] theme-hero-glow blur-sm" />
              <div className="relative rounded-[1.75rem] theme-hero-frame p-[2px]">
                <div className="rounded-[1.75rem] overflow-hidden bg-ivory flex items-center justify-center">
                  <img
                    src={resolveImageUrl(heroImg.src)}
                    alt={heroImg.alt}
                    className="w-full h-auto max-h-[52vh] md:max-h-[60vh] object-contain"
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
                <p className="text-xs font-serif theme-text-primary">
                  {get("hero.accentSubtitle", "100% Handmade")}
                </p>
              </motion.div>
            </motion.div>
          </div>

          <div ref={textRef} className="lg:col-span-7 order-2 text-center lg:text-left lg:-mt-8">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] text-gold font-medium mb-2"
            >
              {get("hero.badge", "Handcrafted with Love")}
            </motion.span>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold theme-text-primary leading-[1.08] mb-3">
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

            <p className="text-sm md:text-base theme-text-muted leading-relaxed max-w-md mx-auto lg:mx-0 mb-6">
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

      </div>
    </section>
  )
}
