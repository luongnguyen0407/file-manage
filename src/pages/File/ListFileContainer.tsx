import Button from "@components/Button";
import InputSearch from "@components/InputSearch";
import { File } from "@models/File";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axiosFile from "../../axios/axiosFile";
import { API } from "../../config/constants";
import { useDebounce } from "../../hooks/useDebounce";
import ListFile from "./ListFile";

type paginateInfoType = {
  last_page: number;
  limit: number;
  total_file: number;
  path: string;
};
const ListFileContainer = () => {
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [nextPage, setNextPage] = useState(1);
  const [file, setFile] = useState<File[]>([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [paginateInfo, setPaginateInfo] = useState<paginateInfoType>();
  const [selectedFile, setSelectedFile] = useState<Blob>();
  const debouncedSearch: string = useDebounce<string>(search, 1000);
  //get file
  const handleGetFile = async () => {
    try {
      const res = await axiosFile.get(`${API.LIST_FILE}?page=${nextPage}`, {
        params: {
          search: debouncedSearch,
        },
      });
      const { files, ...prev } = res.data;
      setFile(files);
      setPaginateInfo(prev);
    } catch (error) {
      toast.error("Error");
    }
  };

  //handle paginate
  const handleChangePage = useCallback(
    ({ selected }: { selected: number }): void => {
      if (!paginateInfo) return;
      const newOffset =
        (selected * paginateInfo.limit) % paginateInfo.total_file;
      setItemOffset(newOffset);
      setNextPage(selected + 1);
    },
    [paginateInfo]
  );

  const handleSearch = (event: React.ChangeEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    setSearch(target.value);
  };

  const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  //calculator page
  useEffect(() => {
    if (!paginateInfo || !paginateInfo.total_file) return;
    setPageCount(Math.ceil(paginateInfo.total_file / paginateInfo.limit));
  }, [paginateInfo, itemOffset]);

  //search when debounced change
  useEffect(() => {
    handleGetFile();
  }, [debouncedSearch]);

  //get file when page change
  useEffect(() => {
    handleGetFile();
  }, [nextPage]);

  //download file
  const handleDowLoadFile = useCallback(async (file: File) => {
    if (!file) return;
    const { file_name, id, format } = file;
    try {
      const res = await axiosFile.get(`${API.DOWN_FILE}/${id}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${file_name}.${format.toLowerCase()}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error("Error");
    }
  }, []);

  const handleDeleteFile = useCallback((id: number) => {
    if (!id) return;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosFile.delete(`${API.DELETE_FILE}/${id}`);
          handleGetFile();
          toast.success("Delete Success");
        } catch (error) {
          toast.error("Error");
        }
      }
    });
  }, []);
  const handleUploadFile = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData();
      if (selectedFile) {
        if (selectedFile.size >= 2 * 1024 * 1024) {
          toast.warning("File size should not exceed 2MB.");
          return;
        }
        formData.append("file", selectedFile);
        try {
          await axiosFile.post(`${API.UPLOAD_FILE}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success("Upload file Success");
          handleGetFile();
        } catch (error) {
          console.log("error: ", error);
          toast.error("Error.");
        }
      } else {
        toast.warning("File missing");
      }
    },
    [selectedFile]
  );

  return (
    <div className="bg-primary p-5">
      <div className="text-white flex items-center justify-between">
        <InputSearch handleSearch={handleSearch} />
        <form onSubmit={(e) => handleUploadFile(e)}>
          <input type="file" onChange={(e) => handleChooseFile(e)} />
          <Button type="submit">Upload</Button>
        </form>
      </div>
      <ListFile
        pageCount={pageCount}
        handleChangePage={handleChangePage}
        handleDowLoadFile={handleDowLoadFile}
        handleDeleteFile={handleDeleteFile}
        files={file}
      />
    </div>
  );
};

export default ListFileContainer;
