import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useSite } from "../../context/SiteContext"
import { handleSectionClick } from "../../lib/sectionNav"

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Workshop", href: "#workshop", badgeKey: "menu.workshop.badge" },
  { label: "Gallery", href: "#gallery" },
  { label: "Process", href: "#process" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const { get } = useSite()
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  const onNavClick = (event, href) => {
    handleSectionClick(event, href, navigate, location.pathname, () => setMobileOpen(false))
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? "glass shadow-lg shadow-charcoal/5 py-3"
          : "bg-transparent py-5 md:py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        <Link to="/" className="group flex flex-col" onClick={() => setMobileOpen(false)}>
          <span className="font-serif text-xl md:text-2xl font-semibold text-charcoal tracking-wide">
            Ruchi
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold group-hover:text-gold-light transition-colors">
            House Of Arts
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => onNavClick(e, link.href)}
                className="inline-flex items-center gap-1.5 text-sm text-charcoal-soft hover:text-charcoal relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gold after:transition-all hover:after:w-full transition-colors"
              >
                {link.label}
                {Boolean(get(link.badgeKey, "").trim()) && (
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.15em] bg-gold/20 text-gold border border-gold/40 leading-none">
                    {get(link.badgeKey, "")}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={(e) => onNavClick(e, "#contact")}
          className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-gold to-gold-light text-charcoal shadow-md shadow-gold/20 hover:shadow-gold/35 transition-shadow"
        >
          Book Order
        </a>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-full glass"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/40 mt-3"
          >
            <ul className="flex flex-col px-5 py-6 gap-4">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => onNavClick(e, link.href)}
                    className="block text-lg font-medium text-charcoal py-1"
                  >
                    {link.label}
                    {Boolean(get(link.badgeKey, "").trim()) && (
                      <span className="ml-2 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-[0.15em] bg-gold/20 text-gold border border-gold/40 leading-none">
                        {get(link.badgeKey, "")}
                      </span>
                    )}
                  </a>
                </motion.li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={(e) => onNavClick(e, "#contact")}
                  className="inline-flex mt-2 px-6 py-3 rounded-full text-sm font-medium bg-gradient-to-r from-gold to-gold-light text-charcoal"
                >
                  Book Custom Order
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
