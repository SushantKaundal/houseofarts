import mongoose from "mongoose"

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "Sparkles" },
    color: { type: String, default: "from-blush-light to-blush" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model("Service", serviceSchema)
