/**
 * /api/users/current
 * "data": {
        "id": string(uuid),
	 "email": string, 
	 "username”:string
	 "profileImage”: string
	 "phone”:string
	 "role”:”racer”
	 "position”:string
	 "github”:string
	 "track”:string
   },  */

import { api } from "./api";

export namespace AxiosUser {
  /** 현재 유저 정보 가져오기 */
  export const getCurrentUser = async () => {
    const url = `users/current`;
    const res = await api.get(url);
    return res;
  };

  /** 로그인한 유저 마이페이지 */
  export const getMyInfo = async () => {
    const url = `users/mypage`;
    const res = await api.get(url);
    return res;
  };
  /** 미니프로필 */
  export const getUsersMiniProfile = async () => {
    const url = `users/miniprofile/:id`;
    const res = await api.get(url);
    return res;
  };

  /** 다른 유저의 프로필 */
  export const getUsersPage = async () => {
    const url = `users/:id `;
    const res = await api.get(url);
    return res;
  };
}
