import { Router } from "express"
import jwt from "jsonwebtoken"
import Admin from "../models/Admin.js"
import { authMiddleware } from "../middleware/auth.js"

const router = Router()

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" })
    }

    const admin = await Admin.findOne({
      $or: [{ username }, { email: username }],
    })
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      token,
      admin: {
        username: admin.username,
        email: admin.email,
        theme: admin.theme,
      },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password")
    if (!admin) return res.status(404).json({ message: "Admin not found" })
    res.json(admin)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put("/theme", authMiddleware, async (req, res) => {
  try {
    const { theme } = req.body
    const allowed = ["gold-pearl", "rose-blush", "ocean-lavender", "midnight"]
    if (!allowed.includes(theme)) {
      return res.status(400).json({ message: "Invalid theme" })
    }
    const admin = await Admin.findByIdAndUpdate(
      req.admin.id,
      { theme },
      { new: true }
    ).select("-password")
    res.json(admin)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
