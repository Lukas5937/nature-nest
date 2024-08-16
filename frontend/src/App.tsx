import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ContextProviders from "./context/ContextProviders"

import Navigation from "./Navigation"
import ErrorPage from "./ErrorPage"
import Home from "./pages/home/Home"
import Cabins from "./pages/cabins/Cabins"
import CabinDetails from "./pages/cabinDetails/CabinDetails"
import CabinDetailsDescription from "./pages/cabinDetails/components/CabinDetailsDescription"
import CabinDetailsMap from "./pages/cabinDetails/components/CabinDetailsMap"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigation />,
      errorElement: <ErrorPage />,
      children: [
        { path: "", element: <Home /> },
        { path: "cabins", element: <Cabins /> },
        {
          path: "cabins/:cabinId",
          element: <CabinDetails />,
          children: [
            { path: "", element: <CabinDetailsDescription /> },
            { path: "map", element: <CabinDetailsMap /> },
          ],
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
