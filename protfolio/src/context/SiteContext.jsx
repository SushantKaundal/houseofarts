import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { api } from "../lib/api"
import { siteConfig as staticSite } from "../data/site"
import { galleryItems, galleryCategories, heroImage, aboutMain, aboutAccents, marqueeImages, processImages } from "../data/images"
import { services as staticServices } from "../data/services"
import { testimonials as staticTestimonials } from "../data/testimonials"

const SiteContext = createContext(null)

function buildFallback() {
  return {
    content: {
      "site.name": staticSite.name,
      "site.tagline": staticSite.tagline,
      "site.email": staticSite.email,
      "site.phone": staticSite.phone,
      "site.phoneFormatted": staticSite.phoneFormatted,
      "site.whatsapp": staticSite.whatsapp,
      "site.location": staticSite.location,
      "site.instagram": staticSite.instagram,
      "hero.badge": "Handcrafted with Love",
      "hero.accentTitle": "Premium Finishing",
      "hero.accentSubtitle": "100% Handmade",
      "about.title": "The Artist Behind the Art",
      "about.subtitle": "Where creativity meets craftsmanship in every pour.",
      "about.paragraph1": "Hi, I'm Ruchi — a passionate resin art specialist based in Jalandhar, Punjab.",
      "about.paragraph2": "Every piece I create is entirely handcrafted.",
      "about.paragraph3": "With premium materials, meticulous attention to detail, and a deep love for creativity.",
      "services.title": "What I Create",
      "services.subtitle": "From elegant home decor to heartfelt keepsakes.",
      "gallery.title": "Artwork Showcase",
      "gallery.subtitle": "Browse handcrafted resin creations.",
      "process.title": "How It Works",
      "process.subtitle": "From your imagination to a finished masterpiece.",
      "testimonials.title": "Happy Customers",
      "testimonials.subtitle": "Trusted by families across Punjab.",
      "contact.title": "Let's Create Something Beautiful",
      "contact.subtitle": "Ready for a custom resin piece?",
      "footer.description": "House Of Arts — handcrafted resin art, customized gifts, home decor, and timeless keepsakes from Jalandhar, Punjab.",
      "stats.pieces": "500+",
      "stats.handmade": "100%",
      "stats.rating": "5★",
      "stats.region": "Punjab",
      "stats.piecesLabel": "Pieces Crafted",
      "stats.handmadeLabel": "Handmade",
      "stats.ratingLabel": "Customer Rating",
      "stats.regionLabel": "& Beyond",
    },
    images: {
      hero: heroImage,
      aboutMain,
      aboutAccent1: aboutAccents[0],
      aboutAccent2: aboutAccents[1],
      aboutAccent3: aboutAccents[2],
      aboutAccent4: aboutAccents[3],
      process1: processImages[0],
      process2: processImages[1],
      process3: processImages[2],
      process4: processImages[3],
    },
    categories: galleryCategories,
    gallery: galleryItems,
    services: staticServices,
    testimonials: staticTestimonials,
    sliders: marqueeImages.map((m, i) => ({ ...m, section: "marquee", _id: i })),
    socials: [
      { platform: "whatsapp", label: "Chat on WhatsApp", url: `https://wa.me/${staticSite.whatsapp}`, icon: "MessageCircle" },
      { platform: "instagram", label: "Follow on Instagram", url: staticSite.instagram, icon: "Instagram" },
    ],
  }
}

export function SiteProvider({ children }) {
  const [data, setData] = useState(buildFallback())
  const [loading, setLoading] = useState(true)
  const [fromApi, setFromApi] = useState(false)

  const refresh = useCallback(async () => {
    try {
      const site = await api.getSite()
      setData(site)
      setFromApi(true)
    } catch {
      setData(buildFallback())
      setFromApi(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const get = (key, fallback = "") => data.content?.[key] ?? fallback

  return (
    <SiteContext.Provider value={{ data, loading, fromApi, refresh, get }}>
      {children}
    </SiteContext.Provider>
  )
}

export function useSite() {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error("useSite must be used within SiteProvider")
  return ctx
}
