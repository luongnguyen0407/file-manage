import Heading from "@components/Heading";
import { File } from "@models/File";
import { BsTrash3 } from "react-icons/bs";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { FORMAT_SIZE_FILE, PAGE } from "../../config/constants";
import { formatBytes } from "../../utils/formatBytes";
import ReactPaginate from "react-paginate";
interface ListFilePropsType {
  files: File[];
  handleChangePage: (selectedPage: { selected: number }) => void;
  handleDeleteFile: (id: number) => void;
  pageCount: number;
  handleDowLoadFile: (file: File) => void;
}
interface ListItemPropsType {
  file: File;
  index: number;
  onDownload: () => void;
  onDelete: () => void;
}
const ListFile = ({
  files,
  handleChangePage,
  pageCount,
  handleDowLoadFile,
  handleDeleteFile,
}: ListFilePropsType) => {
  return (
    <div className="p-5 h-full min-h-screen">
      <Heading className="text-white">List File</Heading>
      <div className=" flex justify-center mt-10 text-white">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">File Name</th>
              <th className="px-4 py-2">File Size</th>
              <th className="px-4 py-2">File Format</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {files &&
              files.map((file, index) => (
                <ListItem
                  index={index}
                  file={file}
                  key={file.id}
                  onDownload={() => handleDowLoadFile(file)}
                  onDelete={() => handleDeleteFile(file.id)}
                />
              ))}
          </tbody>
        </table>
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

const ListItem = ({ file, index, onDownload, onDelete }: ListItemPropsType) => {
  return (
    <tr data-testid="list-item" className="">
      <td className="border border-indigo-400 px-4 py-2">{index + 1}</td>
      <td className="border border-indigo-400 px-4 py-2">{file.file_name}</td>
      <td className="border border-indigo-400 px-4 py-2">
        {formatBytes(file.file_size, FORMAT_SIZE_FILE.KB)}
      </td>
      <td className="border border-indigo-400 px-4 py-2">
        {file.format.toLowerCase()}
      </td>
      <td className="border border-indigo-400 px-4 py-2 ">
        <div className="flex items-center justify-between">
          <BsTrash3
            onClick={onDelete}
            className="cursor-pointer text-red-400"
          />
          <AiOutlineCloudDownload
            onClick={onDownload}
            className="cursor-pointer text-green-400"
          />
        </div>
      </td>
    </tr>
  );
};
export default ListFile;
