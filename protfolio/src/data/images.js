const base = "/images/ruchinew"

/** Build a public URL for a ruchinew asset */
export const img = (n) =>
  `${base}/image${String(n).padStart(5, "0")}.jpg`

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

// Section-specific placements (each image used once)
export const aboutMain = {
  src: img(8),
  alt: "Ruchi holding a handcrafted wedding resin keepsake frame",
}

export const aboutAccents = [29, 2, 18, 26].map((n, i) => ({
  src: img(n),
  alt: `Featured resin artwork ${i + 1}`,
}))

export const heroImage = {
  src: img(13),
  alt: "Ruchi — Resin Art Specialist with a wedding keepsake",
}

export const processImages = [20, 21, 22, 23].map((n, i) => ({
  src: img(n),
  alt: `Process step ${i + 1} showcase`,
}))

export const marqueeImages = [12, 14, 15, 16, 17, 19].map((n, i) => ({
  src: img(n),
  alt: `Resin creation ${i + 1}`,
}))

// All remaining images go to the gallery
const galleryIds = [
  1, 3, 4, 5, 6, 7, 9, 10, 11, 24, 25, 27, 28, 30, 31, 32, 33, 34, 35, 36,
  37, 38, 39, 40, 41, 42, 43, 44, 45,
]

export const galleryItems = galleryIds.map((n, i) => ({
  id: n,
  src: img(n),
  title: titles[i % titles.length],
  category: categories[i % categories.length],
}))

export const galleryCategories = [
  "All",
  ...new Set(galleryItems.map((g) => g.category)),
]
