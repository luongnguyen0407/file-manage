import { User } from "../../models/User";
import { TfiPencil } from "react-icons/tfi";
import { PAGE } from "../../config/constants";
import { Link } from "react-router-dom";
import { BsTrash3 } from "react-icons/bs";
import ButtonLink from "@components/ButtonLink";
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
      <div className="flex gap-x-4 my-2 items-center">
        <ButtonLink to={PAGE.CREATE}>Create new user</ButtonLink>
        <ButtonLink to={PAGE.LIST_FILE}> List File</ButtonLink>
      </div>
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
            <BsTrash3 className="cursor-pointer text-red-400" />
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
