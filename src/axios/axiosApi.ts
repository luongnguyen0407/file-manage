import axios, { AxiosResponse } from "axios";
const axiosApi = axios.create({
  baseURL: "https://reqres.in/api",
  headers: { "Content-type": "application/json" },
});

axiosApi.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("error");
    return Promise.reject(error.response.data);
  }
);
export default axiosApi;
