import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"

import { useContext } from "react"
import { LoginContext } from "../context/LoginContext"
import { NavLink } from "react-router-dom"
import DrawerButton from "../assets/DrawerButton.svg"

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false)

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const loginContext = useContext(LoginContext)
  const { token } = loginContext

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <ul className="ml-8 mt-8 flex flex-col gap-4 text-xl text-text">
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "border-b-2 border-stone-300" : "hover:text-dark"
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
                isActive ? "border-b-2 border-stone-300" : "hover:text-dark"
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
                isActive ? "border-b-2 border-stone-300" : "hover:text-dark"
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
                isActive ? "border-b-2 border-stone-300" : "hover:text-dark"
              }
              to="/logout"
            >
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </Box>
  )

  return (
    <div className="md:hidden">
      <Button onClick={toggleDrawer(true)}>
        <img src={DrawerButton} alt="Navigation menu" />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}
