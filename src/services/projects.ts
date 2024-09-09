import { ResData, TeamsInfo } from "./admin";
import { instance } from "./instance";
import { Track, UserListType } from "./user";

// todo Projects 로 수정
export interface ProjectInfo {
  id: string;
  projectName: string;
  track: Track;
  round: 3;
  startDate: string;
  endDate: string;
}

// todo ProjectInfo로 수정
export interface ProjectDetail extends ProjectInfo {
  teams: TeamsInfo[] | [];
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

interface CoachsInfo {
  id: string;
  realName: string;
  position: string | null;
}

export interface TeamInfo {
  id: string;
  projectId: string;
  projectName: string;
  startDate: string;
  endDate: string;
  chatId: string;
  coachList: CoachsInfo[];
  track: Track;
  round: number;
  teamName: string;
  teamNumber: number;
  gitlab: string;
  notion: string;
  userList: UserListType[];
}

export namespace AxiosProject {
  /** 프로젝트 조회 */
  export const getAllProjectsList = async (): Promise<ResData<ProjectInfo[]>> => {
    const url = `projects?pageSize=10&trackName=ALL&cardinalNo=0&round=0&lastTrackName=&lastCardinalNo=&lastRound=`;
    const res = await instance.get(url).then(res => res.data);
    return res;
  };

  export const getProjectId = async (projectId: string | undefined) => {
    const url = `projects/${projectId}`;
    const res = await instance.get(url).then(res => res.data);
    return res;
  };

  /** [삭제 예정] 트랙별 프로젝트 조회 */
  export const getTracksProjects = async ({
    pageSize = 3,
    trackName,
    lastCardinalNo,
  }: TracksProjectsQeruyString): Promise<ResData<ProjectInfo[]>> => {
    const url = `projects/tracks/all?pageSize=${pageSize}&trackName=${trackName}&lastCardinalNo=${lastCardinalNo};`;
    const res = await instance.get(url).then(res => res.data);
    return res;
  };

  /** [삭제 예정] 기수별 프로젝트 조회 */
  export const getCardinalsProjects = async ({ pageSize = 3, trackName, cardinalNo }: CardinalNoProjectsQeruyString) => {
    const url = `projects/cardinals/all?pageSize=${pageSize}&trackName=${trackName}&cardinalNo=${cardinalNo}`;
    const res = await instance.get(url).then(res => res.data);
    return res;
  };

  /** 팀 상세 조회 */
  export const getTeamInfo = async (teamId: string | undefined): Promise<ResData<TeamInfo>> => {
    const url = `teams/${teamId}`;
    const res = await instance.get(url).then(res => res.data);
    return res;
  };
}
