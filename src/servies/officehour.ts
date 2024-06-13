import { api } from "./api";

export namespace AxiosOffieHour {
  export const getProjectOfficehour = async (projectId: string) => {
    const url = `officehours/projects/${projectId}`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };
  export const getTeamOfficehour = async (teamId: string) => {
    const url = `officehours/teams/${teamId}`;
    const res = await api.get(url);
    return res;
  };
}

// 프로젝트Id
//8ab92d20-9835-4bc8-9f17-1da291343b82

// 8기 3팀 Id
// d3795796-677a-4c6f-a48d-96cba7375a26

// 8기 2팀 Id
// be171eb7-5ab0-440a-a5bf-f13854b88dd7
