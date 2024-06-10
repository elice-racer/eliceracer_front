import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
// import { getAccessToken } from "./auth";
import Cookies from "js-cookie";

const baseURL = import.meta.env.VITE_BASE_URL;

type ErrorType = AxiosError["response"];

export const api = axios.create({
  baseURL,
  // 쿠키가 모든 요청에 자동으로 포함되게 하는 옵션
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
const onRejected = async (e: AxiosError<ErrorType>) => {
  const { config, response } = e;
  const originalRequest = config;

  if (response?.config?.url === "auth/login") {
    return Promise.reject(e);
  }

  if (response?.status === 401) {
    // 쿠키에서 들고오기
    const refreshToken = Cookies.get("refreshToken");

    const url = `${baseURL}auth/refresh`;
    const res = await axios.post(url, { refreshToken }, { withCredentials: true });
    const new_access_token = res.headers?.authorization.replace("Bearer ", "");

    localStorage.setItem("userToken", new_access_token);

    api.defaults.headers.common["Authorization"] = `Bearer ${new_access_token}`;

    if (originalRequest) {
      originalRequest.headers["Authorization"] = `Bearer ${new_access_token}`;

      return await axios(originalRequest);
    } else {
      throw new Error("original request is not define");
    }
  }
  return Promise.reject(e);
};
api.interceptors.request.use(requestPrev, requestError);
api.interceptors.response.use(onFulfilled, onRejected);
