import { motion } from "framer-motion"

const variants = {
  primary: {
    rest: { scale: 1 },
    hover: { scale: 1.03 },
    tap: { scale: 0.98 },
  },
  ghost: {
    rest: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
  },
}

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  type = "button",
  ...props
}) {
  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm tracking-wide transition-colors duration-300 overflow-hidden"

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-gold to-gold-light text-charcoal shadow-lg shadow-gold/20 hover:shadow-gold/35",
    secondary:
      "glass text-charcoal border border-gold/30 hover:border-gold/60 hover:bg-white/60",
    ghost:
      "bg-transparent text-charcoal border border-charcoal/15 hover:border-gold/50 hover:bg-white/40",
    whatsapp:
      "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 hover:shadow-[#25D366]/40",
    instagram:
      "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white shadow-lg",
  }

  const combined = `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${className}`

  const content = (
    <>
      <motion.span
        className="absolute inset-0 bg-white/20"
        initial={{ x: "-100%", skewX: -15 }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5 }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  )

  if (href) {
    return (
      <motion.a
        href={href}
        className={combined}
        variants={variants[variant === "ghost" ? "ghost" : "primary"]}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        {...props}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={combined}
      variants={variants[variant === "ghost" ? "ghost" : "primary"]}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {content}
    </motion.button>
  )
}
