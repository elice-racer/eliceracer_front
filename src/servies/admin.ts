import { api } from "./api";

interface CreateTrack {
  trackName: string;
  cardinalNo: number | string;
}

// period : "2023.05.15~2023.11.15 형태

// 네임스페이스란?? 별명을 단다.
// 실제 기능은 없고 별명만 다는거야

const configs = {
  headers: { "Content-Type": "multipart/form-data" },
};

export namespace AxiosAdmin {
  const form = new FormData();

  /** 유저 엑셀파일 업로드 */
  export const uploadUserFile = async (file: File) => {
    form.append("file", file);
    const url = `admins/members/racers`;
    const res = await api.post(url, form, configs);
    console.log(res);
    return res;
  };

  /** 트랙 생성 */
  export const createTrack = async (createTrack: CreateTrack) => {
    const url = `admins/tracks`;
    const res = await api.post(url, createTrack);
    return res;
  };
}
