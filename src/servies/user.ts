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
  export const getUserInfo = async () => {
    const url = `users/current`;
    const res = await api.get(url);
    return res;
  };
}
