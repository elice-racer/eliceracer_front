import { ResData } from "./admin";
import { api } from "./api";

export interface CreateNotice {
  title: string;
  content: string;
}

interface NoticeUser {
  id: string;
  realName: string;
}
export interface Notice extends CreateNotice {
  id: string;
  createdAt: string;
  updatedAt: string;
  user: NoticeUser;
}

export namespace AxiosNotice {
  /** 관리자 공지 업로드  */
  export const postNotice = async (createNotice: CreateNotice) => {
    const url = `admins/notices`;
    const res = await api.post(url, createNotice);
    return res;
  };

  export const deleteNotice = async (noticeId: string | undefined) => {
    const url = `admins/notices/${noticeId}`;
    const res = await api.delete(url);
    console.log(res);
    return res;
  };

  export const getNoticeList = async (page = 1, size = 2): Promise<ResData<Notice[]>> => {
    const url = `notices/all?page=${page}&pageSize=${size}`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };

  export const getNoticeId = async (noticeId: string | undefined): Promise<ResData<Notice>> => {
    const url = `notices/${noticeId}`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };
}
