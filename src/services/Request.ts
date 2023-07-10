import axios, { AxiosRequestConfig } from "axios";

const API_BASE_URL = "https://1cb7-14-99-103-154.ngrok-free.app";

const axiosConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: 3600000,
  headers: {
    Accept: "*/*",
    "ngrok-skip-browser-warning": "69420",
    "Content-Type": "application/json",
  },
  withCredentials: false,
};

const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("userInfo") ?? "[]");
  const authToken = token ? token.token : "";

  config.headers.Authorization = `Bearer ${authToken}`;
  return config;
});

export default axiosInstance;
