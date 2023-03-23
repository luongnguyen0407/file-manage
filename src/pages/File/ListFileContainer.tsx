import Swal from "sweetalert2";
import SelectChange from "@components/SelectChange";
import ListFile from "./ListFile";
import FormUpLoadFile from "@components/FormUploadFile";
import axiosFile from "../../axios/axiosFile";
import { useTranslation } from "react-i18next";
import { useSearch } from "../../hooks/useSearch";
import { usePaginate } from "../../hooks/usePaginate";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input, Option, Select } from "@material-tailwind/react";
import { FileFormat, handleSortType } from "@models/FileFormat";
import { File } from "@models/File";
import { createLinkDownload } from "../../utils/createLinkDownload";
import { API } from "../../config/constants";
import { AiOutlineSearch } from "react-icons/ai";

const ListFileContainer = () => {
  const [setSearch, delaySearch] = useSearch();
  const [file, setFile] = useState<File[]>([]);
  const [listFileFormat, setListFileFormat] = useState<FileFormat[]>();
  const [sortFormat, setSortFormat] = useState<number>();
  const [sortBy, setSortBy] = useState("");
  const [limit, setLimit] = useState(10);
  const [sortDir, setSortDir] = useState("");
  const [selectedFile, setSelectedFile] = useState<Blob>();
  const [handleSelectedPage, setPaginateInfo, pageCount, nextPage] =
    usePaginate();
  const { t } = useTranslation();
  //get file
  const handleGetFile = async () => {
    try {
      const res = await axiosFile.get(`${API.LIST_FILE}?page=${nextPage}`, {
        params: {
          search: delaySearch,
          format_id: sortFormat,
          sort_by: sortBy,
          sort: sortDir,
          limit,
        },
      });
      const { files, ...prev } = res.data;
      setFile(files);
      setPaginateInfo(prev);
    } catch (error) {
      toast.error(t("server.error"));
    }
  };

  //handle paginate
  const handleChangePage = ({ selected }: { selected: number }) => {
    handleSelectedPage(selected);
  };

  const handleSearch = (event: React.ChangeEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    setSearch(target.value);
  };

  const handleChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSort: handleSortType<File> = (selectedColumn, sortDirection) => {
    const sortName = selectedColumn.sortField;
    setSortBy(sortName as string);
    setSortDir(sortDirection);
  };
  useEffect(() => {
    handleGetFile();
  }, [delaySearch, nextPage, sortFormat, sortBy, sortDir, limit]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosFile.get(`${API.LIST_FORMAT}`);
        setListFileFormat(res.data.file_format);
      } catch (error) {
        toast.error(t("server.error"));
      }
    })();
  }, []);

  //download file
  const handleDowLoadFile = useCallback(async (file: File) => {
    if (!file) return;
    const { id } = file;
    try {
      const res = await axiosFile.get(`${API.DOWN_FILE}/${id}`, {
        responseType: "blob",
      });
      createLinkDownload(res, file);
    } catch (error) {
      toast.error(t("server.error"));
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
          toast.success(t("file.delete_success"));
        } catch (error) {
          toast.error(t("server.error"));
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
          toast.success(t("file.upload_success"));
          handleGetFile();
        } catch (error) {
          console.log("error: ", error);
          toast.error(t("server.error"));
        }
      } else {
        toast.warning(t("file.missing_file"));
      }
    },
    [selectedFile]
  );
  const handleSortFormat = (e?: string) => {
    if (e) setSortFormat(+e);
  };
  const handleSetLimit = (e?: string) => {
    if (e) setLimit(+e);
  };
  return (
    <div className="bg-primary p-5">
      <div className="text-white flex items-center justify-between">
        <div className="w-72">
          <Input
            onChange={handleSearch}
            label="Search"
            className="text-white"
            icon={<AiOutlineSearch />}
          />
        </div>
        <FormUpLoadFile
          onSubmit={handleUploadFile}
          onChange={handleChooseFile}
        />
        <div className="m-w-72">
          {listFileFormat && (
            <SelectChange
              handleSortFormat={handleSortFormat}
              listFileFormat={listFileFormat}
            />
          )}
        </div>
        <div className="m-w-72">
          <Select
            label="Limit"
            className="text-white"
            onChange={handleSetLimit}
          >
            <Option value="1">1</Option>
            <Option value="10">10</Option>
            <Option value="20">20</Option>
            <Option value="30">30</Option>
          </Select>
        </div>
      </div>
      <ListFile
        handleSort={handleSort}
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
