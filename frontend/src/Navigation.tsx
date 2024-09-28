import { useContext } from "react"
import { NavLink, Outlet, ScrollRestoration } from "react-router-dom"
import { LoginContext } from "./context/LoginContext"
import Footer from "./UI/Footer"
import TemporaryDrawer from "./UI/NavigationDrawer"

export default function Navigation() {
  const loginContext = useContext(LoginContext)

  if (!loginContext) {
    throw new Error("LoginContext is not available.")
  }
  const { token } = loginContext

  return (
    <div className="flex min-h-screen flex-col justify-between bg-light">
      <div>
        <nav className="mx-auto w-11/12 max-w-screen-xl">
          <ul className="flex items-center py-8 text-lg md:gap-6 lg:gap-12 lg:text-xl">
            <li className="mr-auto">
              <NavLink
                to=""
                className="font-serif text-xl font-bold text-darkGreen sm:text-2xl"
              >
                NatureNests
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "hidden border-b-2 border-stone-300 md:block"
                    : "hidden hover:text-dark md:block"
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
                    isActive
                      ? "hidden border-b-2 border-stone-300 md:block"
                      : "hidden hover:text-dark md:block"
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
                    isActive
                      ? "hidden border-b-2 border-stone-300 md:block"
                      : "hidden hover:text-dark md:block"
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
                    isActive
                      ? "hidden border-b-2 border-stone-300 md:block"
                      : "hidden hover:text-dark md:block"
                  }
                  to="/logout"
                >
                  Logout
                </NavLink>
              </li>
            )}
            <TemporaryDrawer />
          </ul>
        </nav>
        <Outlet />
      </div>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
