import ReactPaginate from "react-paginate";
import DataTable, {
  SortFunction,
  TableColumn,
} from "react-data-table-component";
import { useMemo } from "react";
import { Typography } from "@material-tailwind/react";
import { formatBytes } from "../../utils/formatBytes";
import { FORMAT_SIZE_FILE } from "../../config/constants";
import { File } from "@models/File";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { handleSortType } from "@models/FileFormat";
interface ListFilePropsType {
  files: File[];
  handleChangePage: (selectedPage: { selected: number }) => void;
  handleDeleteFile: (id: number) => void;
  pageCount: number;
  handleSort: handleSortType<File>;
  handleDowLoadFile: (file: File) => void;
}
const ListFile = ({
  files,
  handleChangePage,
  pageCount,
  handleDowLoadFile,
  handleDeleteFile,
  handleSort,
}: ListFilePropsType) => {
  const columns: TableColumn<File>[] = useMemo(
    () => [
      {
        name: "ID",
        selector: (row) => row.id,
      },
      {
        name: "File Name",
        selector: (row) => row.file_name,
        sortable: true,
        sortField: "file_name",
      },
      {
        name: "File Format",
        selector: (row) => row.format,
        sortable: true,
      },
      {
        name: "First Size",
        selector: (row) => formatBytes(row.file_size, FORMAT_SIZE_FILE.KB),
        sortable: true,
      },
      {
        name: "Upload At",
        selector: (row) => row.upload_at,
        sortable: true,
        sortField: "upload_at",
      },
      {
        name: "Action",
        cell: (row) => (
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => handleDeleteFile(row.id)}
              data-testid="delete-item"
            >
              <BsTrash3 className="cursor-pointer text-red-400" />
            </button>
            <AiOutlineCloudDownload
              onClick={() => handleDowLoadFile(row)}
              className="cursor-pointer text-green-400"
            />
          </div>
        ),
      },
    ],
    []
  );
  return (
    <div className="p-5 h-full min-h-screen">
      <Typography variant="h2" className="text-white text-center">
        List File
      </Typography>
      <div className=" flex justify-center mt-10 text-white">
        {files && (
          <DataTable
            columns={columns}
            data={files}
            onSort={handleSort}
            sortServer
          />
        )}
      </div>
      <div>
        <ReactPaginate
          className="flex text-white gap-x-2 justify-center mt-4"
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handleChangePage}
          containerClassName={"pagination"}
          activeClassName={"pagination_active"}
        />
      </div>
    </div>
  );
};
export default ListFile;
