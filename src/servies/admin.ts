import { api } from "./api";

interface CreateTrack {
  trackName: string;
  cardinalNo: number | string;
}

interface GetTrackTeamsQuery extends CreateTrack {
  lastRound: number | string;
}
// period : "2023.05.15~2023.11.15 형태

export interface TeamsInfo {
  id: string;
  teamNumber: number;
  teamName: string | null;
  gitlab: string | null;
  notion: string | null;
}

interface TeamsData {
  data: TeamsInfo[];
  message: string;
  statusCode: number;
  pagination: { next: string | null; count: number };
}
const configs = {
  headers: { "Content-Type": "multipart/form-data" },
};

export namespace AxiosAdmin {
  /** 코치 등록 파일 업로드 */
  export const uploadMembersCoachFile = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const url = `admins/members/coaches`;
    const res = await api.post(url, form, configs);
    console.log(res);
    return res;
  };

  /** 팀 빌딩 파일 업로드 */
  export const uploadTeamBuildFile = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const url = `admins/teams`;
    const res = await api.post(url, form, configs);
    console.log(res);
    return res;
  };

  /** 유저 엑셀파일 업로드 */
  export const uploadUserFile = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const url = `admins/members/racers`;
    const res = await api.post(url, form, configs);
    return res;
  };

  /** 트랙 생성 */
  export const createTrack = async (createTrack: CreateTrack) => {
    const url = `admins/tracks`;
    const res = await api.post(url, createTrack);
    return res;
  };

  /** 등록된 프로젝트팀 전체 조회 */
  export const getAllTeamList = async () => {
    const url = `teams/all?pageSize=10`;
    const res = await api.get(url);
    return res;
  };

  /** 트랙 + 기수로 조회 */
  export const getTrackTeamList = async (TeamsInfo: GetTrackTeamsQuery): Promise<TeamsData> => {
    const url = `teams/cardinals/all?pageSize=10&trackName=${TeamsInfo.trackName}&cardinalNo=${TeamsInfo.cardinalNo}&lastRound=${TeamsInfo.lastRound}&lastTeamNumber=1`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };
}
