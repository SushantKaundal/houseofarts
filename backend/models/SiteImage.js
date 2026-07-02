import mongoose from "mongoose"

const siteImageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    src: { type: String, required: true },
    alt: { type: String, default: "" },
    section: { type: String, default: "general" },
  },
  { timestamps: true }
)

export default mongoose.model("SiteImage", siteImageSchema)
