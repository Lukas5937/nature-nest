import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ContextProviders from "./context/ContextProviders"

import Navigation from "./Navigation"
import ErrorPage from "./ErrorPage"
import Home from "./pages/home/Home"
import CabinsNavigation from "./pages/cabins/CabinsNavigation"
import Cabins from "./pages/cabins/Cabins"
import CabinDetails from "./pages/cabinDetails/CabinDetails"
import CabinDetailsDescription from "./pages/cabinDetails/components/CabinDetailsDescription"
import CabinDetailsMap from "./pages/cabinDetails/components/CabinDetailsMap"
import Authentication from "./pages/authentication/Authentication"
import ProtectedRoute from "./ProtectedRoute"
import Bookings from "./pages/bookings/Bookings"
import Logout from "./pages/authentication/Logout"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigation />,
      errorElement: <ErrorPage />,
      children: [
        { path: "", element: <Home /> },
        {
          path: "cabins",
          element: <CabinsNavigation />,
          children: [
            { path: "", element: <Cabins /> },
            {
              path: ":cabinId",
              element: <CabinDetails />,
              children: [
                { path: "", element: <CabinDetailsDescription /> },
                { path: "map", element: <CabinDetailsMap /> },
              ],
            },
          ],
        },
        { path: "auth", element: <Authentication /> },
        {
          path: "logout",
          element: (
            <ProtectedRoute>
              <Logout /> ,
            </ProtectedRoute>
          ),
        },
        {
          path: "bookings",
          element: (
            <ProtectedRoute>
              <Bookings /> ,
            </ProtectedRoute>
          ),
        },
      ],
    },
  ])

  return (
    <ContextProviders>
      <RouterProvider router={router} />
    </ContextProviders>
  )
}

export default App
