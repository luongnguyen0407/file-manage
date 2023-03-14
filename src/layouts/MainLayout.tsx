import { Outlet, useNavigate } from "react-router-dom";
import { Suspense, useContext, useEffect } from "react";
import Loading from "../components/Loading";
import { AuthContext } from "../context/auth-context";
import { MyContextValue } from "../models/ContextType";
import { PAGE } from "../config/constants";
const MainLayout = () => {
  const { userInfo } = useContext(AuthContext) as MyContextValue;
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo?.token) {
      navigate(PAGE.LOGIN);
    }
  }, [userInfo]);
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Outlet />
      </div>
    </Suspense>
  );
};

export default MainLayout;
