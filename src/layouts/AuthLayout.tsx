import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { Suspense, useContext, useEffect } from "react";
import { MyContextValue } from "../models/ContextType";
import { AuthContext } from "../context/auth-context";
import { PAGE } from "../config/constants";
const AuthLayout = () => {
  const { userInfo } = useContext(AuthContext) as MyContextValue;
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo?.token) {
      navigate(PAGE.HOME);
    }
  }, [userInfo]);
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex items-center justify-center h-screen">
        <div className="p-3 rounded-sm shadow-xl w-2/4  md:w-1/4">
          <Outlet />
        </div>
      </div>
    </Suspense>
  );
};

export default AuthLayout;
