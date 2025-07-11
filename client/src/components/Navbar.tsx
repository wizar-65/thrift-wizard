import { useAuth } from "@/features/auth/context/AuthContext"
import { Link } from "react-router-dom"
import { Button } from "./styled/Button"

export default function NavBar() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav className="bg-primary p-4 shadow-lg relative">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          {isAuthenticated && (
            <ul className="flex space-x-5 text-secondary">
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/items"}>My Items</Link>
              </li>
              <li>
                <Link to={"/stats"}>Stats</Link>
              </li>
            </ul>
          )}
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to={"/"}>
            <h1 className="font-kings text-4xl text-secondary">
              Thrift Wizard
            </h1>
          </Link>
        </div>
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <Button onClick={() => logout()}>Logout</Button>
          ) : (
            <Link to={"/login"}>
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
