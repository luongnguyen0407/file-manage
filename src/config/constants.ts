export const PAGE = {
  HOME: "/",
  LOGIN: "/login",
  UPDATE: "/update",
  CREATE: "/create",
  LIST_FILE: "/list-file",
};
export const API = {
  LOGIN: "/login",
  LIST_USER: "/users",
  DELETE_USER: "/users",
  SINGLE_USER: "/users",
  UPDATE_USER: "/users",
  CREATE_USER: "/users",
  LIST_FILE: "/list-file",
  LIST_FORMAT: "/list-format",
  DOWN_FILE: "/download",
  DELETE_FILE: "/delete",
  UPLOAD_FILE: "/upload",
};
export const LOCAL_STORAGE_KEY = {
  TOKEN: "token",
};
export enum FORMAT_SIZE_FILE {
  Bytes = 1,
  KB,
  MB,
  GB,
  TB,
  PB,
  EB,
  ZB,
  YB,
}
export enum SORT_FILE {
  UP = "asc",
  DOWN = "desc",
}
