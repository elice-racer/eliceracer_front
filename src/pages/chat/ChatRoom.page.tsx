import styled from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import io from "socket.io-client";
import ChatList from "./components/ChatList";
import ChatRoomUsersList from "./components/ChatRoomUsersList";
import TeamChatInfo from "./components/TeamChatInfo";
import { AxiosChat, ChatMessage, Chats } from "../../servies/chat";
import { AxiosUser } from "../../servies/user";

const socket = io(import.meta.env.VITE_SOKET_IO, { autoConnect: false });

const CHAT_ROOM_DATA = {
  chatId: 1,
  roomname: "2팀",
  Member: 6,
};

const ChatRoom = () => {
  const { id: chatId } = useParams();

  if (!chatId) return;

  const [userId, setUserIs] = useState<any>(null);
  const [chatsList, setChatList] = useState<Chats[]>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>("");

  /** 채팅방 메시지 조회 */
  const fetchChatMessages = async () => {
    try {
      const res = await AxiosChat.getChatMessages(chatId);
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
      console.log(chatInput);
      socket.emit("sendMessage", {
        chatId: chatId,
        userId: userId,
        content: chatInput,
      });
    }

    setChatInput("");
  };

  /** 방 입장 */
  const handleJoinChat = (chatId: string) => {
    const id = chatId;
    socket.emit("joinChat", { id });
  };

  // 로그인할 때 currentUser 값도 recoil에 저장 , useRecoilState로 가져와서 전역으로 관리하기

  const fetchCurrentUser = async () => {
    try {
      const res = await AxiosUser.getCurrentUser();
      if (res.statusCode === 200) {
        setUserIs(res.data?.id);
      }
    } catch (e) {
      console.dir(e);
    }
  };

  const fetchGetChatList = async () => {
    try {
      const res = await AxiosChat.getChats();
      if (res.statusCode === 200) setChatList(res.data);
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(e.target.value);
  };

  useEffect(() => {}, [messages]);

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    fetchCurrentUser();
    fetchGetChatList();
    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected");
      handleJoinChat(chatId);
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

    socket.on("receiveMessage", (newMessage: any) => {
      console.log("---------receiveMessage----------");
      console.log(newMessage);
      console.log("---------receiveMessage----------");
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
        <ChatList chatsList={chatsList} />
      </Section>
      <Section>
        <ChatContainer id={String(CHAT_ROOM_DATA.chatId)}>
          <Header>
            <SubTitle>⬅️</SubTitle>
            <Title>{CHAT_ROOM_DATA.roomname}</Title>
            <SubTitle>🧑‍💻</SubTitle>
          </Header>
          <Body>
            <MessagesWrapper>
              {messages.map(message => {
                return (
                  <Wrapper>
                    <ChatItem key={message.id}>
                      <NameWrapper>
                        <Text className="track">
                          [트랙정보]
                          {/* `{message.user.track.trackName}
                      {message.user.track.cradinalNo}` */}
                        </Text>
                        <UserName className="{user.role}">
                          아무개
                          {/* {message.realName} */}
                        </UserName>
                      </NameWrapper>
                      <Text>{message.content}</Text>
                    </ChatItem>
                    <DateWapper>
                      <Text>{message.createdAt.split("T")[1].split(".")[0]}</Text>
                    </DateWapper>
                  </Wrapper>
                );
              })}
            </MessagesWrapper>
          </Body>
          <FooterTypingBar>
            <OptionBar></OptionBar>
            <TypingBar>
              {/* commit 용 */}
              <Input onKeyDown={handleSendMessage} onChange={handleInputChange} name="chatInput" value={chatInput} placeholder="send Message" />
              <SendBtn></SendBtn>
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
};

export default ChatRoom;

const SendBtn = styled.div``;
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
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  height: 46px;
  background-color: ${({ theme }) => theme.colors.purple1};
`;

const Title = styled.h1``;

const SubTitle = styled.h2``;

const Body = styled.div`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.gray1};
  height: 530px;
  flex-wrap: wrap;
  overflow-y: auto;
`;
const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
`;
const ChatItem = styled.div`
  margin-top: 10px;
  padding: 6px;
  border-radius: 0 16px 16px 16px;
  background-color: white;
  max-width: 100%;
  &.currentUsers {
    border-radius: 16px 16px 0px 16px;
  }
`;

const DateWapper = styled.div`
  display: flex;
  justify-content: end;
`;
const Wrapper = styled.div`
  width: 86%;
`;
const NameWrapper = styled.div`
  display: flex;
  gap: 2px;
`;
const Text = styled.p`
  &.track {
    color: green;
    font-weight: 600;
  }
`;

const UserName = styled.p`
  font-weight: 600;
  &.RACER {
    color: ${({ theme }) => theme.colors.purple2};
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
