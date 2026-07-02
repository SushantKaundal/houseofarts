import "dotenv/config"
import { connectDB } from "../config/db.js"
import Admin from "../models/Admin.js"
import SiteContent from "../models/SiteContent.js"
import SiteImage from "../models/SiteImage.js"
import GalleryCategory from "../models/GalleryCategory.js"
import GalleryItem from "../models/GalleryItem.js"
import Service from "../models/Service.js"
import Testimonial from "../models/Testimonial.js"
import SliderImage from "../models/SliderImage.js"
import SocialLink from "../models/SocialLink.js"

const img = (n) => `/images/ruchinew/image${String(n).padStart(5, "0")}.jpg`

const categories = [
  "Home Decor",
  "Custom Gifts",
  "Keepsakes",
  "Wedding",
  "Trays & Coasters",
  "Photo Frames",
]

const titles = [
  "Pearl Resin Coaster",
  "Floral Resin Tray",
  "Ocean Wave Piece",
  "Gold Leaf Keepsake",
  "Custom Name Plate",
  "Resin Clock Design",
  "Memory Frame Set",
  "Bridal Kaleera Frame",
  "Mini Gallery Box",
  "Shell & Sand Art",
  "Blush Floral Tray",
  "Geode Coaster Set",
  "Wedding Shadow Box",
  "Anniversary Gift",
  "Resin Photo Collage",
  "Ocean Mirror Art",
  "Pearl Embellished Frame",
  "Birthday Keepsake",
  "Resin Serving Tray",
  "Studio Pour Detail",
  "Handcrafted Creation",
  "Custom Gift Box",
  "Resin Wall Art",
  "Floral Preservation",
  "Gold Accent Tray",
  "Beach Theme Mirror",
  "Lace & Pearl Frame",
  "Resin Name Sign",
  "Ocean Blue Tray",
]

const galleryIds = [
  1, 3, 4, 5, 6, 7, 9, 10, 11, 24, 25, 27, 28, 30, 31, 32, 33, 34, 35, 36,
  37, 38, 39, 40, 41, 42, 43, 44, 45,
]

async function seed() {
  await connectDB()
  console.log("Seeding database...")

  // Admin user
  const existingAdmin = await Admin.findOne({ username: process.env.ADMIN_USERNAME })
  if (!existingAdmin) {
    await Admin.create({
      username: process.env.ADMIN_USERNAME || "ruchi",
      email: process.env.ADMIN_EMAIL || "ruchi@handsel.studio",
      password: process.env.ADMIN_PASSWORD || "Ruchi@Admin2026",
      theme: "gold-pearl",
    })
    console.log("Admin user created")
  } else {
    console.log("Admin user already exists")
  }

  // Site content
  const contentItems = [
    { key: "site.name", value: "House Of Arts", group: "site" },
    { key: "site.theme", value: "pearl-gold", group: "site" },
    {
      key: "site.tagline",
      value: "Handcrafted resin art, customized gifts, home decor & timeless memories.",
      group: "site",
    },
    { key: "site.email", value: "Vermaruchi1601@gmail.com", group: "site" },
    { key: "site.phone", value: "9464888979", group: "site" },
    { key: "site.phoneFormatted", value: "+91 94648 88979", group: "site" },
    { key: "site.whatsapp", value: "919464888979", group: "site" },
    { key: "site.location", value: "Jalandhar, Punjab, India", group: "site" },
    {
      key: "site.instagram",
      value: "https://www.instagram.com/handsel.by.ruchi",
      group: "site",
    },
    { key: "hero.badge", value: "Handcrafted with Love", group: "hero" },
    { key: "hero.accentTitle", value: "Premium Finishing", group: "hero" },
    { key: "hero.accentSubtitle", value: "100% Handmade", group: "hero" },
    { key: "about.title", value: "The Artist Behind the Art", group: "about" },
    {
      key: "about.subtitle",
      value: "Where creativity meets craftsmanship in every pour.",
      group: "about",
    },
    {
      key: "about.paragraph1",
      value:
        "Hi, I'm Ruchi — a passionate resin art specialist based in Jalandhar, Punjab. What began as a creative hobby has blossomed into a studio dedicated to crafting beautiful, one-of-a-kind resin pieces.",
      group: "about",
    },
    {
      key: "about.paragraph2",
      value:
        "Every piece I create is entirely handcrafted — from the initial design conversation to the final glossy polish. I specialize in customized gifts, wedding and anniversary keepsakes, resin photo frames, trays, clocks, and name plates that tell your unique story.",
      group: "about",
    },
    {
      key: "about.paragraph3",
      value:
        "With premium materials, meticulous attention to detail, and a deep love for creativity, I pour my heart into every creation. My happiest moments are seeing the joy on my customers' faces when they receive their personalized artwork.",
      group: "about",
    },
    { key: "services.title", value: "What I Create", group: "services" },
    {
      key: "services.subtitle",
      value: "From elegant home decor to heartfelt keepsakes — each piece is crafted to perfection.",
      group: "services",
    },
    { key: "gallery.title", value: "Artwork Showcase", group: "gallery" },
    {
      key: "gallery.subtitle",
      value: "Browse handcrafted resin creations — tap any piece to view full size.",
      group: "gallery",
    },
    { key: "process.title", value: "How It Works", group: "process" },
    {
      key: "process.subtitle",
      value: "From your imagination to a finished masterpiece — a seamless creative journey.",
      group: "process",
    },
    { key: "testimonials.title", value: "Happy Customers", group: "testimonials" },
    {
      key: "testimonials.subtitle",
      value: "Trusted by families across Punjab for custom resin art and unforgettable gifts.",
      group: "testimonials",
    },
    { key: "contact.title", value: "Let's Create Something Beautiful", group: "contact" },
    {
      key: "contact.subtitle",
      value: "Ready for a custom resin piece? Reach out via WhatsApp, Instagram, or fill out the form below.",
      group: "contact",
    },
    {
      key: "footer.description",
      value:
        "House Of Arts — handcrafted resin art studio creating premium customized gifts, home decor, and timeless keepsakes from Jalandhar, Punjab.",
      group: "footer",
    },
    { key: "stats.pieces", value: "500+", group: "stats" },
    { key: "stats.handmade", value: "100%", group: "stats" },
    { key: "stats.rating", value: "5★", group: "stats" },
    { key: "stats.region", value: "Punjab", group: "stats" },
    { key: "stats.piecesLabel", value: "Pieces Crafted", group: "stats" },
    { key: "stats.handmadeLabel", value: "Handmade", group: "stats" },
    { key: "stats.ratingLabel", value: "Customer Rating", group: "stats" },
    { key: "stats.regionLabel", value: "& Beyond", group: "stats" },
  ]

  for (const item of contentItems) {
    await SiteContent.findOneAndUpdate({ key: item.key }, item, { upsert: true })
  }

  // Site images
  const siteImages = [
    { key: "hero", src: img(13), alt: "Ruchi — Resin Art Specialist", section: "hero" },
    {
      key: "aboutMain",
      src: img(8),
      alt: "Ruchi holding a handcrafted wedding resin keepsake frame",
      section: "about",
    },
    { key: "aboutAccent1", src: img(29), alt: "Featured resin artwork 1", section: "about" },
    { key: "aboutAccent2", src: img(2), alt: "Featured resin artwork 2", section: "about" },
    { key: "aboutAccent3", src: img(18), alt: "Featured resin artwork 3", section: "about" },
    { key: "aboutAccent4", src: img(26), alt: "Featured resin artwork 4", section: "about" },
    { key: "process1", src: img(20), alt: "Process step 1", section: "process" },
    { key: "process2", src: img(21), alt: "Process step 2", section: "process" },
    { key: "process3", src: img(22), alt: "Process step 3", section: "process" },
    { key: "process4", src: img(23), alt: "Process step 4", section: "process" },
  ]
  for (const imgItem of siteImages) {
    await SiteImage.findOneAndUpdate({ key: imgItem.key }, imgItem, { upsert: true })
  }

  // Gallery categories
  await GalleryCategory.deleteMany({})
  const catDocs = await GalleryCategory.insertMany(
    categories.map((name, i) => ({ name, order: i }))
  )

  // Gallery items
  await GalleryItem.deleteMany({})
  await GalleryItem.insertMany(
    galleryIds.map((n, i) => ({
      title: titles[i % titles.length],
      src: img(n),
      alt: titles[i % titles.length],
      category: categories[i % categories.length],
      order: i,
    }))
  )

  // Services
  await Service.deleteMany({})
  await Service.insertMany([
    {
      title: "Resin Name Plates",
      description:
        "Elegant personalized name plates with glossy resin finish, perfect for homes and offices.",
      icon: "Tag",
      color: "from-blush-light to-blush",
      order: 0,
    },
    {
      title: "Resin Clocks",
      description:
        "Functional art pieces — handcrafted clocks with ocean waves, florals, or custom themes.",
      icon: "Clock",
      color: "from-lavender-light to-lavender",
      order: 1,
    },
    {
      title: "Resin Trays",
      description:
        "Stunning serving and decorative trays with embedded flowers, shells, and gold flakes.",
      icon: "LayoutGrid",
      color: "from-ocean/30 to-ocean",
      order: 2,
    },
    {
      title: "Resin Photo Frames",
      description:
        "Preserve cherished memories in beautifully layered resin frames with lace and florals.",
      icon: "Frame",
      color: "from-gold-light/40 to-gold",
      order: 3,
    },
    {
      title: "Customized Gifts",
      description:
        "One-of-a-kind resin gifts tailored to your vision — thoughtful, unique, and unforgettable.",
      icon: "Gift",
      color: "from-blush-light to-lavender-light",
      order: 4,
    },
    {
      title: "Wedding & Keepsakes",
      description:
        "Anniversary, birthday, and wedding resin keepsakes that capture life's precious moments.",
      icon: "Heart",
      color: "from-lavender-light to-blush",
      order: 5,
    },
  ])

  // Testimonials
  await Testimonial.deleteMany({})
  await Testimonial.insertMany([
    {
      name: "Priya S.",
      location: "Jalandhar",
      text: "The wedding keepsake frame Ruchi made for us is absolutely stunning. Every detail — the pearls, the kaleeras — was perfect. We treasure it every day.",
      rating: 5,
      highlight: "Wedding Keepsake",
      order: 0,
    },
    {
      name: "Ananya M.",
      location: "Chandigarh",
      text: "I ordered custom photo frames as anniversary gifts. The quality and finishing are premium. My family was so touched — truly one-of-a-kind art.",
      rating: 5,
      highlight: "Custom Order",
      order: 1,
    },
    {
      name: "Rohit & Meera K.",
      location: "Ludhiana",
      text: "From design to delivery, the experience was seamless. Ruchi understood exactly what we wanted. The ocean mirror is the centerpiece of our home.",
      rating: 5,
      highlight: "Home Decor",
      order: 2,
    },
    {
      name: "Simran G.",
      location: "Amritsar",
      text: "I've ordered multiple resin trays and name plates. Each piece feels handcrafted with love. Highly recommend for anyone looking for unique gifts.",
      rating: 5,
      highlight: "Repeat Customer",
      order: 3,
    },
  ])

  // Slider / marquee images
  await SliderImage.deleteMany({})
  await SliderImage.insertMany(
    [12, 14, 15, 16, 17, 19, 1, 3, 4, 5].map((n, i) => ({
      src: img(n),
      alt: `Resin creation ${i + 1}`,
      section: i < 6 ? "marquee" : "hero",
      order: i,
    }))
  )

  // Social links
  await SocialLink.deleteMany({})
  await SocialLink.insertMany([
    {
      platform: "whatsapp",
      label: "Chat on WhatsApp",
      url: "https://wa.me/919464888979",
      icon: "MessageCircle",
      order: 0,
    },
    {
      platform: "instagram",
      label: "Follow on Instagram",
      url: "https://www.instagram.com/handsel.by.ruchi",
      icon: "Instagram",
      order: 1,
    },
  ])

  console.log("Seed completed successfully!")
  console.log("\n--- Admin Login Credentials ---")
  console.log(`Username: ${process.env.ADMIN_USERNAME || "ruchi"}`)
  console.log(`Password: ${process.env.ADMIN_PASSWORD || "Ruchi@Admin2026"}`)
  console.log(`Admin Panel: http://localhost:5174/admin`)
  console.log("-------------------------------\n")

  process.exit(0)
}

seed().catch((err) => {
  console.error("Seed failed:", err)
  process.exit(1)
})
