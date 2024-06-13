import { api } from "./api";

export namespace AxiosOffieHour {
  export const getProjectAllOfficehour = async (projectId: string) => {
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
//ab98d368-a71a-48da-9ce9-6382042a4686

// 8기 3팀 Id
// a13124e8-0563-4f93-80f9-3e13af0f7c72

// 8기 2팀 Id
// 0b8982ab-1744-4b2f-8cce-90e1fe40117e
