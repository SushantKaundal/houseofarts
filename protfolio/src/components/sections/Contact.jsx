import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import SectionHeading from "../ui/SectionHeading"
import Button from "../ui/Button"
import { useSite } from "../../context/SiteContext"
import { api } from "../../lib/api"
import { getIcon } from "../../lib/icons.jsx"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const { get, data } = useSite()
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const whatsapp = get("site.whatsapp", "919464888979")
  const socials = data.socials || []

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll(".contact-reveal"), {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.submitContact(formData)
    } catch {
      // still open WhatsApp as fallback
    }
    const text = `Hi Ruchi! I'd like to place a custom order.\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage: ${formData.message}`
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`, "_blank")
    setSubmitted(true)
    setSubmitting(false)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const inputClass =
    "w-full px-5 py-3.5 rounded-2xl glass border border-white/60 text-charcoal placeholder:text-charcoal-soft/50 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/20 transition-all text-sm"

  const getButtonVariant = (platform) => {
    if (platform === "whatsapp") return "whatsapp"
    if (platform === "instagram") return "instagram"
    return "secondary"
  }

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-lavender-light/40 via-ivory to-blush-light/30" />
      <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-ocean/10 blur-3xl" animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gold/10 blur-3xl" animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          label="Contact"
          title={get("contact.title", "Let's Create Something Beautiful")}
          subtitle={get("contact.subtitle")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          <div className="lg:col-span-2 space-y-6">
            <div className="contact-reveal space-y-4">
              {socials.map((social) => (
                <Button
                  key={social._id || social.platform}
                  href={social.url}
                  variant={getButtonVariant(social.platform)}
                  className="w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getIcon(social.icon, { size: 20 })}
                  {social.label}
                </Button>
              ))}
            </div>

            <div className="contact-reveal glass rounded-3xl p-6 space-y-5">
              <h3 className="font-serif text-xl text-charcoal">Contact Details</h3>
              <a href={`mailto:${get("site.email")}`} className="flex items-center gap-3 text-sm text-charcoal-soft hover:text-charcoal transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Mail size={18} className="text-gold" />
                </div>
                {get("site.email")}
              </a>
              <a href={`tel:+${whatsapp}`} className="flex items-center gap-3 text-sm text-charcoal-soft hover:text-charcoal transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Phone size={18} className="text-gold" />
                </div>
                {get("site.phoneFormatted")}
              </a>
              <div className="flex items-start gap-3 text-sm text-charcoal-soft">
                <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-gold" />
                </div>
                {get("site.location")}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-reveal lg:col-span-3 glass rounded-3xl p-7 md:p-10 space-y-5">
            <h3 className="font-serif text-2xl text-charcoal mb-2">Custom Order Form</h3>
            <p className="text-sm text-charcoal-soft mb-4">Share your idea and we&apos;ll get back to you on WhatsApp.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-xs uppercase tracking-wider text-charcoal-soft mb-2">Your Name</label>
                <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange} className={inputClass} placeholder="Enter your name" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-xs uppercase tracking-wider text-charcoal-soft mb-2">Phone Number</label>
                <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+91 XXXXX XXXXX" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-wider text-charcoal-soft mb-2">Email Address</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="your@email.com" />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-wider text-charcoal-soft mb-2">Your Idea / Requirements</label>
              <textarea id="message" name="message" required rows={4} value={formData.message} onChange={handleChange} className={`${inputClass} resize-none`} placeholder="Describe your custom resin art idea..." />
            </div>

            <Button type="submit" variant="primary" className="w-full sm:w-auto" disabled={submitting}>
              <Send size={18} />
              {submitted ? "Opening WhatsApp..." : submitting ? "Sending..." : "Send via WhatsApp"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
