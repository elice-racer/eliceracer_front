import { api } from "./api";

// role 타입을 role: "racer"|"coach"라고 해줄 때, 페이지딴에서 어떻게 입력을 주지?
interface SignupUser {
  userName: string;
  password: string;
  realName: string;
  phoneNumber: string;
  role: string;
}

interface AuthUserNumber {
  realName: string;
  phoneNumber: string;
}
interface CheckedUserNumber extends AuthUserNumber {
  authCode: string;
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

/** 관리자 회원가입 */
export const fetchSignupAdmin = async (data: CreateAdmin) => {
  const url = `admins/signup`;
  return api.post(url, data);
};

/** 유저 전화번호 인증 요청 */
export const fetchAuthUserNumber = async (data: AuthUserNumber) => {
  const url = `auth/send-verification`;
  return api.post(url, data);
};

/** 유저 인증번호 확인 */
export const fetchCheckedAuthCode = async (data: CheckedUserNumber) => {
  const url = `auth/verify-code`;
  return api.post(url, data);
};

/** 유저 회원가입 */
export const fetchSignupUser = async (data: SignupUser) => {
  const url = `users/signup`;
  return api.patch(url, data);
};

/** 로그인 */
export const fetchLogin = async (data: UserLogin) => {
  const res = await api.post(`auth/login`, data);
  // const res = await api.post(`auth/login`, data).then(res => {
  //   res;
  // });
  return res;
};
