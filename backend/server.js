import "dotenv/config"
import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import { connectDB } from "./config/db.js"
import authRoutes from "./routes/auth.js"
import apiRoutes from "./routes/api.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 5000

const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) return callback(null, true)
      if (origin.endsWith(".vercel.app")) return callback(null, true)
      callback(null, false)
    },
    credentials: true,
  })
)
app.use(express.json({ limit: "10mb" }))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Ruchi Studio API" })
})

app.use("/api/auth", authRoutes)
app.use("/api", apiRoutes)

connectDB()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://0.0.0.0:${PORT}`)
    })
  })
  .catch((err) => {
    console.error("DB connection failed:", err.message)
    process.exit(1)
  })
