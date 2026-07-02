import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import SectionHeading from "../ui/SectionHeading"
import { useSite } from "../../context/SiteContext"

gsap.registerPlugin(ScrollTrigger)

export default function Testimonials() {
  const { data, get } = useSite()
  const testimonials = data.testimonials || []
  const sectionRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    if (testimonials.length === 0) return
    const interval = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector(".testimonial-container"), {
        y: 50, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  if (testimonials.length === 0) return null

  const navigate = (dir) => {
    setDirection(dir)
    setCurrent((prev) => {
      if (dir === 1) return (prev + 1) % testimonials.length
      return (prev - 1 + testimonials.length) % testimonials.length
    })
  }

  const t = testimonials[current]
  const variants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  }

  const stats = [
    { value: get("stats.pieces", "500+"), label: get("stats.piecesLabel", "Pieces Crafted") },
    { value: get("stats.handmade", "100%"), label: get("stats.handmadeLabel", "Handmade") },
    { value: get("stats.rating", "5★"), label: get("stats.ratingLabel", "Customer Rating") },
    { value: get("stats.region", "Punjab"), label: get("stats.regionLabel", "& Beyond") },
  ]

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pearl via-blush-light/20 to-ivory" />

      <div className="relative max-w-5xl mx-auto px-5 md:px-8">
        <SectionHeading
          label="Testimonials"
          title={get("testimonials.title", "Happy Customers")}
          subtitle={get("testimonials.subtitle")}
        />

        <div className="testimonial-container relative">
          <div className="glass rounded-3xl p-8 md:p-12 shadow-xl shadow-charcoal/5 min-h-[280px] flex flex-col justify-center">
            <Quote size={40} className="text-gold/30 absolute top-6 left-6 md:top-8 md:left-8" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative z-10 text-center px-4 md:px-12"
              >
                <div className="flex justify-center gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="font-serif text-lg md:text-xl text-charcoal leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <span className="inline-block text-xs uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full mb-3">{t.highlight}</span>
                  <p className="font-medium text-charcoal">{t.name}</p>
                  <p className="text-sm text-charcoal-soft">{t.location}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button type="button" onClick={() => navigate(-1)} className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-white/60 transition-colors" aria-label="Previous testimonial">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-gold" : "w-2 bg-charcoal/20 hover:bg-charcoal/30"}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button type="button" onClick={() => navigate(1)} className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-white/60 transition-colors" aria-label="Next testimonial">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center glass rounded-2xl py-5 px-3">
              <p className="font-serif text-2xl md:text-3xl text-gold font-semibold">{stat.value}</p>
              <p className="text-xs text-charcoal-soft mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
