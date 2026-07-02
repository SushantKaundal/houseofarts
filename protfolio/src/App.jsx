import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Hero from "./components/sections/Hero"
import HeroWorkStrip from "./components/sections/HeroWorkStrip"
import About from "./components/sections/About"
import Services from "./components/sections/Services"
import ShowcaseMarquee from "./components/effects/ShowcaseMarquee"
import Gallery from "./components/sections/Gallery"
import Process from "./components/sections/Process"
import Testimonials from "./components/sections/Testimonials"
import Contact from "./components/sections/Contact"
import { useLenis } from "./hooks/useLenis"

export default function App() {
  useLenis()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HeroWorkStrip />
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
