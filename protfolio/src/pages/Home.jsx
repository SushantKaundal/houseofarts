import Navbar from "../components/layout/Navbar"
import Footer from "../components/layout/Footer"
import Hero from "../components/sections/Hero"
import HeroWorkStrip from "../components/sections/HeroWorkStrip"
import About from "../components/sections/About"
import Services from "../components/sections/Services"
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
    <div className="relative theme-hero-zone overflow-hidden">
      <div className="absolute inset-0 theme-hero-zone-bg pointer-events-none" aria-hidden="true" />
      <FloatingElements />
      <Hero />
      <HeroWorkStrip />
    </div>
  )
}

export default function Home() {
  useLenis()

  return (
    <>
      <Navbar />
      <main>
        <HeroZone />
        <About />
        <Services />
        <ShowcaseMarquee />
        <Gallery />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
