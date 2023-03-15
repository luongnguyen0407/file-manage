import { Outlet, useNavigate } from "react-router-dom";
import { Suspense, useEffect } from "react";
import Loading from "../components/Loading";
import { LOCAL_STORAGE_KEY, PAGE } from "../config/constants";
import { useLocalStorage } from "../hooks/useLocalStorage";
const MainLayout = () => {
  const navigate = useNavigate();
  const [token] = useLocalStorage<string>(LOCAL_STORAGE_KEY.TOKEN, "");
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
