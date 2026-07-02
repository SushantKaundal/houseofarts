import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Sparkles, Heart, Palette, Award } from "lucide-react"
import SectionHeading from "../ui/SectionHeading"
import ImageCarousel from "../ui/ImageCarousel"
import { useSite } from "../../context/SiteContext"
import { resolveImageUrl } from "../../lib/api"

gsap.registerPlugin(ScrollTrigger)

const highlights = [
  { icon: Palette, label: "Custom Designs" },
  { icon: Sparkles, label: "Premium Finishing" },
  { icon: Heart, label: "Made with Love" },
  { icon: Award, label: "Happy Customers" },
]

export default function About() {
  const { data, get } = useSite()
  const sectionRef = useRef(null)
  const imageWrapRef = useRef(null)
  const textRef = useRef(null)

  const aboutMain = data.images?.aboutMain || { src: "", alt: "" }
  const aboutAccents = [
    data.images?.aboutAccent1,
    data.images?.aboutAccent2,
    data.images?.aboutAccent3,
    data.images?.aboutAccent4,
  ].filter(Boolean)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (imageWrapRef.current) {
        gsap.from(imageWrapRef.current, {
          clipPath: "inset(100% 0 0 0)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: imageWrapRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        })
      }
      if (textRef.current) {
        gsap.from(textRef.current.querySelectorAll(".about-line"), {
          y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: textRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ivory via-pearl to-ivory-dark/50" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          label="About"
          title={get("about.title", "The Artist Behind the Art")}
          subtitle={get("about.subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={imageWrapRef} className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-charcoal/10 resin-shine">
              <img src={resolveImageUrl(aboutMain.src)} alt={aboutMain.alt} className="w-full aspect-[4/3] object-cover object-top" loading="lazy" />
            </div>
            {aboutAccents.length > 0 && (
              <div className="absolute -bottom-6 -right-4 md:-right-8 w-40 h-40 rounded-2xl overflow-hidden shadow-xl border-4 border-ivory hidden sm:block">
                <ImageCarousel
                  images={aboutAccents.map((a) => ({ ...a, src: resolveImageUrl(a.src) }))}
                  interval={3500}
                  className="w-full h-full"
                  imageClassName="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <div ref={textRef}>
            <p className="about-line text-lg md:text-xl font-serif text-charcoal leading-relaxed mb-6">{get("about.paragraph1")}</p>
            <p className="about-line text-base text-charcoal-soft leading-relaxed mb-6">{get("about.paragraph2")}</p>
            <p className="about-line text-base text-charcoal-soft leading-relaxed mb-10">{get("about.paragraph3")}</p>

            <div className="about-line grid grid-cols-2 gap-4">
              {highlights.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 glass rounded-2xl px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-blush/20 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <span className="text-sm font-medium text-charcoal">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
