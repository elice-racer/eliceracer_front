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

interface UsersInfoRes {
  data: UsersInfo;
  message: string;
  statusCode: number;
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
  export const getMyInfo = async (): Promise<UsersInfoRes> => {
    const url = `users/mypage`;
    const res = await api.get(url).then(res => res.data);
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

  /** 내 정보 업데이트 */
  export const patchMyInfo = async (updateUserInfo: UpdateUserInfo) => {
    const url = `users/mypage`;
    const res = await api.patch(url, updateUserInfo);
    return res;
  };

  /** 스킬 검색 */
  export const getUsersSkills = async (searchs: string) => {
    const url = `users/skills?search=${searchs}`;
    const res = await api.get(url);
    return res;
  };

  /** 유저 스킬 추가 */
  export const putUsersSkills = async (skills: string[]) => {
    const url = `users/skills`;
    const res = await api.put(url, { skills });
    return res;
  };

  /** 유저 메인에서 친구 목록 조회 */
  export const getChatUsersList = async (pageSize = 10) => {
    const url = `users/participants?pageSize=${pageSize}`;
    const res = await api.get(url);
    return res;
  };
}
