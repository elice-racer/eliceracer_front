import { ResData } from "./admin";
import { api } from "./api";

export interface Notice {
  title: string;
  content: string;
}

interface NoticeUser {
  id: string;
  realName: string;
}
export interface Notices extends Notice {
  id?: string;
  createdAt: string;
  updatedAt: string;
  user: NoticeUser;
}

export namespace AxiosNotice {
  /** 관리자 공지 업로드  */
  export const postNotice = async (data: Notice) => {
    const url = `admins/notices`;
    const res = await api.post(url, data);
    return res;
  };

  export const deleteNotice = async (noticeId: string | undefined) => {
    const url = `admins/notices/${noticeId}`;
    const res = await api.delete(url);
    console.log(res);
    return res;
  };

  export const getNoticeList = async (page = 1, size = 10): Promise<ResData<Notices[]>> => {
    const url = `notices/all?page=${page}&pageSize=${size}`;
    const res = await api.get(url);
    return res.data;
  };

  export const getNoticeId = async (noticeId: string | undefined): Promise<ResData<Notices>> => {
    const url = `notices/${noticeId}`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };
}
