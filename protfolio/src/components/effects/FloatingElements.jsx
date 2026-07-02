import { motion } from "framer-motion"

const sparkles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${8 + (i * 7.5) % 85}%`,
  top: `${10 + (i * 11) % 80}%`,
  size: 3 + (i % 3) * 2,
  delay: i * 0.4,
  duration: 2.5 + (i % 4) * 0.5,
}))

/**
 * CSS-based floating sparkles and bubbles for hero background.
 * Lightweight alternative/complement to 3D scene on mobile.
 */
export default function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-gold/60"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.2, 0.8],
            y: [0, -20, 0],
          }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Soft resin blobs */}
      <motion.div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-br from-blush/30 to-lavender/20 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-ocean/20 to-lavender/15 blur-3xl"
        animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-gold-light/20 to-blush/15 blur-3xl"
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}
