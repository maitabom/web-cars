import { createBrowserRouter } from "react-router-dom";

import DefaultLayout from "../layout/default";
import CleanLayout from "../layout/clean";
import Home from "../pages/home";
import CarDetail from "../pages/car";
import Dashboard from "../pages/dashboard";
import NewCar from "../pages/dashboard/new";
import Login from "../pages/login";
import Register from "../pages/register";
import Private from "./private";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/car/:id", element: <CarDetail /> },
      {
        path: "/dashboard",
        element: (
          <Private>
            <Dashboard />
          </Private>
        ),
      },
      {
        path: "/dashboard/new",
        element: (
          <Private>
            <NewCar />
          </Private>
        ),
      },
    ],
  },
  {
    element: <CleanLayout />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
]);

export { router };
