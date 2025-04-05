import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Welcome from "./pages/Welcome"
import "./index.css"
import UnderConstruction from "./components/common/UnderConstruction"
import Login from "./auth/Login"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Unprotected Routes */}
          <Route index element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          {/* Protected Routes */}
          <Route path="items" element={<UnderConstruction />} />
          <Route path="stats" element={<UnderConstruction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
