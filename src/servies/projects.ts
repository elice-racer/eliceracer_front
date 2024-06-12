import { ResData } from "./admin";
import { api } from "./api";
import { Track } from "./user";

export interface ProjectInfo {
  id: string;
  projectName: string;
  track: Track;
  round: 3;
  startDate: string;
  endDate: string;
}

interface TracksProjectsQeruyString {
  pageSize?: string | number;
  trackName: string;
  lastCardinalNo: string | number;
}

export interface CardinalNoProjectsQeruyString {
  pageSize?: string | number;
  trackName: string;
  cardinalNo: string | number;
}
export namespace AxiosProject {
  /** 모든 프로젝트 조회 */
  export const getAllProjectsList = async (): Promise<ResData<ProjectInfo[]>> => {
    const url = `projects/all?pageSize=10&trackName=AI`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };

  export const getProjectId = async (projectId: string) => {
    const url = `projects/${projectId}`;
    const res = await api.get(url);
    return res;
  };

  /** 트랙별 프로젝트 조회 */
  export const getTracksProjects = async ({
    pageSize = 3,
    trackName,
    lastCardinalNo,
  }: TracksProjectsQeruyString): Promise<ResData<ProjectInfo[]>> => {
    const url = `projects/tracks/all?pageSize=${pageSize}&trackName=${trackName}&lastCardinalNo=${lastCardinalNo};`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };

  /**기수별 프로젝트 조회 */
  export const getCardinalsProjects = async ({ pageSize = 3, trackName, cardinalNo }: CardinalNoProjectsQeruyString) => {
    const url = `projects/cardinals/all?pageSize=${pageSize}&trackName=${trackName}&cardinalNo=${cardinalNo}`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };
}
