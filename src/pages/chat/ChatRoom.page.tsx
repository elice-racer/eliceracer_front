import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import io from "socket.io-client";
import ChatList from "./components/ChatList";
import ChatRoomUsersList from "./components/ChatRoomUsersList";
import TeamChatInfo from "./components/TeamChatInfo";
import { AxiosChat, ChatMessage, Chats } from "../../servies/chat";
import { AxiosUser } from "../../servies/user";
import { AxiosOffieHour } from "../../servies/officehour";

const socket = io(import.meta.env.VITE_SOKET_IO, { autoConnect: false });

const ChatRoom = () => {
  const { id: roomId } = useParams();

  if (!roomId) return;

  const [userId, setUserId] = useState<any>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [chatsList, setChatList] = useState<Chats[]>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>("");

  const [users, setUsers] = useState();
  const [chatRoomInfo, setChatRoomInfo] = useState({
    id: roomId,
    chatName: "",
    createAt: "",
    updatedAt: "",
    team: null,
  });

  /** 팀 오피스아워 조회 */
  const fetchOfficehourTeams = async () => {
    try {
      const res = await AxiosOffieHour.getTeamOfficehour("be171eb7-5ab0-440a-a5bf-f13854b88dd7");
      console.log("------------팀 오피스아워 조회~~~");
      console.log(res);
      console.log("------------팀 오피스아워 조회~~~");
    } catch (e) {
      console.error(e);
    }
  };

  /**현재 채팅방 정보 조회 */
  const fetchChatIdInfo = async () => {
    try {
      const res = await AxiosChat.getChatIdInfo(roomId);
      if (res.statusCode === 200) setChatRoomInfo(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  // todo 채팅방 유저 정보 조회 api 연결시 붙이기
  /** 채팅 친구 목록 조회 */
  const fetchGetUsers = async () => {
    try {
      const res = await AxiosUser.getChatUsersList();
      if (res.status === 200) setUsers(res.data.data);
    } catch (e: any) {
      console.error(e);
    }
  };

  /** 채팅방 메시지 조회 */
  const fetchChatMessages = async () => {
    try {
      const res = await AxiosChat.getChatMessages(roomId);
      if (res.statusCode === 200) {
        if (res.data) setMessages(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /** 채팅 보내기 */
  const handleSendMessage = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (e.key === "Enter" && e.nativeEvent.composed && e.nativeEvent.isComposing) {
      if (chatInput.trim() === "") return;
      socket.emit("sendMessage", {
        chatId: roomId,
        userId: userId,
        content: chatInput,
      });
    }

    setChatInput("");
  };

  /** 방 입장 */
  const handleJoinChat = (roomId: string) => {
    const chatId = roomId;
    socket.emit("joinChat", { chatId });
  };

  // 로그인할 때 currentUser 값도 recoil에 저장 , useRecoilState로 가져와서 전역으로 관리하기
  const fetchCurrentUser = async () => {
    try {
      const res = await AxiosUser.getCurrentUser();
      if (res.statusCode === 200) {
        setUserId(res.data?.id);
      }
    } catch (e) {
      console.dir(e);
    }
  };

  const fetchGetChatList = async () => {
    try {
      const res = await AxiosChat.getChats();
      console.log(res);
      if (res.statusCode === 200) setChatList(res.data);
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };

  useEffect(() => {
    fetchOfficehourTeams();
    fetchGetUsers();
    fetchChatIdInfo();
    fetchChatMessages();
    fetchCurrentUser();
    fetchGetChatList();

    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected");
      handleJoinChat(roomId);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("roomCreate", (chatId: string) => {
      console.log("room Created succeeded chatId : ", chatId);
    });

    socket.on("joinChat", (chatId: string) => {
      console.log("joinChat chatId: ", chatId);
    });

    socket.on("sendMessage", (newMessage: any) => {
      console.log("sendMessage", newMessage);
    });

    socket.on("receiveMessage", (newMessage: ChatMessage) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("sendMessage");
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Container>
      <Section>
        <ChatList chatsList={chatsList} />
      </Section>
      <Section>
        <ChatContainer id={String(chatRoomInfo?.id)}>
          <Header>
            {/* <SubTitle>⬅️</SubTitle> */}
            <Title>{chatRoomInfo?.chatName}</Title>
            {/* <SubTitle>🧑‍💻</SubTitle> */}
          </Header>
          <Body ref={chatContainerRef}>
            <MessagesWrapper>
              {messages.map(message => {
                const isCurrentUser = message.user.id === userId;
                return (
                  <Flex key={message.id} className={isCurrentUser ? "me" : ""}>
                    <Wrapper>
                      <NameWrapper className={isCurrentUser ? "me" : ""}>
                        {message.user.track?.cardinalNo && (
                          <Text className="track">
                            [{message.user.track.trackName}
                            {message.user.track.cardinalNo}]
                          </Text>
                        )}
                        <UserName className={message.user.role}>{message.user.realName}</UserName>
                      </NameWrapper>
                      <>
                        <ChatItem className={isCurrentUser ? "me" : ""}>
                          <Text>{message.content}</Text>
                        </ChatItem>
                      </>
                      <DateWapper className={isCurrentUser ? "me" : ""}>
                        <Text className="date">{message.createdAt.split("T")[1].split(".")[0]}</Text>
                      </DateWapper>
                    </Wrapper>
                  </Flex>
                );
              })}
            </MessagesWrapper>
          </Body>
          <FooterTypingBar>
            <OptionBar></OptionBar>
            <TypingBar>
              <Input onKeyDown={handleSendMessage} onChange={handleInputChange} name="chatInput" value={chatInput} placeholder="send Message" />
              <SendBtn></SendBtn>
            </TypingBar>
          </FooterTypingBar>
        </ChatContainer>
      </Section>
      <Section>
        <ChatInfoWrapper>
          <TeamChatInfo />
          <UsersWrapper>
            <ChatRoomUsersList users={users} />
          </UsersWrapper>
        </ChatInfoWrapper>
      </Section>
    </Container>
  );
};

export default ChatRoom;

const UsersWrapper = styled.div`
  border: solid ${({ theme }) => theme.colors.gray1} 3px;
  height: 450px;
  flex-wrap: wrap;
  overflow-y: auto;
`;

const SendBtn = styled.div``;

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  justify-content: space-around;
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
`;

const ChatInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ChatContainer = styled.div`
  width: 100%;
  height: 588px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  height: 46px;
  background-color: ${({ theme }) => theme.colors.purple1};
`;

const Title = styled.h1``;

const Body = styled.div`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.gray1};
  height: 100%;
  flex-wrap: wrap;
  overflow-y: auto;
`;
const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
`;
const ChatItem = styled.div`
  width: auto;
  margin-top: 2px;
  padding: 6px;
  border-radius: 0 8px 8px 8px;
  background-color: white;
  &.me {
    border-radius: 8px 8px 0px 8px;
  }
`;

const DateWapper = styled.div`
  display: flex;
  justify-content: end;
  &.me {
    justify-content: start;
    margin-left: 4px;
  }
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  &.me {
    justify-content: end;
  }
`;
const Wrapper = styled.div`
  width: 86%;
  margin: 2px;
`;
const NameWrapper = styled.div`
  display: flex;
  gap: 2px;
  &.me {
    justify-content: end;
  }
`;

const Text = styled.p`
  &.track {
    color: ${({ theme }) => theme.colors.purple2};
    font-weight: 600;
  }
  &.date {
    font-size: 0.8em;
    color: ${({ theme }) => theme.colors.gray2};
  }
`;

const UserName = styled.p`
  font-weight: 600;
  &.RACER {
  }
  &.ADMIN {
    color: ${({ theme }) => theme.colors.green2};
  }
  &.COACH {
    color: ${({ theme }) => theme.colors.blue2};
  }
`;

const FooterTypingBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  height: 120px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.purple1};
`;

const OptionBar = styled.div`
  height: 36px;
  width: 100%;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.purple2};
`;

const TypingBar = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 6px;
  background-color: #fff;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  background-color: none;
  border: none;
  padding: 12px;
`;
