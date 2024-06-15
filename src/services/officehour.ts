import { api } from "./api";
export interface OfficehourProps {
  id: string;
  coach: string;
  createdAt: string;
  date: string;
  type: string;
  updatedAt: string;
  team: {
    teamNumber: number;
  };
}

export type OmitOfficehourProps = Omit<OfficehourProps, "team">;

export namespace AxiosOffieHour {
  export const getProjectAllOfficehour = async (projectId: string): Promise<any> => {
    const url = `officehours/projects/${projectId}`;
    const res = await api.get(url).then(res => res);
    return res;
  };
  export const getTeamOfficehour = async (teamId: string) => {
    const url = `officehours/teams/${teamId}`;
    const res = await api.get(url);

    return res;
  };
}
