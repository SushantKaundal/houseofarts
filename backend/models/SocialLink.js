import mongoose from "mongoose"

const socialLinkSchema = new mongoose.Schema(
  {
    platform: { type: String, required: true },
    label: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, default: "Link" },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.model("SocialLink", socialLinkSchema)
