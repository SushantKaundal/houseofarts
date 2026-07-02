import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import SectionHeading from "../ui/SectionHeading"
import { useSite } from "../../context/SiteContext"
import { iconMap } from "../../lib/icons.jsx"
import { Sparkles } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const { data, get } = useSite()
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const services = data.services || []

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const ctx = gsap.context(() => {
      gsap.from(grid.children, {
        y: 60, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: grid, start: "top 80%", toggleActions: "play none none reverse" },
      })
    }, grid)

    return () => ctx.revert()
  }, [services.length])

  return (
    <section ref={sectionRef} id="services" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-lavender-light/30 via-ivory to-blush-light/30" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          label="Services"
          title={get("services.title", "What I Create")}
          subtitle={get("services.subtitle")}
        />

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Sparkles
            return (
              <motion.div
                key={service._id || service.id}
                className="group relative glass rounded-3xl p-7 md:p-8 resin-shine cursor-default"
                whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(201, 169, 98, 0.2)" }}
                transition={{ duration: 0.35 }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 from-gold/5 to-blush/10 pointer-events-none" />
                <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <Icon size={24} className="text-charcoal/80" />
                </div>
                <h3 className="relative font-serif text-xl md:text-2xl font-semibold text-charcoal mb-3">{service.title}</h3>
                <p className="relative text-sm text-charcoal-soft leading-relaxed">{service.description}</p>
                <div className="relative mt-5 h-px w-12 bg-gold/40 group-hover:w-full transition-all duration-500" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
