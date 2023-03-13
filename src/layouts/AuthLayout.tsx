import { Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import { Suspense } from "react";
const AuthLayout = () => {
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
