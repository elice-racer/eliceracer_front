import { ResData } from "./admin";
import { api } from "./api";

export interface Chats {
  id: string;
  users: number;
  chatName: string;
}

export interface ChatInfo extends Chats {
  createAt: string;
  updatedAt: string;
}

interface Track {
  id: string;
  cardinalNo: string;
  trackName: string;
}

interface ChatUser {
  id: string;
  realName: string;
  role: string;
  track: Track;
}
export interface ChatMessage {
  id: string;
  content: string;
  user: ChatUser;
  createdAt: string;
}

interface CreateChatData {
  userIds: string[];
  chatName: string;
}
export namespace AxiosChat {
  /** 현재 유저가 가지고 있는 채팅방 조회 */
  export const getChats = async (): Promise<ResData<Chats[]>> => {
    const url = `chats/rooms/all`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };

  /** 이전 채팅 메시지 조회 */
  export const getChatMessages = async (chatId: string): Promise<ResData<ChatMessage[]>> => {
    const url = `chats/messages?chatId=${chatId}&pageSize=50`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };

  export const getChatIdInfo = async (chatId: string) => {
    const url = `chats/${chatId}`;
    const res = await api.get(url).then(res => res.data);
    return res;
  };

  /** 채팅 메시지 페이지네이션 */
  export const getPrevChatMessage = async (next: string): Promise<ResData<ChatMessage[]>> => {
    const res = await api.get(next).then(res => res.data);
    console.log("다음께 가지고 와지냐?");
    console.log(res);
    return res;
  };

  /** 채팅방 생성 */
  export const createChat = async (data: CreateChatData) => {
    const url = `chats`;
    const res = await api.post(url, data);
    console.log("-------채팅방 생성--------");
    console.log(res);
    return res;
  };
}
