import { User } from "../../models/User";
import { TfiPencil } from "react-icons/tfi";
import { PAGE } from "../../config/constants";
import { Link } from "react-router-dom";
import { BsTrash3 } from "react-icons/bs";
interface HomeProps {
  users: User[];
  handleDelete: (id: number) => void;
}
interface ListItemProps {
  user: User;
  onClick: () => void;
}
const Home = ({ users, handleDelete }: HomeProps) => {
  return (
    <div className="overflow-x-auto">
      <Link
        className="py-2 px-3 bg-cyan-400 rounded-sm "
        to={PAGE.CREATE}
        title="test"
      >
        Create new user
      </Link>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Avatar</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <ListItem
                key={user.id}
                user={user}
                onClick={() => handleDelete(user.id)}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

const ListItem = ({ user, onClick }: ListItemProps) => {
  return (
    <tr data-testid="list-item">
      <td className="border px-4 py-2">{user.id}</td>
      <td className="border px-4 py-2">{user.email}</td>
      <td className="border px-4 py-2">{user.first_name}</td>
      <td className="border px-4 py-2">{user.last_name}</td>
      <td className="border px-4 py-2">
        <img src={user.avatar} alt="Avatar" />
      </td>
      <td className="border px-4 py-2 ">
        <div className="flex items-center justify-between">
          <button onClick={onClick} data-testid="delete-item">
            <BsTrash3
              title="delete-item"
              className="cursor-pointer text-red-400 delete-item"
            />
          </button>
          <Link to={`${PAGE.UPDATE}/${user.id}`}>
            <TfiPencil className="cursor-pointer text-green-400" />
          </Link>
        </div>
      </td>
    </tr>
  );
};
export default Home;
