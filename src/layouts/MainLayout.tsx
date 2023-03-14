import { Outlet, useNavigate } from "react-router-dom";
import { Suspense, useEffect } from "react";
import Loading from "../components/Loading";
import { PAGE } from "../config/constants";
const MainLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token") as string);
    if (!token) {
      navigate(PAGE.LOGIN);
    }
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Outlet />
      </div>
    </Suspense>
  );
};

export default MainLayout;
