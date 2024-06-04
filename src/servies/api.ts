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

export const postUsersFile = async (file: File) => {
  const form = new FormData();
  form.append("excelfile", file);
  const url = `admins/members/racers`;
  const res = await api.post(url, form, configs);
  return res;
};

// export const formApi = axios.create({ baseURL, headers: { "Content-Type": "multipart/form-data" } });

// export const postUsersFile = async (data: File) => {
//   const url = `admins/members/racers`;
//   const formData = new FormData();
//   formData.append("file", data);
//   return await formApi.post(url, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };
