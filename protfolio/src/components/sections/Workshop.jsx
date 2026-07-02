import { motion } from "framer-motion"
import SectionHeading from "../ui/SectionHeading"
import { useSite } from "../../context/SiteContext"
import { resolveImageUrl } from "../../lib/api"
import Button from "../ui/Button"

export default function Workshop() {
  const { data, get } = useSite()
  const workshopImg = data.images?.workshopMain

  return (
    <section id="workshop" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pearl via-ivory to-ivory-dark/40" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeading
          label={get("workshop.badge", "Workshop")}
          title={get("workshop.title", "Learn Resin Art with Ruchi")}
          subtitle={get("workshop.subtitle", "Join hands-on creative workshops and make your own resin pieces.")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-6 md:p-8"
          >
            <p className="theme-text-muted leading-relaxed text-sm md:text-base">
              {get("workshop.description", "Beginner-friendly resin workshops covering materials, safety, pouring techniques, finishing, and design basics. Perfect for hobby learners and gift creators.")}
            </p>

            <div className="mt-5 space-y-2 text-sm theme-text-muted">
              <p><span className="text-gold font-medium">Schedule:</span> {get("workshop.schedule", "Weekend batches available")}</p>
              <p><span className="text-gold font-medium">Location:</span> {get("workshop.location", "Jalandhar Studio")}</p>
              <p><span className="text-gold font-medium">Seats:</span> {get("workshop.seats", "Limited seats per batch")}</p>
            </div>

            <div className="mt-6">
              <Button href="#contact" variant="primary">
                {get("workshop.cta", "Book Workshop Seat")}
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl theme-hero-frame p-[3px] shadow-xl"
          >
            <div className="rounded-[1.4rem] overflow-hidden bg-ivory flex items-center justify-center min-h-[280px]">
              {workshopImg?.src ? (
                <img
                  src={resolveImageUrl(workshopImg.src)}
                  alt={workshopImg.alt || "Workshop"}
                  className="w-full h-[280px] md:h-[360px] object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="theme-text-muted text-sm">Upload a workshop image from Admin → Site Images</div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
