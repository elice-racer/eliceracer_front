import { api } from "./api";

interface SignupUser {
  username: string;
  password: string;
  realName: string;
  phoneNumber: string;
}

interface CheckedUserNumber {
  phoneNumber: string;
  authCode?: string;
}

export interface CreateAdmin {
  email: string;
  realName: string;
  password: string;
}

interface UserLogin {
  identifier: string;
  password: string;
}

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const RefreshToken = () => {
  return localStorage.getItem("refresh_token");
};

// export const fetchCheckedAdminEmail = async (data: string) => {
//   const url = `admins/verify-email?id= & token =`;
// };

/** 관리자 회원가입 */
export const fetchSignupAdmin = async (data: CreateAdmin) => {
  const url = `admins/signup`;
  return api.post(url, data);
};

/** 유저 회원가입 */
export const fetchSignupUser = async (data: SignupUser) => {
  const url = `users/signup`;
  return api.patch(url, data);
};

/** 로그인 */
export const fetchLogin = async (data: UserLogin) => {
  const res = await api.post(`auth/login`, data).then(res => res.data);
  return res;
};
