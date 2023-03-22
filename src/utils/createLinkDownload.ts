import { AxiosResponse } from "axios";
import { File } from "@models/File";

export const createLinkDownload = (res: AxiosResponse, file: File) => {
  const { file_name, format } = file;
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${file_name}.${format.toLowerCase()}`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
