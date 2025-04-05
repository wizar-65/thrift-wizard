import NavBar from "@/components/NavBar"
import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (
    <>
      <NavBar />
      <div className="m-5">
        <Outlet />
      </div>
    </>
  )
}
