import { ResData } from "./admin";
import { api } from "./api";

export interface Chat {
  id: string;
  //   userIds: string[];
  chatName: string;
}

export namespace AxiosChat {
  export const getChats = async (): Promise<ResData<Chat[]>> => {
    const url = `chats/rooms/all`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };
}
