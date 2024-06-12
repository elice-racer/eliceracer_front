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

export namespace AxiosProject {
  /** 모든 프로젝트 조회 */
  export const getAllProjectsList = async (): Promise<ResData<ProjectInfo[]>> => {
    const url = `projects/all?pageSize=10&trackName=AI`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };
}
