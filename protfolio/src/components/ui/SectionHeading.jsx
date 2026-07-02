import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  dark = false,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll(".reveal-item"), {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  const alignClass =
    align === "left" ? "text-left items-start" : "text-center items-center"

  return (
    <div ref={ref} className={`flex flex-col gap-3 mb-14 md:mb-16 ${alignClass}`}>
      {label && (
        <span
          className={`reveal-item text-xs uppercase tracking-[0.25em] font-medium ${
            dark ? "text-gold-light" : "text-gold"
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`reveal-item font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight ${
          dark ? "text-ivory" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      <div className="reveal-item gold-line w-24" />
      {subtitle && (
        <p
          className={`reveal-item max-w-2xl text-base md:text-lg leading-relaxed mt-2 ${
            dark ? "text-ivory/75" : "text-charcoal-soft"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
