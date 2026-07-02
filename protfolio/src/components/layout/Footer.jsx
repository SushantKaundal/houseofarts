import { useLocation, useNavigate } from "react-router-dom"
import { useSite } from "../../context/SiteContext"
import { Mail, MapPin, Phone } from "lucide-react"
import { getIcon } from "../../lib/icons.jsx"
import { handleSectionClick } from "../../lib/sectionNav"

export default function Footer() {
  const { get, data } = useSite()
  const navigate = useNavigate()
  const location = useLocation()
  const year = new Date().getFullYear()
  const instagram = data.socials?.find((s) => s.platform === "instagram")

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Process", href: "#process" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <footer className="relative bg-charcoal text-ivory/80 py-12 md:py-16">
      <div className="gold-line mb-12 opacity-50" />
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div>
            <h3 className="font-serif text-2xl text-ivory mb-3">House Of Arts</h3>
            <p className="text-sm leading-relaxed text-ivory/60">{get("footer.description")}</p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSectionClick(e, link.href, navigate, location.pathname)}
                    className="text-sm hover:text-gold-light transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-gold mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={15} className="text-gold shrink-0" />
                <a href={`mailto:${get("site.email")}`} className="hover:text-gold-light transition-colors">{get("site.email")}</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={15} className="text-gold shrink-0" />
                <a href={`tel:+${get("site.whatsapp")}`} className="hover:text-gold-light transition-colors">{get("site.phoneFormatted")}</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="text-gold shrink-0 mt-0.5" />
                <span>{get("site.location")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-line my-10 opacity-30" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/40">
          <p>&copy; {year} {get("site.name")}. All rights reserved.</p>
          {instagram && (
            <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold-light transition-colors">
              {getIcon(instagram.icon, { size: 16 })}
              @handsel.by.ruchi
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
