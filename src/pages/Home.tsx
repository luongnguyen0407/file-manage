import { Link } from "react-router-dom";
import { PAGE } from "../config/constants";

const Home = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <Link
        to={PAGE.LOGIN}
        className="px-5 py-2 bg-blue-300 rounded-sm text-white"
      >
        Login
      </Link>
    </div>
  );
};

export default Home;
