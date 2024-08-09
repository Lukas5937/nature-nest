import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navigation from "./Navigation";
import Home from "./pages/home/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigation />,
      children: [{ path: "", element: <Home /> }],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
