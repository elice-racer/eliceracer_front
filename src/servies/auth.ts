import { useSetRecoilState } from "recoil";
import { api } from "./api";
import { tokenAtom } from "../store/TokenAtom";

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

const setAccessToken = useSetRecoilState(tokenAtom);

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
  try {
    await api.post(`auth/login`, data).then(res => setAccessToken(res.data.accessToken));
    console.log(tokenAtom);
  } catch (e) {
    console.error(e);
  }
};
