import styled from "styled-components";
import { useEffect, useState, useRef, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";

import ChatRoomUsersList from "./components/ChatRoomUsersList";
import TeamChatInfo from "./components/TeamChatInfo";
import { AxiosChat, ChatMessage, Chats } from "../../services/chat";
import { AxiosUser, UsersPageInfo } from "../../services/user";
import { AxiosOffieHour, OfficehourProps } from "../../services/officehour";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../recoil/UserAtom";
import Loading from "../../components/commons/Loading";
import { baseURL } from "../../services/api";
import MiniProfileModal from "./components/MiniProfileModal";
import { SocketContext, SOCKET_EVENT } from "../../context/SocketContext";
import ChatList from "./components/ChatList";

interface TeamInfo {
  id: string;
  gitlab: string;
  notion: string;
  teamName: string;
  teamNumber: number;
}
interface ChatRoomInfo {
  id: string;
  chatName: string;
  team: TeamInfo;
  users: UsersPageInfo[];
}

const ChatRoom = () => {
  const { id: chatId } = useParams();

  if (!chatId) return;

  const socket = useContext(SocketContext);
  const currentUser = useRecoilValue(currentUserAtom);

  const [miniProfile, setMiniProfile] = useState<UsersPageInfo>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userId, setUserId] = useState<any>(null);

  const recoilUser = useRecoilValue(currentUserAtom);

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const observeRef = useRef<HTMLDivElement>(null);

  const [chatsList, setChatList] = useState<Chats[]>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoomInfo>();

  // todo 주말동안 오피스아워 스케줄 등록
  const [_officeHours, setOfficeHours] = useState<OfficehourProps[]>([]);

  const [_selectedUsers, _setSelectedUsers] = useState<string[]>([]);

  /** 팀 오피스아워 조회 */
  const fetchOfficehourTeams = async () => {
    try {
      if (!chatRoomInfo?.team?.id) return;
      const res = await AxiosOffieHour.getTeamOfficehour(chatRoomInfo.team.id);
      if (res.status === 200) setOfficeHours(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartUsersChat = async (userId: string, chatName: string) => {
    try {
      const res = await AxiosChat.createUsersChat({ userIds: [userId], chatName: chatName });

      if (res.status === 201) {
        alert(`채팅방이 생성되었습니다! 채팅 목록에서 생성된 채팅방을 확인하세요!`);
        fetchGetChatList();
        setIsModalOpen(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /** 유저 미니프로필 조회 */
  const fetChMiniProfile = async (id: string) => {
    try {
      const res = await AxiosUser.getUsersPage(id);
      if (res.statusCode === 200) setMiniProfile(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenMiniProfile = (e: any) => {
    if (!e) return alert("유저 프로필을 확인할 수 없습니다.");
    fetChMiniProfile(e);
    setIsModalOpen(true);
  };

  /**현재 채팅방 정보 조회 */
  const fetchChatInfoById = useCallback(async () => {
    try {
      const res = await AxiosChat.getChatIdInfo(chatId);
      if (res.statusCode === 200) {
        setChatRoomInfo(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  }, [chatId]);

  /** 채팅방 메시지 조회 */
  const fetchChatMessages = async () => {
    setIsLoading(true);
    try {
      const res = await AxiosChat.getChatMessages(chatId);
      setIsLoading(false);
      setNextUrl(typeof res.pagination.next === "string" ? res.pagination.next.replace(baseURL, "") : null);

      if (res.statusCode === 200) {
        if (res.data) setMessages(res.data.reverse());
      }
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  /** 이전 메시지 가져오기 */
  const fetchPrevMessage = async () => {
    try {
      if (nextUrl) {
        const res = await AxiosChat.getPrevChatMessage(nextUrl);
        setNextUrl(typeof res.pagination.next === "string" ? res.pagination.next.replace(baseURL, "") : null);
        const prevChat = res.data;
        if (Array.isArray(prevChat)) {
          const newState = [...prevChat, ...messages];
          setMessages(newState);
        }
      }
    } catch (e) {
      console.log("fetch prev Message error!!");
    }
  };

  const handleSendMessage = () => {
    if (chatInput.trim() === "") return;
    socket.emit(SOCKET_EVENT.SEND_MESSAGE, {
      chatId: chatId,
      userId: userId,
      content: chatInput,
    });

    setChatInput("");
  };

  /** 채팅 보내기 */
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    // 조합형 입력이 끝났을 때는 isComposing이 false가 됨
    if (e.nativeEvent.isComposing) return;

    handleSendMessage();
  };

  // 로그인할 때 currentUser 값도 recoil에 저장 , useRecoilState로 가져와서 전역으로 관리하기
  const fetchCurrentUser = async () => {
    try {
      const res = await AxiosUser.getCurrentUser();
      if (res.statusCode === 200) {
        setUserId(res.data?.id);
      }
    } catch (e) {
      console.error(e);
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

  /** 방 입장 */
  const handleJoinChat = (chatId: string) => {
    socket.emit(SOCKET_EVENT.JOIN_ROOM, { chatId });
  };

  /** 채팅룸 삭제 */
  // const fetchDeleteChatRoom = async () => {
  //   try {
  //     const res = await AxiosChat.deleteChatRoom(chatId);
  //     console.log(res);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  /** 유저 초대 */
  // const fetchInviteUsers = async () => {
  //   try {
  //     const res = await AxiosChat.postUserToChat(chatId, selectedUsers);
  //     console.log(res);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  useEffect(() => {
    socket.on(SOCKET_EVENT.ROOM_CREATE, (chatId: string) => {
      console.log("room Created succeeded chatId : ", chatId);
    });

    socket.on(SOCKET_EVENT.SEND_MESSAGE, (newMessage: any) => {
      console.log("sendMessage", newMessage);
    });

    socket.on(SOCKET_EVENT.RECEIVE_MESSAGE, (newMessage: ChatMessage) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("joinChat");
      socket.off("roomCreate");
      socket.off("sendMessage");
      socket.off("receiveMessage");
      setIsLoading(false);
    };
  }, [socket]);

  useEffect(() => {
    fetchOfficehourTeams();
    fetchCurrentUser();
    fetchGetChatList();
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages([]);
    setNextUrl(null);

    if (chatId) {
      handleJoinChat(chatId);
      fetchChatMessages();
      fetchChatInfoById();
    }
  }, [chatId]);

  useEffect(() => {}, [recoilUser]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchPrevMessage();
        }
      },
      {
        root: chatBodyRef.current,
        threshold: 0.5,
      }
    );

    if (observeRef.current) {
      observer.observe(observeRef.current);
    }

    return () => {
      if (observeRef.current) {
        observer.unobserve(observeRef.current);
      }
    };
  }, [nextUrl]);

  return (
    <>
      <MiniProfileModal
        isModalOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        userdata={miniProfile}
        onCreateChat={handleStartUsersChat}
      />
      <Container>
        <Section>
          <ChatContainer id={chatRoomInfo?.id}>
            <Header>
              <Title>{chatRoomInfo?.chatName}</Title>
            </Header>
            <ChatBody ref={chatBodyRef}>
              <MessagesWrapper>
                <TopBar ref={observeRef} />
                {isLoading ? (
                  <Loading isLoading={isLoading} onClose={() => setIsLoading(false)} />
                ) : (
                  <>
                    {messages.map(message => {
                      const isCurrentUser = currentUser?.id === message.user.id;
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
                  </>
                )}
              </MessagesWrapper>
            </ChatBody>
            <FooterTypingBar>
              <TypingBar>
                <Input
                  disabled={isLoading}
                  onKeyDown={onKeyDown}
                  onChange={e => setChatInput(e.target.value)}
                  name="chatInput"
                  value={chatInput}
                  placeholder="send Message"
                />
                <OptionBar>
                  <Button onClick={() => alert("준비중인 기능입니다.")}>채팅방 나가기</Button>
                  <Button onClick={handleSendMessage}>전송</Button>
                </OptionBar>
              </TypingBar>
            </FooterTypingBar>
          </ChatContainer>
        </Section>
        <Section>
          <ChatList chatsList={chatsList} />
        </Section>
        <Section className="onMobile">
          <ChatInfoWrapper>
            <UsersWrapper>
              <ChatRoomUsersList users={chatRoomInfo?.users || []} onOpenMiniProfile={handleOpenMiniProfile} />
            </UsersWrapper>
            <TeamChatInfo />
          </ChatInfoWrapper>
        </Section>
      </Container>
    </>
  );
};

export default ChatRoom;

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
  justify-content: space-around;

  @media ${({ theme }) => theme.device.tablet} {
    justify-content: space-between;
  }
  @media ${({ theme }) => theme.device.mobileL} {
    flex-direction: column;
  }
  padding: 0 12px;
`;

const UsersWrapper = styled.div`
  border: solid ${({ theme }) => theme.colors.gray1} 3px;
  height: 130px;
  flex-wrap: wrap;
  overflow-y: auto;
`;

const Button = styled.div`
  background-color: ${({ theme }) => theme.colors.purple1};
  padding: 2px 6px;
  border-radius: 2px;
`;

const TopBar = styled.div`
  width: 100%;
  height: 1px;
  text-align: center;
  border: 1px solid #dbdbdb;
  border-style: dotted;
  margin-bottom: 4px;
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
  @media ${({ theme }) => theme.device.tablet} {
    &.onTablet {
      display: none;
    }
  }
  @media ${({ theme }) => theme.device.mobileL} {
    flex-direction: column;
    &.onMobile {
      display: none;
    }
  }
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

const ChatBody = styled.div`
  padding: 10px 20px;
  border: 1px solid ${({ theme }) => theme.colors.gray1};
  height: 100%;
  flex-wrap: wrap;
  overflow-y: scroll;
`;
const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const ChatItem = styled.div`
  display: flex;

  width: auto;
  margin-top: 2px;
  padding: 6px;
  border-radius: 0 8px 8px 8px;
  background-color: white;
  &.me {
    border-radius: 8px 8px 0px 8px;
    justify-content: end;
  }
`;

const DateWapper = styled.div`
  display: flex;
  justify-content: start;
  &.me {
    justify-content: end;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 36px;
  width: 100%;

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
  height: 70%;
  background-color: none;
  border: none;
  padding: 12px;
`;
