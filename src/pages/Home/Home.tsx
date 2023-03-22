import DataTable, { TableColumn } from "react-data-table-component";
import ButtonLink from "@components/ButtonLink";
import { User } from "../../models/User";
import { useMemo } from "react";
import { TfiPencil } from "react-icons/tfi";
import { PAGE } from "../../config/constants";
import { Link } from "react-router-dom";
import { BsTrash3 } from "react-icons/bs";
interface HomeProps {
  users: User[];
  handleDelete: (id: number) => void;
}
const Home = ({ users, handleDelete }: HomeProps) => {
  const columns: TableColumn<User>[] = useMemo(
    () => [
      {
        name: "ID",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
      },
      {
        name: "First Name",
        selector: (row) => row.first_name,
        sortable: true,
      },
      {
        name: "Last Name",
        selector: (row) => row.last_name,
        sortable: true,
      },
      {
        name: "Avatar",
        selector: () => "avatar",
        cell: (row) => <img src={row.avatar} />,
      },
      {
        name: "Action",
        cell: (row) => (
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => handleDelete(row.id)}
              data-testid="delete-item"
            >
              <BsTrash3 className="cursor-pointer text-red-400" />
            </button>
            <Link to={`${PAGE.UPDATE}/${row.id}`}>
              <TfiPencil className="cursor-pointer text-green-400" />
            </Link>
          </div>
        ),
      },
    ],
    []
  );
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-x-4 my-2 items-center">
        <ButtonLink to={PAGE.CREATE}>Create new user</ButtonLink>
        <ButtonLink to={PAGE.LIST_FILE}> List File</ButtonLink>
      </div>
      {users && <DataTable columns={columns} data={users} />}
    </div>
  );
};
export default Home;
