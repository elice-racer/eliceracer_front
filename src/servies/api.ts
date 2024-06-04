import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
// import { getAccessToken } from "./auth";

const baseURL = import.meta.env.VITE_BASE_URL;

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/** 요청 전에 access_token을 header에 넣는 작업 */
const requestPrev = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const access_token = localStorage.getItem("userToken");

  if (access_token) {
    config.headers.Authorization = "Bearer " + access_token;
  }

  return config;
};

/** 요청 전에 에러가 있으면 */
const requestError = (e: AxiosError): Promise<AxiosError> => {
  console.log("요청 전 에러 발생");
  return Promise.reject(e);
};

const onFulfilled = (res: AxiosResponse) => {
  return res;
};

// 요청 시 응답에 에러 발생하면 콘메시지 출력하기
const onRejected = async (e: AxiosError) => {
  // const { config, response } = e;
  // const originalRequest = config;

  console.log(e);

  return Promise.reject(e);
  // 여기에 access_token 만료되었을 때 refresh token 가지고와서 재요청 보내는 로직 짜야함
};
api.interceptors.request.use(requestPrev, requestError);
api.interceptors.response.use(onFulfilled, onRejected);

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
