import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import Hero from "../components/sections/Hero"
import HeroWorkStrip from "../components/sections/HeroWorkStrip"
import About from "../components/sections/About"
import Services from "../components/sections/Services"
import Workshop from "../components/sections/Workshop"
import ShowcaseMarquee from "../components/effects/ShowcaseMarquee"
import Gallery from "../components/sections/Gallery"
import Process from "../components/sections/Process"
import Testimonials from "../components/sections/Testimonials"
import Contact from "../components/sections/Contact"
import FloatingElements from "../components/effects/FloatingElements"
import { useLenis } from "../hooks/useLenis"

/** Shared blush/pink atmospheric background across hero + work strip */
function HeroZone() {
  return (
    <div className="relative theme-hero-zone min-h-0 md:min-h-[82vh] lg:min-h-[94vh] overflow-hidden">
      <div className="absolute inset-0 theme-hero-zone-bg pointer-events-none" aria-hidden="true" />
      <FloatingElements />
      <Hero />
      <HeroWorkStrip />
      <div className="relative z-10 mt-5 md:mt-8 pb-8 md:pb-12 px-5">
        <p className="hero-zone-quote max-w-3xl mx-auto text-center text-xl md:text-2xl lg:text-[1.65rem]">
          &ldquo;Where love becomes color, and creativity becomes memory, every artwork tells a story the heart never forgets.&rdquo;
        </p>
      </div>
    </div>
  )
}

export default function Home() {
  useLenis()
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace("#", "")
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 150)
    return () => window.clearTimeout(timer)
  }, [location.hash])

  return (
    <>
      <Navbar />
      <main>
        <HeroZone />
        <Gallery />
        <About />
        <Services />
        <Workshop />
        <ShowcaseMarquee />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
