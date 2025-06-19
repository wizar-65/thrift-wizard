import NavBar from "@/components/Navbar"
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
