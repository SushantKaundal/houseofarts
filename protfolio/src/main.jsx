import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SiteProvider } from "./context/SiteContext"
import App from "./App.jsx"
import AdminApp from "./admin/AdminApp.jsx"
import "./index.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route
          path="/*"
          element={
            <SiteProvider>
              <App />
            </SiteProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
