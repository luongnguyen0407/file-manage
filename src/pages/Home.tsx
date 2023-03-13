import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <Link
        to={"/login"}
        className="px-5 py-2 bg-blue-300 rounded-sm text-white"
      >
        Login
      </Link>
    </div>
  );
};

export default Home;
