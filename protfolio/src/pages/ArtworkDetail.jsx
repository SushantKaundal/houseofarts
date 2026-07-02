import { useMemo } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { ArrowLeft, MessageCircle } from "lucide-react"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import Button from "../components/ui/Button"
import { useSite } from "../context/SiteContext"
import { resolveImageUrl } from "../lib/api"
import { useLenis } from "../hooks/useLenis"

export default function ArtworkDetail() {
  useLenis()
  const { id } = useParams()
  const { data, get } = useSite()

  const item = useMemo(() => {
    return data.gallery?.find(
      (g) => String(g._id || g.id) === String(id)
    )
  }, [data.gallery, id])

  if (!item) return <Navigate to="/#gallery" replace />

  const whatsapp = get("site.whatsapp", "919464888979")
  const artworkDescription = item.description?.trim() || "Handcrafted resin artwork by House Of Arts."
  const orderText = `Hi Ruchi! I'd like to place an order for this artwork:\n\n*${item.title}*\nCategory: ${item.category}\nDescription: ${artworkDescription}\n\nPlease share pricing and customization options.`
  const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(orderText)}`

  return (
    <>
      <Navbar />
      <main className="min-h-screen theme-page-bg pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-5 md:px-8">
          <Link
            to="/#gallery"
            className="inline-flex items-center gap-2 text-sm theme-text-muted hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Gallery
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className="rounded-3xl overflow-hidden theme-hero-frame p-[3px] shadow-2xl">
              <div className="rounded-[1.4rem] overflow-hidden bg-ivory flex items-center justify-center min-h-[320px]">
                <img
                  src={resolveImageUrl(item.src)}
                  alt={item.alt || item.title}
                  className="w-full h-auto max-h-[68vh] object-contain"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-gold font-medium">
                  {item.category}
                </span>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold theme-text-primary mt-2 leading-tight">
                  {item.title}
                </h1>
              </div>

              <p className="theme-text-muted text-base leading-relaxed">{artworkDescription}</p>

              <div className="glass rounded-2xl p-6 space-y-3">
                <h3 className="font-medium theme-text-primary text-sm uppercase tracking-wider">
                  Piece Details
                </h3>
                <ul className="space-y-2 text-sm theme-text-muted">
                  <li><span className="text-gold">Category:</span> {item.category}</li>
                  <li><span className="text-gold">Title:</span> {item.title}</li>
                  <li><span className="text-gold">Alt Text:</span> {item.alt || item.title}</li>
                  <li><span className="text-gold">Studio:</span> House Of Arts, Jalandhar</li>
                  <li><span className="text-gold">Finishing:</span> 100% Handmade</li>
                </ul>
              </div>

              <Button
                href={waUrl}
                variant="whatsapp"
                className="w-full sm:w-auto text-base px-8 py-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={20} />
                Place Order on WhatsApp
              </Button>

              <p className="text-xs theme-text-muted opacity-70">
                You&apos;ll be redirected to WhatsApp with this artwork&apos;s details pre-filled.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
