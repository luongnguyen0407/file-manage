import Loading from "../components/Loading";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Suspense, useEffect } from "react";
import { PAGE } from "../config/constants";
import { Outlet, useNavigate } from "react-router-dom";
const AuthLayout = () => {
  const navigate = useNavigate();
  const [token] = useLocalStorage<string>("token", "");
  useEffect(() => {
    if (token) {
      navigate(PAGE.HOME);
    }
  }, []);
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
