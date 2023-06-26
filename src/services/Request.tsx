// request.ts
import axios, { AxiosRequestConfig } from "axios";

const API_BASE_URL = "https://a887-14-99-103-154.ngrok-free.app";

const token = JSON.parse(localStorage.getItem("userInfo") ?? "[]");
const accessToken = token ? token.token : "";

const axiosConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: 3600000,
  headers: {
    Accept: "application/json",
    "ngrok-skip-browser-warning": "69420",
    Authorization: `Bearer ${accessToken}`,
  },
};

const request = axios.create(axiosConfig);

export default request;
