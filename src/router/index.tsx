import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
export default createBrowserRouter([
  {
    element: <AuthLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        element: <Home />,
        path: "/",
      },
    ],
  },
]);
