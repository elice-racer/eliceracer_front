import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { getAccessToken } from "./auth";

const baseURL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(config => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

const configs = {
  headers: { "Content-Type": "multipart/form-data" },
};

export const postExcelFile = async (file: File) => {
  const form = new FormData();
  form.append("excelfile", file);
  const res = await api.post(baseURL, form, configs);
  return res;
};
export const formApi = axios.create({ baseURL, headers: { "Content-Type": "multipart/form-data" } });
