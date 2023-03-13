import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-3 rounded-sm shadow-xl w-2/4  md:w-1/4">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
