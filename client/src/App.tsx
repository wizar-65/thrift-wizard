import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Welcome from "./pages/Welcome"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Welcome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
