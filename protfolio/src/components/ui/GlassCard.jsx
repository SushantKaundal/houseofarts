import { motion } from "framer-motion"

export default function GlassCard({
  children,
  className = "",
  hover = true,
  ...props
}) {
  return (
    <motion.div
      className={`glass rounded-3xl p-6 md:p-8 shadow-xl shadow-charcoal/5 ${className}`}
      whileHover={hover ? { y: -6, boxShadow: "0 25px 50px -12px rgba(201, 169, 98, 0.15)" } : {}}
      transition={{ duration: 0.35, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
