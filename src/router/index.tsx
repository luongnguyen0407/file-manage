import { createBrowserRouter } from "react-router-dom";
import { PAGE } from "../config/constants";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import CreateContainer from "../pages/Create/CreateContainer";
import HomeContainer from "../pages/Home/HomeContainer";
import LoginContainer from "../pages/Login/LoginContainer";
import UpdateContainer from "../pages/Update/UpdateContainer";
export default createBrowserRouter([
  {
    element: <AuthLayout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        element: <LoginContainer />,
        path: PAGE.LOGIN,
      },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      {
        element: <HomeContainer />,
        path: PAGE.HOME,
      },
      {
        element: <UpdateContainer />,
        path: `${PAGE.UPDATE}/:id`,
      },
      {
        element: <CreateContainer />,
        path: `${PAGE.CREATE}`,
      },
    ],
  },
]);
