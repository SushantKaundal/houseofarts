import {
  Clock,
  Frame,
  Gift,
  Heart,
  LayoutGrid,
  Sparkles,
  Tag,
  MessageCircle,
  Link,
  Mail,
  Phone,
  Share2,
} from "lucide-react"
import InstagramIcon from "../components/ui/InstagramIcon"

export const iconMap = {
  Clock,
  Frame,
  Gift,
  Heart,
  LayoutGrid,
  Sparkles,
  Tag,
  MessageCircle,
  Instagram: InstagramIcon,
  Link,
  Mail,
  Phone,
  Facebook: Share2,
  Youtube: Share2,
}

export function getIcon(name, props = {}) {
  const Icon = iconMap[name] || Link
  return <Icon {...props} />
}
