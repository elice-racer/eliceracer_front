import { api } from "./api";

export interface ResData<T> {
  data: T | undefined;
  message: string;
  statusCode: number;
  pagination: { next: string | null; count: number };
}

interface Track {
  trackName: string;
  cardinalNo: number | string;
}

interface GetTrackTeamsQuery extends Track {
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

export interface CreateChat {
  teamId: string;
}
const configs = {
  headers: { "Content-Type": "multipart/form-data" },
};
export namespace AxiosAdmin {
  export const createTeamChat = async (teamId: CreateChat) => {
    const url = `admins/chats/teams`;
    const res = await api.post(url, teamId).then(res => res.data);
    return res;
  };

  /** 오피스아워 파일 업로드 */
  export const uploadOfficehourFile = async (file: File, projectId: string) => {
    const form = new FormData();
    form.append("file", file);
    const url = `admins/officehours/${projectId}`;
    const res = await api.post(url, form, configs).then(res => res.data);
    return res;
  };

  /** 코치 등록 파일 업로드 */
  export const uploadMembersCoachFile = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const url = `admins/members/coaches`;
    const res = await api.post(url, form, configs);
    return res;
  };

  /** 팀 빌딩 파일 업로드 */
  export const uploadTeamBuildFile = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const url = `admins/teams`;
    const res = await api.post(url, form, configs);
    return res;
  };

  /** 유저 파일 업로드 */
  export const uploadUserFile = async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const url = `admins/members/racers`;
    const res = await api.post(url, form, configs);
    return res;
  };

  /** 트랙 생성 */
  export const createTrack = async (createTrack: Track) => {
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
  export const getTrackTeamList = async (TeamsInfo: GetTrackTeamsQuery): Promise<ResData<TeamsInfo[]>> => {
    const url = `teams/cardinals/all?pageSize=10&trackName=${TeamsInfo.trackName}&cardinalNo=${TeamsInfo.cardinalNo}&lastRound=${TeamsInfo.lastRound}`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };

  // id 값만으로 프로젝트 조회했을때 해당 프로젝트 트랙, 기수 필요
  export const getProject = async (id: string | undefined) => {
    const url = `projects/${id}`;
    const res = await api.get(url).then(res => res.data);
    console.log(res);
    return res;
  };

  export const getProjectDetail = async (id: string | undefined): Promise<ResData<TeamsInfo[]>> => {
    const url = `teams/projects/all?pageSize=10&projectId=${id}`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };
}
