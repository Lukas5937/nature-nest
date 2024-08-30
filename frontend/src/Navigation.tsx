import { useContext } from "react"
import { NavLink, Outlet, ScrollRestoration } from "react-router-dom"
import { LoginContext } from "./context/LoginContext"
import Footer from "./UI/Footer"

export default function Navigation() {
  const loginContext = useContext(LoginContext)

  if (!loginContext) {
    throw new Error("LoginContext is not available.")
  }
  const { token } = loginContext

  return (
    <div className="bg-light">
      <nav className="mx-auto w-11/12 max-w-screen-xl">
        <ul className="flex items-center gap-16 py-8 text-xl">
          <li className="mr-auto">
            <NavLink
              to=""
              className="font-serif text-2xl font-bold text-darkGreen"
            >
              NatureNests
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "border-b-2 border-stone-300" : ""
              }
              to="/cabins"
            >
              Cabins
            </NavLink>
          </li>
          {token && (
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-stone-300" : ""
                }
                to="/bookings"
              >
                My bookings
              </NavLink>
            </li>
          )}
          {!token && (
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-stone-300" : ""
                }
                to="/auth?mode=login"
              >
                Login
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-stone-300" : ""
                }
                to="/logout"
              >
                Logout
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
