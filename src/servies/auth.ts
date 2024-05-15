import { api } from "./api";

interface UserLogin {
  identifier: string;
  password: string;
}

interface CreateUser {
  username: string;
  password: string;
  realName: string;
  phoneNumber: string;
}

interface CheckedUserNumber {
  phoneNumber: string;
  authCode?: string;
}
export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const RefreshToken = () => {
  return localStorage.getItem("refresh_token");
};

export const fetchCreateUser = async (data: CreateUser) => {
  const url = `/users/signup`;
  await api.post(url, data);
};
export const fetchLogin = async (data: UserLogin) => {
  const res = await api.post(`auth/login`, data);
  console.log(res.data);
  res.data.accessToken;
};
