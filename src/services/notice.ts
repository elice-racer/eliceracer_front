import { ResData } from "./admin";
import { api } from "./api";

interface NoticeUser {
  id: string;
  realName: string;
}
export interface Notice {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  user: NoticeUser;
}

export type OmitNotice = Omit<Notice, "createdAt" | "updatedAt" | "user" | "id">;

export namespace AxiosNotice {
  /** 관리자 공지 업로드  */
  export const postNotice = async (createNotice: OmitNotice) => {
    const url = `admins/notices`;
    const res = await api.post(url, createNotice);
    return res;
  };

  export const deleteNotice = async (noticeId: string | undefined) => {
    const url = `admins/notices/${noticeId}`;
    const res = await api.delete(url);
    return res;
  };

  export const getNoticeList = async (page = 1, size = 2): Promise<ResData<Notice[]>> => {
    const url = `notices/all?page=${page}&pageSize=${size}`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };

  /** 공자 조회 */
  export const getNoticeId = async (noticeId: string | undefined): Promise<ResData<Notice>> => {
    const url = `notices/${noticeId}`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };

  /** 공지 수정 */
  export const updateNotice = async (noticeId: string, data: OmitNotice) => {
    const url = `admins/notices/${noticeId}`;
    const res = await api.put(url, data).then(res => res.data);
    return res;
  };
}
