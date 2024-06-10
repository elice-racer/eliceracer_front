import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import io from "socket.io-client";
import ChatList from "./components/ChatList";
import ChatRoomUsersList from "./components/ChatRoomUsersList";
import TeamChatInfo from "./components/TeamChatInfo";

const socket = io(import.meta.env.VITE_SOKET_IO, { autoConnect: false });

const CHAT_ROOM_DATA = {
  roomId: 1,
  roomname: "2팀",
  Member: 6,
};

const MESSAGE = [
  {
    id: 1,
    userTrack: "AI8",
    realName: "진채영",
    message: "엘리스 공지!! 만족도 조사~~",
  },
  {
    id: 1,
    userTrack: "AI8",
    realName: "진채영",
    message: "엘리스 공지!! 만족도 조사~~",
  },
  {
    id: 1,
    userTrack: "AI8",
    realName: "진채영",
    message: "엘리스 공지!! 만족도 조사~~",
  },
];

function ChatRoom() {
  const { id: roomId } = useParams();

  if (!roomId) return;

  const [_messages, setMessages] = useState<any[]>([]);

  const [chatInput, setChatInput] = useState("");

  /** 채팅 보내기 */
  const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || chatInput.trim().length === 0) return;

    socket.emit("sendMessage", { chatId: "", userId: "", content: "" });

    setChatInput("");
  };

  /** 방 입장 */
  const handleJoinChat = (roomId: string) => {
    socket.emit("joinChat", roomId);
  };

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected");
      handleJoinChat(roomId);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("roomCreate", (roodId: string) => {
      console.log("room Created succeeded roomId : ", roodId);
    });

    socket.on("joinChat", (roomId: string) => {
      console.log("joinChat roomId: ", roomId);
    });

    socket.on("sendMessage", (newMessage: any) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("sendMessage");
    };
  }, []);

  return (
    <Container>
      <Section>
        <ChatList />
      </Section>
      <Section>
        <ChatContainer id={String(CHAT_ROOM_DATA.roomId)}>
          <Header>
            <SubTitle>⬅️</SubTitle>
            <Title>{CHAT_ROOM_DATA.roomname}</Title>
            <SubTitle>🧑‍💻</SubTitle>
          </Header>
          <Body>
            {MESSAGE.map(message => {
              return (
                <ChatItem>
                  <NameWrapper>
                    <Text className="track">{message.userTrack}</Text>
                    <Text className="user">{message.realName}</Text>
                  </NameWrapper>
                  <Text>{message.message}</Text>
                </ChatItem>
              );
            })}
          </Body>
          <FooterTypingBar>
            <OptionBar></OptionBar>
            <TypingBar>
              {/* commit 용 */}
              <Input onChange={() => handleSendMessage} />
            </TypingBar>
          </FooterTypingBar>
        </ChatContainer>
      </Section>

      <Section>
        <TeamChatInfo />
        <ChatRoomUsersList />
      </Section>
    </Container>
  );
}

export default ChatRoom;

const Container = styled.div`
  width: 100vw;
  display: flex;
  gap: 12px;
  justify-content: space-around;
`;

const Section = styled.div`
  width: 33%;
  padding: 0 12px;
`;
const ChatContainer = styled.div`
  width: 100%;
  height: 100vh;
`;
const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  background-color: ${({ theme }) => theme.colors.purple1};
`;

const Title = styled.h1``;

const SubTitle = styled.h2``;

const Body = styled.div`
  padding: 10px 20px;
  gap: 4px;
  background-color: ${({ theme }) => theme.colors.gray1};
  height: 530px;
`;
// 남은 영역 차지하게 하는 css가 뭐지?

const ChatItem = styled.div`
  margin-top: 10px;
  padding: 6px;
  border-radius: 16px;
  background-color: white;
  width: 260px;
`;

const NameWrapper = styled.div`
  display: flex;
  gap: 2px;
`;
const Text = styled.p`
  &.user {
    color: blue;
    font-weight: 600;
  }
  &.track {
    color: green;
    font-weight: 600;
  }
`;

const FooterTypingBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  height: 180px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.purple1};
`;

const OptionBar = styled.div`
  height: 54px;
  width: 400px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.purple2};
`;
const TypingBar = styled.div`
  height: 88px;
  width: 400px;
  border-radius: 6px;
  background-color: #fff;
`;

const Input = styled.input``;
