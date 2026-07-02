import dns from "dns"
import mongoose from "mongoose"

// Fix SRV lookup failures on some networks/ISPs (ECONNREFUSED on querySrv)
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"])

export async function connectDB() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error("MONGODB_URI is not defined")

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 15000,
  })
  console.log("MongoDB connected")
}
