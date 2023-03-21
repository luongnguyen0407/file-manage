import axios from "axios";
const axiosFile = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_FILE,
  headers: { "Content-type": "application/json" },
});
export default axiosFile;
