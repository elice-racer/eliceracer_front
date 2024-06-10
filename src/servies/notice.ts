import { api } from "./api";

export interface Notice {
  title: string;
  content: string;
}

interface NoticeUSer {
  id: string;
  realNaeme: string;
}
export interface Notices extends Notice {
  id?: string;
  createdAt: string;
  updatedAt: string;
  user: NoticeUSer;
}

interface NoticeLostRes {
  message: string;
  statusCode: 200;
  data: Notices[];
}
export namespace AxiosNotice {
  export const getNoticeList = async (page = 1, size = 10): Promise<NoticeLostRes> => {
    const url = `notices/all?page=${page}&pageSize=${size}`;
    const res = await api.get(url);
    return res.data;
  };

  export const postNotice = async (data: Notice) => {
    const url = `admins/notices`;
    const res = await api.post(url, data);
    return res;
  };
}
