import { ResData, TeamsInfo } from "./admin";
import { api } from "./api";

export interface Track {
  cardinalNo: number | null;
  id: string | null;
  trackName: "AI" | "SW" | "CLOUD";
}

export interface Skills {
  id: string;
  skillName: string;
}
export interface UsersPageInfo {
  id: string;
  email: string | null;
  username: string | null;
  realName: string;
  profileImage: string;
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
  teams: TeamsInfo[];
  tmi: string | null;
}
export type ChatRoomUsers = Omit<UsersPageInfo, "phoneNumber">;

export type OmitUserInfo = Omit<UsersPageInfo, "username" | "email" | "id" | "skill" | "role" | "teams" | "track" | "status">;
export type UpdateUserInfo = Partial<OmitUserInfo>;
export namespace AxiosUser {
  /** 현재 유저 정보 가져오기 */
  export const getCurrentUser = async (): Promise<ResData<UsersPageInfo>> => {
    const url = `users/current`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };

  /** 마이페이지 조회 */
  export const getMyPage = async (): Promise<ResData<UsersPageInfo>> => {
    const url = `users/mypage`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };

  /** 미니프로필 */
  export const getUsersMiniProfile = async (id: string): Promise<ResData<UsersPageInfo>> => {
    const url = `users/miniprofiles/${id}`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };

  /** 다른 유저의 프로필 */
  export const getUsersPage = async (id: string) => {
    const url = `users/${id} `;
    const res = await api.get(url).then(res => res.data);
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

  /** 프로필 업로드 */
  export const putUsersProfileImg = async (file: FormData) => {
    const url = `users/profileImages`;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const res = await api.put(url, file, config);
    return res;
  };

  /** 유저 메인에서 친구 목록 조회 */
  export const getChatUsersList = async (pageSize = 30): Promise<ResData<ChatRoomUsers[]>> => {
    const url = `users/participants?pageSize=${pageSize}`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };

  export const getSearchUser = async (search: string) => {
    const url = `users?search=${search}`;
    const res = await api.get(url);
    return res;
  };

  /** 레이서 역할별 조회 */
  export const getAllUsers = async () => {
    const url = `users/all?pageSize=10&role=all`;
    const res = await api.get(url);
    return res;
  };
}
