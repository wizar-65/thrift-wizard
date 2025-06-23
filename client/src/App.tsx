import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import { Welcome } from "./pages"
import "./index.css"
import UnderConstruction from "./components/UnderConstruction"
import { LoginRegister } from "./pages"
import { AuthProvider } from "./features/auth/context/AuthContext"
import { Provider } from "react-redux"
import { store } from "./redux/store"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
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
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
