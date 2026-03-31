import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import { Welcome } from "./pages"
import "./index.css"
import UnderConstruction from "./components/UnderConstruction"
import { LoginRegister } from "./pages"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* Unprotected Routes */}
            <Route index element={<Welcome />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route element={<ProtectedRoute />}>
              <Route path="items" element={<UnderConstruction />} />
              <Route path="stats" element={<UnderConstruction />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
