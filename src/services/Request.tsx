// request.ts
import axios, { AxiosRequestConfig } from "axios";

const API_BASE_URL = "https://f4e1-14-99-103-154.ngrok-free.app";

const axiosConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: 3600000,
  headers: {
    Accept: "application/json",
  },
};

const request = axios.create(axiosConfig);

export default request;