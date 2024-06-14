import { createContext } from "react";
import io from "socket.io-client";

export const socket = io(import.meta.env.VITE_SOKET_IO, { withCredentials: true });
export const SocketContext = createContext(socket);

export const SOCKET_EVENT = {
  JOIN_ROOM: "joinChat",
  SEND_MESSAGE: "sendMessage",
  RECEIVE_MESSAGE: "receiveMessage",
  CONNECT: "connect",
  DISCONNECT: "disconnect",
};

socket.on(SOCKET_EVENT.CONNECT, () => {
  console.log("socket server connected.");
});

socket.on(SOCKET_EVENT.DISCONNECT, () => {
  console.log("socket server disconnected.");
});
