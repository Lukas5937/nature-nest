import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ContextProviders from "./context/ContextProviders"

import Navigation from "./Navigation"
import ErrorPage from "./ErrorPage"
import Home from "./pages/home/Home"
import CabinsNavigation from "./pages/cabins/CabinsNavigation"
import CabinDetailsDescription from "./pages/cabinDetails/components/CabinDetailsDescription"
import Authentication from "./pages/authentication/Authentication"
import ProtectedRoute from "./ProtectedRoute"
import NewBooking from "./pages/newBooking/NewBooking"
import Logout from "./pages/authentication/Logout"
import CircularProgress from "@mui/material/CircularProgress"

const Cabins = lazy(() => import("./pages/cabins/Cabins"))
const CabinDetails = lazy(() => import("./pages/cabinDetails/CabinDetails"))
const CabinDetailsMap = lazy(
  () => import("./pages/cabinDetails/components/CabinDetailsMap"),
)
const Bookings = lazy(() => import("./pages/bookings/Bookings"))

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
            {
              path: "",
              element: (
                <Suspense fallback={<CircularProgress />}>
                  <Cabins />
                </Suspense>
              ),
            },
            {
              path: ":cabinId",
              element: (
                <Suspense fallback={<CircularProgress />}>
                  <CabinDetails />
                </Suspense>
              ),
              children: [
                { path: "", element: <CabinDetailsDescription /> },
                {
                  path: "map",
                  element: (
                    <Suspense fallback={<CircularProgress />}>
                      <CabinDetailsMap />
                    </Suspense>
                  ),
                },
              ],
            },
          ],
        },
        { path: "auth", element: <Authentication /> },
        {
          path: "logout",
          element: (
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          ),
        },
        {
          path: "bookings",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<CircularProgress />}>
                <Bookings />
              </Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "new-booking",
          element: (
            <ProtectedRoute>
              <NewBooking />
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
