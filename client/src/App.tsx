import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import { Welcome } from "./pages"
import "./index.css"
import UnderConstruction from "./components/UnderConstruction"
import { LoginRegister } from "./pages"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Unprotected Routes */}
          <Route index element={<Welcome />} />
          <Route path="/login" element={<LoginRegister />} />
          {/* Protected Routes */}
          <Route path="items" element={<UnderConstruction />} />
          <Route path="stats" element={<UnderConstruction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
