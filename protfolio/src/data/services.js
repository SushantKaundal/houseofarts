import {
  Clock,
  Frame,
  Gift,
  Heart,
  LayoutGrid,
  Sparkles,
  Tag,
} from "lucide-react"

export const services = [
  {
    id: 1,
    title: "Resin Name Plates",
    description:
      "Elegant personalized name plates with glossy resin finish, perfect for homes and offices.",
    icon: Tag,
    color: "from-blush-light to-blush",
  },
  {
    id: 2,
    title: "Resin Clocks",
    description:
      "Functional art pieces — handcrafted clocks with ocean waves, florals, or custom themes.",
    icon: Clock,
    color: "from-lavender-light to-lavender",
  },
  {
    id: 3,
    title: "Resin Trays",
    description:
      "Stunning serving and decorative trays with embedded flowers, shells, and gold flakes.",
    icon: LayoutGrid,
    color: "from-ocean/30 to-ocean",
  },
  {
    id: 4,
    title: "Resin Photo Frames",
    description:
      "Preserve cherished memories in beautifully layered resin frames with lace and florals.",
    icon: Frame,
    color: "from-gold-light/40 to-gold",
  },
  {
    id: 5,
    title: "Customized Gifts",
    description:
      "One-of-a-kind resin gifts tailored to your vision — thoughtful, unique, and unforgettable.",
    icon: Gift,
    color: "from-blush-light to-lavender-light",
  },
  {
    id: 6,
    title: "Wedding & Keepsakes",
    description:
      "Anniversary, birthday, and wedding resin keepsakes that capture life's precious moments.",
    icon: Heart,
    color: "from-lavender-light to-blush",
  },
]

export const processSteps = [
  {
    step: 1,
    title: "Share Your Idea",
    description:
      "Tell us your vision — theme, colors, photos, and occasion. We'll listen and understand every detail.",
    icon: Sparkles,
  },
  {
    step: 2,
    title: "Design Confirmation",
    description:
      "We create a design preview for your approval, ensuring every element matches your expectations.",
    icon: Frame,
  },
  {
    step: 3,
    title: "Handmade Creation",
    description:
      "Ruchi pours, layers, and crafts your piece by hand with premium resin and meticulous care.",
    icon: Sparkles,
  },
  {
    step: 4,
    title: "Finishing & Delivery",
    description:
      "Final polish, quality check, and careful packaging — your artwork arrives ready to cherish.",
    icon: Gift,
  },
]
