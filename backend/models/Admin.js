import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    theme: {
      type: String,
      enum: ["gold-pearl", "rose-blush", "ocean-lavender", "midnight"],
      default: "gold-pearl",
    },
  },
  { timestamps: true }
)

adminSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

adminSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password)
}

export default mongoose.model("Admin", adminSchema)
