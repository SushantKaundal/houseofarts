import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { SiteProvider } from "./context/SiteContext"
import ThemeApplier from "./components/ThemeApplier"
import App from "./App.jsx"
import AdminApp from "./admin/AdminApp.jsx"
import "./index.css"
import "./themes/site-themes.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route
          path="/*"
          element={
            <SiteProvider>
              <ThemeApplier>
                <App />
              </ThemeApplier>
            </SiteProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
