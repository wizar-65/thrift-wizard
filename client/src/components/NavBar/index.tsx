import { Link } from "react-router-dom"

export default function NavBar() {
  return (
    <nav className="bg-primary p-4 shadow-lg relative">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <ul className="flex space-x-5 text-secondary">
            <li>
              <Link to={"/"}>Dashboard</Link>
            </li>
            <li>
              <Link to={"/items"}>My Items</Link>
            </li>
            <li>
              <Link to={"/stats"}>Stats</Link>
            </li>
          </ul>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to={"/"}>
            <h1 className="font-kings text-4xl text-secondary">
              Thrift Wizard
            </h1>
          </Link>
        </div>
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-white text-secondary font-semibold rounded-lg hover:bg-gray-200 focus:outline-none cursor-pointer">
            Login
          </button>
        </div>
      </div>
    </nav>
  )
}
