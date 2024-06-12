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

export interface ChatMessage {
  id: string;
  chat: ChatInfo;
  content: string;
  createdAt: string;
  updatedAt: string;
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
}
