import { instance } from "./instance";

// role 타입을 role: "racer"|"coach"라고 해줄 때, 페이지딴에서 어떻게 입력을 주지?
interface SignupUser {
  username: string;
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

export namespace AxiosAuth {
  /** 관리자 회원가입 */
  export const fetchSignupAdmin = async (data: CreateAdmin) => {
    const url = `admins/signup`;
    return instance.post(url, data);
  };

  /** 유저 전화번호 인증 요청 */
  export const fetchAuthUserNumber = async (data: AuthUserNumber) => {
    const url = `auth/send-verification`;
    return instance.post(url, data);
  };

  /** 유저 인증번호 확인 */
  export const fetchCheckedAuthCode = async (data: CheckedUserNumber) => {
    const url = `auth/verify-code`;
    return instance.post(url, data);
  };

  /** 유저 회원가입 */
  export const fetchSignupUser = async (data: SignupUser) => {
    const url = `users/signup`;
    return instance.patch(url, data);
  };

  /** 로그인 */
  export const fetchLogin = async (data: UserLogin) => {
    const res = await instance.post(`auth/login`, data);
    return res;
  };

  /** 로그아웃 */
  export const fetchLogout = async () => {
    const res = await instance.post(`auth/logout`);
    return res;
  };
}
