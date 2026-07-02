import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SectionHeading from "../ui/SectionHeading"
import { processSteps } from "../../data/services"
import { useSite } from "../../context/SiteContext"
import { resolveImageUrl } from "../../lib/api"
import { Sparkles, Frame, Gift } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const stepIcons = [Sparkles, Frame, Sparkles, Gift]

export default function Process() {
  const { data, get } = useSite()
  const sectionRef = useRef(null)
  const timelineRef = useRef(null)
  const lineRef = useRef(null)

  const processImages = [
    data.images?.process1,
    data.images?.process2,
    data.images?.process3,
    data.images?.process4,
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleY: 0, transformOrigin: "top", duration: 1.5, ease: "power2.inOut",
          scrollTrigger: { trigger: timelineRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        })
      }
      const steps = timelineRef.current?.querySelectorAll(".process-step")
      if (steps) {
        gsap.from(steps, {
          x: -40, opacity: 0, duration: 0.7, stagger: 0.2, ease: "power3.out",
          scrollTrigger: { trigger: timelineRef.current, start: "top 75%", toggleActions: "play none none reverse" },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="process" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#3d3848] to-charcoal" />
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-blush/5 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-5 md:px-8">
        <SectionHeading
          label="Process"
          title={get("process.title", "How It Works")}
          subtitle={get("process.subtitle")}
          dark
        />

        <div ref={timelineRef} className="relative">
          <div ref={lineRef} className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold-light to-gold" />

          <div className="space-y-10 md:space-y-14">
            {processSteps.map((step, i) => {
              const Icon = stepIcons[i] || step.icon
              const thumb = processImages[i]
              return (
                <div key={step.step} className="process-step relative flex gap-6 md:gap-10">
                  <div className="relative z-10 shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center shadow-lg shadow-gold/30">
                      <Icon size={22} className="text-charcoal" />
                    </div>
                  </div>
                  <div className="glass-dark rounded-2xl p-6 md:p-8 flex-1 pt-5 overflow-hidden">
                    <div className="flex flex-col sm:flex-row gap-5">
                      <div className="flex-1">
                        <span className="text-gold-light text-xs uppercase tracking-[0.2em]">Step {step.step}</span>
                        <h3 className="font-serif text-xl md:text-2xl text-ivory mt-1 mb-3">{step.title}</h3>
                        <p className="text-ivory/65 text-sm md:text-base leading-relaxed">{step.description}</p>
                      </div>
                      {thumb?.src && (
                        <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden shrink-0 border border-white/10">
                          <img src={resolveImageUrl(thumb.src)} alt={thumb.alt} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
