import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import ArtworkDetail from "./pages/ArtworkDetail"

export default function App() {
  return (
    <Routes>
      <Route path="/artwork/:id" element={<ArtworkDetail />} />
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
