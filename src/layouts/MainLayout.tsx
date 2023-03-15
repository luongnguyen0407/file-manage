import { Outlet, useNavigate } from "react-router-dom";
import { Suspense, useEffect } from "react";
import Loading from "../components/Loading";
import { PAGE } from "../config/constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
const MainLayout = () => {
  const navigate = useNavigate();
  const [token] = useLocalStorage<string>("token", "");
  useEffect(() => {
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
