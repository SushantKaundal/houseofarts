import mongoose from "mongoose"

const sliderImageSchema = new mongoose.Schema(
  {
    src: { type: String, required: true },
    alt: { type: String, default: "" },
    section: {
      type: String,
      enum: ["marquee", "hero", "about", "process", "general"],
      default: "marquee",
    },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model("SliderImage", sliderImageSchema)
