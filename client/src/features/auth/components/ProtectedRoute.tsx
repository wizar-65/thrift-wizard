import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "@/features/auth/hooks/useAuth"

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (!isAuthenticated) {
    navigate("/login")
  }

  return <Outlet />
}
