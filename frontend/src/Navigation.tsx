import { NavLink, Outlet } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="bg-light">
      <nav className="mx-auto w-11/12 max-w-screen-xl">
        <ul className="flex items-center gap-16 py-8 text-xl">
          <li className="mr-auto">
            <NavLink to="" className="text-green font-serif text-2xl font-bold">
              NatureNests
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "border-b-2 border-stone-300" : ""
              }
              to=""
            >
              Cabins
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "border-b-2 border-stone-300" : ""
              }
              to=""
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
