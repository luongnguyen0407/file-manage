import Swal from "sweetalert2";
import axiosApi from "../../axios/axiosApi";
import { User } from "../../models/User";
import { toast } from "react-toastify";
import { lazy, useCallback, useEffect, useState } from "react";
import { API } from "../../config/constants";
const Home = lazy(() => import("./Home"));
const HomeContainer = () => {
  const [users, setUsers] = useState<User[]>([]);
  const handleGetData = async () => {
    try {
      const { data } = await axiosApi.get(API.LIST_USER);
      setUsers(data.data);
    } catch (error) {
      console.log("loi roi");
    }
  };
  useEffect(() => {
    handleGetData();
  }, []);
  const handleDeleteUser = useCallback(
    (id: number) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axiosApi.delete(`${API.DELETE_USER}/${id}`);
            const newUsers = users.filter((user) => +user.id != id);
            setUsers(newUsers);
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          } catch (error) {
            console.log("error1111: ", error);
            toast.error("Error");
          }
        }
      });
    },
    [users]
  );
  return (
    <div className="flex justify-center mt-4 " data-testid="home-page">
      <Home users={users} handleDelete={handleDeleteUser} />
    </div>
  );
};

export default HomeContainer;
