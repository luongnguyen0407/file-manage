import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import LoginContainer from "../pages/Login/LoginContainer";
export default createBrowserRouter([
  {
    element: <AuthLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        element: <LoginContainer />,
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
