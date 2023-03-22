import Swal from "sweetalert2";
import SelectChange from "@components/SelectChange";
import ListFile from "./ListFile";
import FormUpLoadFile from "@components/FormUploadFile";
import axiosFile from "../../axios/axiosFile";
import { useTranslation } from "react-i18next";
import { useSort } from "../../hooks/useSort";
import { useSearch } from "../../hooks/useSearch";
import { usePaginate } from "../../hooks/usePaginate";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input } from "@material-tailwind/react";
import { FileFormat } from "@models/FileFormat";
import { File } from "@models/File";
import { createLinkDownload } from "../../utils/createLinkDownload";
import { API, SORT_FILE } from "../../config/constants";
import { AiOutlineSearch } from "react-icons/ai";

const ListFileContainer = () => {
  const [setSearch, delaySearch] = useSearch();
  const [file, setFile] = useState<File[]>([]);
  const [listFileFormat, setListFileFormat] = useState<FileFormat[]>();
  const [sortFormat, setSortFormat] = useState<number>();
  const [selectedFile, setSelectedFile] = useState<Blob>();
  const [sort, setSort, colSort, setColSort] = useSort<string>("");
  const [handleSelectedPage, setPaginateInfo, pageCount, nextPage] =
    usePaginate();
  const { t } = useTranslation();
  //get file
  const handleGetFile = async () => {
    try {
      const res = await axiosFile.get(`${API.LIST_FILE}?page=${nextPage}`, {
        params: {
          search: delaySearch,
          sort,
          sort_by: colSort,
          format_id: sortFormat,
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

  useEffect(() => {
    handleGetFile();
  }, [delaySearch, nextPage, sort, sortFormat]);

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

  const handleSetSort = (colName: string) => {
    setColSort(colName);
    setSort((prev) =>
      prev === SORT_FILE.DOWN ? SORT_FILE.UP : SORT_FILE.DOWN
    );
  };

  const handleSortFormat = (e?: string) => {
    if (e) setSortFormat(+e);
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
      </div>
      <ListFile
        handleSetSort={handleSetSort}
        sort={sort}
        colSort={colSort}
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
