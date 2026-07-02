import { Router } from "express"
import SiteContent from "../models/SiteContent.js"
import SiteImage from "../models/SiteImage.js"
import GalleryCategory from "../models/GalleryCategory.js"
import GalleryItem from "../models/GalleryItem.js"
import Service from "../models/Service.js"
import Testimonial from "../models/Testimonial.js"
import SliderImage from "../models/SliderImage.js"
import SocialLink from "../models/SocialLink.js"
import FormSubmission from "../models/FormSubmission.js"
import { authMiddleware } from "../middleware/auth.js"
import { upload } from "../middleware/upload.js"

const router = Router()

// ——— Public: full site payload ———
router.get("/site", async (_req, res) => {
  try {
    const [
      content,
      images,
      categories,
      gallery,
      services,
      testimonials,
      sliders,
      socials,
    ] = await Promise.all([
      SiteContent.find().lean(),
      SiteImage.find().lean(),
      GalleryCategory.find({ active: true }).sort("order").lean(),
      GalleryItem.find({ active: true }).sort("order").lean(),
      Service.find({ active: true }).sort("order").lean(),
      Testimonial.find({ active: true }).sort("order").lean(),
      SliderImage.find({ active: true }).sort("order").lean(),
      SocialLink.find({ active: true }).sort("order").lean(),
    ])

    const contentMap = {}
    content.forEach((c) => {
      contentMap[c.key] = c.value
    })

    const imageMap = {}
    images.forEach((img) => {
      imageMap[img.key] = { src: img.src, alt: img.alt }
    })

    res.json({
      content: contentMap,
      images: imageMap,
      categories: categories.map((c) => c.name),
      gallery,
      services,
      testimonials,
      sliders,
      socials,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ——— Public: contact form ———
router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body
    if (!name || !phone || !message) {
      return res.status(400).json({ message: "Name, phone and message are required" })
    }
    const submission = await FormSubmission.create({ name, email, phone, message })
    res.status(201).json({ message: "Submitted successfully", id: submission._id })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// ——— Admin: site content ———
router.get("/admin/content", authMiddleware, async (_req, res) => {
  const items = await SiteContent.find().sort("group key")
  res.json(items)
})

router.put("/admin/content/:key", authMiddleware, async (req, res) => {
  const { value, group } = req.body
  const item = await SiteContent.findOneAndUpdate(
    { key: req.params.key },
    { value, ...(group && { group }) },
    { new: true, upsert: true }
  )
  res.json(item)
})

router.put("/admin/content", authMiddleware, async (req, res) => {
  const { items } = req.body
  if (!Array.isArray(items)) {
    return res.status(400).json({ message: "items array required" })
  }
  const ops = items.map(({ key, value, group }) =>
    SiteContent.findOneAndUpdate(
      { key },
      { value, group: group || "general" },
      { upsert: true, new: true }
    )
  )
  const results = await Promise.all(ops)
  res.json(results)
})

// ——— Admin: site images ———
router.get("/admin/images", authMiddleware, async (_req, res) => {
  res.json(await SiteImage.find().sort("section key"))
})

router.put("/admin/images/:key", authMiddleware, async (req, res) => {
  const { src, alt, section } = req.body
  const item = await SiteImage.findOneAndUpdate(
    { key: req.params.key },
    { src, alt, section: section || "general" },
    { new: true, upsert: true }
  )
  res.json(item)
})

router.post("/admin/upload", authMiddleware, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" })
  const url = `/uploads/${req.file.filename}`
  res.json({ url, filename: req.file.filename })
})

// ——— Admin: gallery categories ———
router.get("/admin/categories", authMiddleware, async (_req, res) => {
  res.json(await GalleryCategory.find().sort("order"))
})

router.post("/admin/categories", authMiddleware, async (req, res) => {
  const cat = await GalleryCategory.create(req.body)
  res.status(201).json(cat)
})

router.put("/admin/categories/:id", authMiddleware, async (req, res) => {
  const cat = await GalleryCategory.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.json(cat)
})

router.delete("/admin/categories/:id", authMiddleware, async (req, res) => {
  await GalleryCategory.findByIdAndDelete(req.params.id)
  res.json({ message: "Deleted" })
})

// ——— Admin: gallery items ———
router.get("/admin/gallery", authMiddleware, async (_req, res) => {
  res.json(await GalleryItem.find().sort("order"))
})

router.post("/admin/gallery", authMiddleware, async (req, res) => {
  const item = await GalleryItem.create(req.body)
  res.status(201).json(item)
})

router.put("/admin/gallery/:id", authMiddleware, async (req, res) => {
  const item = await GalleryItem.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  res.json(item)
})

router.delete("/admin/gallery/:id", authMiddleware, async (req, res) => {
  await GalleryItem.findByIdAndDelete(req.params.id)
  res.json({ message: "Deleted" })
})

// ——— Admin: services ———
router.get("/admin/services", authMiddleware, async (_req, res) => {
  res.json(await Service.find().sort("order"))
})

router.post("/admin/services", authMiddleware, async (req, res) => {
  res.status(201).json(await Service.create(req.body))
})

router.put("/admin/services/:id", authMiddleware, async (req, res) => {
  res.json(await Service.findByIdAndUpdate(req.params.id, req.body, { new: true }))
})

router.delete("/admin/services/:id", authMiddleware, async (req, res) => {
  await Service.findByIdAndDelete(req.params.id)
  res.json({ message: "Deleted" })
})

// ——— Admin: testimonials ———
router.get("/admin/testimonials", authMiddleware, async (_req, res) => {
  res.json(await Testimonial.find().sort("order"))
})

router.post("/admin/testimonials", authMiddleware, async (req, res) => {
  res.status(201).json(await Testimonial.create(req.body))
})

router.put("/admin/testimonials/:id", authMiddleware, async (req, res) => {
  res.json(await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true }))
})

router.delete("/admin/testimonials/:id", authMiddleware, async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id)
  res.json({ message: "Deleted" })
})

// ——— Admin: slider images ———
router.get("/admin/sliders", authMiddleware, async (_req, res) => {
  res.json(await SliderImage.find().sort("order section"))
})

router.post("/admin/sliders", authMiddleware, async (req, res) => {
  res.status(201).json(await SliderImage.create(req.body))
})

router.put("/admin/sliders/:id", authMiddleware, async (req, res) => {
  res.json(await SliderImage.findByIdAndUpdate(req.params.id, req.body, { new: true }))
})

router.delete("/admin/sliders/:id", authMiddleware, async (req, res) => {
  await SliderImage.findByIdAndDelete(req.params.id)
  res.json({ message: "Deleted" })
})

// ——— Admin: social links ———
router.get("/admin/socials", authMiddleware, async (_req, res) => {
  res.json(await SocialLink.find().sort("order"))
})

router.post("/admin/socials", authMiddleware, async (req, res) => {
  res.status(201).json(await SocialLink.create(req.body))
})

router.put("/admin/socials/:id", authMiddleware, async (req, res) => {
  res.json(await SocialLink.findByIdAndUpdate(req.params.id, req.body, { new: true }))
})

router.delete("/admin/socials/:id", authMiddleware, async (req, res) => {
  await SocialLink.findByIdAndDelete(req.params.id)
  res.json({ message: "Deleted" })
})

// ——— Admin: form submissions ———
router.get("/admin/submissions", authMiddleware, async (_req, res) => {
  res.json(await FormSubmission.find().sort("-createdAt"))
})

router.put("/admin/submissions/:id/read", authMiddleware, async (req, res) => {
  res.json(
    await FormSubmission.findByIdAndUpdate(
      req.params.id,
      { read: req.body.read ?? true },
      { new: true }
    )
  )
})

router.delete("/admin/submissions/:id", authMiddleware, async (req, res) => {
  await FormSubmission.findByIdAndDelete(req.params.id)
  res.json({ message: "Deleted" })
})

export default router
