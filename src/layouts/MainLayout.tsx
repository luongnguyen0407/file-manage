import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loading from "../components/Loading";
const MainLayout = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div>
        <Outlet />
      </div>
    </Suspense>
  );
};

export default MainLayout;
