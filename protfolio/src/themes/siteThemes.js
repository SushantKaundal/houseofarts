/** Website theme definitions — used by admin panel and SiteContext */
export const SITE_THEMES = [
  {
    id: "pearl-gold",
    name: "Pearl & Gold",
    description: "Elegant ivory, champagne gold & soft blush — classic resin luxury.",
    preview: ["#faf7f4", "#c9a962", "#e8b4c8", "#2d2a32"],
    dark: false,
  },
  {
    id: "rose-garden",
    name: "Rose Garden",
    description: "Romantic florals, deep rose gradients & golden petals.",
    preview: ["#fff0f3", "#d4567a", "#f9c5d5", "#4a2030"],
    dark: false,
  },
  {
    id: "ocean-dream",
    name: "Ocean Dream",
    description: "Flowing teal waves, sea-glass blues & sandy pearl tones.",
    preview: ["#eef6fb", "#2a8fc2", "#7eb8da", "#1a3a4a"],
    dark: false,
  },
  {
    id: "sunset-resin",
    name: "Sunset Resin",
    description: "Warm amber, coral glow & honey-gold resin pours.",
    preview: ["#fff8f0", "#e07a3a", "#f4c28a", "#3d2817"],
    dark: false,
  },
  {
    id: "midnight-luxe",
    name: "Midnight Luxe",
    description: "Dark velvet backgrounds with gold foil accents & starlight.",
    preview: ["#1a1820", "#e3c58e", "#6b5b95", "#f0ebe5"],
    dark: true,
  },
  {
    id: "obsidian-gold",
    name: "Obsidian Gold",
    description: "Deep black stone with molten gold veins & amber glow.",
    preview: ["#0d0c0f", "#d4a843", "#2a2520", "#f5ead8"],
    dark: true,
  },
  {
    id: "forest-noir",
    name: "Forest Noir",
    description: "Moody emerald depths, moss shadows & antique bronze.",
    preview: ["#0f1a14", "#8b7355", "#2d4a38", "#e8e4dc"],
    dark: true,
  },
  {
    id: "wine-velvet",
    name: "Wine Velvet",
    description: "Rich burgundy velvet, rose gold shimmer & candlelight.",
    preview: ["#1a0f14", "#c9a0a0", "#5c2030", "#f0e0e4"],
    dark: true,
  },
  {
    id: "charcoal-rose",
    name: "Charcoal Rose",
    description: "Smoky charcoal canvas with dusty rose & copper highlights.",
    preview: ["#1c1917", "#c9956a", "#8b5e6b", "#ede8e4"],
    dark: true,
  },
]

export const DEFAULT_SITE_THEME = "pearl-gold"

export const DARK_THEMES = SITE_THEMES.filter((t) => t.dark).map((t) => t.id)
