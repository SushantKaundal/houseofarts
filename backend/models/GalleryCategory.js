import mongoose from "mongoose"

const galleryCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model("GalleryCategory", galleryCategorySchema)
