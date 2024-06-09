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

export interface Track {
  cardinalNo: number | null;
  id: string | null;
  trackName: "AI" | "SW" | "CLOUD";
}

export interface Skills {
  id?: string;
  skillName: string;
}
export interface UsersInfo {
  id: string | null;
  email: string | null;
  username: string | null;
  realName: string;
  phoneNumber: string | null;
  comment: string | null;
  position: string | null;
  github: string | null;
  blog: string | null;
  sns: string | null;
  description: string | null;
  role: string;
  skills: Skills[] | [];
  status: number;
  track: Track | null;
  teams: [] | null;
  tmi: string | null;
}

export type OmitUserInfo = Omit<UsersInfo, "username" | "email" | "id" | "skill" | "role" | "teams" | "track" | "status">;
export type UpdateUserInfo = Partial<OmitUserInfo>;
export namespace AxiosUser {
  /** 현재 유저 정보 가져오기 */
  export const getCurrentUser = async () => {
    const url = `users/current`;
    const res = await api.get(url);
    return res;
  };

  /** 마이페이지 조회 */
  export const getMyInfo = async (): Promise<UsersInfo> => {
    const url = `users/mypage`;
    const res = await api.get(url).then(res => res.data.data);
    console.log(res);

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

  export const patchMyInfo = async (updateUserInfo: UpdateUserInfo) => {
    const url = `users/mypage`;
    const res = await api.patch(url, updateUserInfo);
    return res;
  };
  export const getUsersSkills = async (searchs: string) => {
    const url = `users/skills?search=${searchs}}`;
    const res = await api.get(url);

    return res;
  };

  export const putUsersSkills = async (data: Skills[]) => {
    const url = `users/skills`;
    const res = await api.put(url, data);
    console.log(res);
    return res;
  };
}
