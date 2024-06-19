import styled from "styled-components";
import { useEffect, useState, useRef, useContext, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
import { paths } from "../../utils/path";
import SelectUsersModal from "./components/inviteUsers/SelectUserModal";

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
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const currentUser = useRecoilValue(currentUserAtom);

  const chatBodyRef = useRef<HTMLDivElement>(null);
  const observeRef = useRef<HTMLDivElement>(null);
  const [userId, setUserId] = useState<any>(null);

  const [error, setError] = useState<string>("");
  const [miniProfile, setMiniProfile] = useState<UsersPageInfo>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatNameModalOpen, setChatNameModalOpen] = useState(false);

  /** 채팅방 멤버 초대  */
  const [userList, setUserList] = useState();
  const [isSelectUserModalOpne, setIsSelectUserModalOpen] = useState<boolean>(false);
  const [searchUser, setSearchUser] = useState("");
  const [selectedUsers, _setSelectedUsers] = useState<string[]>([]);

  const [chatsList, setChatList] = useState<Chats[]>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const [nextUrl, setNextUrl] = useState<string | null>(null);

  const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoomInfo>();

  const [officeHours, setOfficeHours] = useState<OfficehourProps[]>([]);

  const [chatNameInput, setChatNameInput] = useState("");

  const handleChageChatNameInput = (e: any) => setChatNameInput(e.target.value);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setChatNameModalOpen(false);
  };

  const handleCloseChatNameModal = () => {
    setChatNameModalOpen(false);
  };
  const handleCreateChat = () => {
    if (!miniProfile) return;
    if (chatNameInput.trim() === "") return;
    if (chatNameInput.length >= 15) alert("채팅방 이름이 너무 깁니다.");

    setChatNameModalOpen(false);

    if (handleStartUsersChat && miniProfile.id) {
      handleStartUsersChat(miniProfile.id, chatNameInput);
      setChatNameInput("");
    }
  };

  /** 멤버 검색 */
  const fetchSearchUserList = async () => {
    try {
      const res = await AxiosUser.getSearchUser(searchUser);
      if (res.status === 200) setUserList(res.data.data);
    } catch (e: any) {
      setError(e.response?.data.message);
    }
  };

  const handleSearchUser = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchSearchUserList();
    }
  };

  /** 팀 오피스아워 조회 */
  const fetchOfficehourTeams = async (id: string) => {
    try {
      if (!id) return;
      const res = await AxiosOffieHour.getTeamOfficehour(id);
      if (res.status === 200) setOfficeHours(res.data);
    } catch (e: any) {
      setError(e.response?.data.message);
    }
  };

  const handleStartUsersChat = async (userId: string, chatName: string) => {
    try {
      const res = await AxiosChat.createUsersChat({ userIds: [userId], chatName: chatName });

      if (res.status === 201) {
        console.log(res);
        alert(`채팅방이 생성되었습니다!`);
        fetchGetChatList();
        setIsModalOpen(false);
        navigate(`${paths.CHAT_HOME}/${res.data.data.id}`);
      }
    } catch (e: any) {
      setError(e.response?.data.message);
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
        if (res.data.team.id) fetchOfficehourTeams(res.data.team.id);
      }
    } catch (e: any) {
      setError(e.response?.data.message);
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
    } catch (e: any) {
      setError(e.response?.data.message);
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
    } catch (e: any) {
      console.log("fetch prev Message error!!");
      setError(e.response?.data.message);
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
    } catch (e: any) {
      setError(e.response?.data.message);
    }
  };

  const fetchGetChatList = async () => {
    try {
      const res = await AxiosChat.getChats();
      if (res.statusCode === 200) setChatList(res.data);
    } catch (e: any) {
      setError(e.response?.data.message);
    }
  };

  /** 방 입장 */
  const handleJoinChat = (chatId: string) => {
    socket.emit(SOCKET_EVENT.JOIN_ROOM, { chatId });
  };

  /** 채팅룸 나가기 */
  const fetchLeaveChatRoom = async () => {
    try {
      const res = await AxiosChat.deleteChatRoom(chatId);
      if (res.data.statusCode === 200) {
        alert("채팅방을 나왔습니다.");
        navigate(paths.CHAT_HOME);
      }
    } catch (e: any) {
      setError(e.response?.data.message);
    }
  };

  /** 채팅방 나가기 이벤트 */
  const handleClickLeaveChat = async () => {
    if (chatRoomInfo?.team) alert("프로젝트 기간에는 팀 채팅방을 나가실 수 없습니다.");
    if (chatRoomInfo?.team === null) fetchLeaveChatRoom();
  };

  const handleClickInviteButton = async () => {
    if (chatRoomInfo?.team) {
      if (currentUser?.role === "RACER") alert("프로젝트 채팅방 초대는 관리자 권한이 필요합니다.");
    }
    return alert("Comming soon...");
    // setIsSelectUserModalOpen(true);
    // fetchInviteUsers();
  };

  /** 유저 초대 */
  const fetchInviteUsers = async () => {
    try {
      if (selectedUsers.length === 0) return alert("초대할 사람을 선택해주세요.");
      console.log(selectedUsers);
      const res = await AxiosChat.postUserToChat(chatId, selectedUsers);
      console.log(res);
    } catch (e: any) {
      setError(e.response?.data.message);
    }
  };

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
    setOfficeHours([]);

    if (chatId) {
      handleJoinChat(chatId);
      fetchChatMessages();
      fetchChatInfoById();
    }
  }, [chatId]);

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
      <SelectUsersModal
        onOpen={isSelectUserModalOpne}
        onClose={() => {
          setIsSelectUserModalOpen(false);
        }}
        onChange={(e: any) => setSearchUser(e.target.value)}
        onInviteUsers={fetchInviteUsers}
        onSearch={handleSearchUser}
        onClickSearch={fetchSearchUserList}
        searchUser={searchUser}
        userList={userList}
      />
      <MiniProfileModal
        isModalOpen={isModalOpen}
        chatNameModalOpen={chatNameModalOpen}
        onOpenChatName={() => setChatNameModalOpen(true)}
        chatNameInput={chatNameInput}
        onChagneInput={handleChageChatNameInput}
        onClose={handleCloseModal}
        userdata={miniProfile}
        onCreateChat={handleCreateChat}
        onCloseChatName={handleCloseChatNameModal}
      />
      <Container>
        <Section>
          <ChatContainer id={chatRoomInfo?.id}>
            <TitleWrapper>
              <Title>{chatRoomInfo?.chatName}</Title>
              <IconWrapper>
                <InviteIcon>➕👥</InviteIcon>
                <InviteIcon className="altText" onClick={handleClickInviteButton}>
                  초대하기
                </InviteIcon>
              </IconWrapper>
            </TitleWrapper>
            <ChatBody ref={chatBodyRef}>
              <MessagesWrapper>
                <TopBar ref={observeRef} />
                {isLoading ? (
                  <Loading isLoading={isLoading} onClose={() => setIsLoading(false)} />
                ) : (
                  <>
                    {messages.length === 0 ? (
                      <EmptyMeaageWrapper>
                        <Text className="date">작성된 메시지가 없습니다.</Text>
                      </EmptyMeaageWrapper>
                    ) : (
                      messages.map(message => {
                        const isCurrentUser = currentUser?.id === message.user.id;
                        return (
                          <Flex key={message.id} className={isCurrentUser ? "me" : ""}>
                            <Wrapper>
                              <NameWrapper className={isCurrentUser ? "me" : ""}>
                                {message.user.track?.cardinalNo ? (
                                  <Text className="track">
                                    [{message.user.track.trackName}
                                    {message.user.track.cardinalNo}]
                                  </Text>
                                ) : (
                                  <>
                                    {message.user.role === "ADMIN" && <Text className="ADMIN">[매니저]</Text>}
                                    {message.user.role === "COACH" && <Text className="COACH">[코치]</Text>}
                                  </>
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
                      })
                    )}
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
                  <Button onClick={handleClickLeaveChat}>채팅방 나가기</Button>
                  <Button onClick={handleSendMessage}>전송</Button>
                </OptionBar>
              </TypingBar>
            </FooterTypingBar>
          </ChatContainer>
        </Section>
        <Section className="section">
          <UsersWrapper>
            <Text className="error">{error}</Text>
            <ChatRoomUsersList users={chatRoomInfo?.users || []} onOpenMiniProfile={handleOpenMiniProfile} />
          </UsersWrapper>
          <ChatList chatsList={chatsList} />
        </Section>
        {officeHours[0] && (
          <Section className="onMobile">
            <ChatInfoWrapper>
              <TeamChatInfo officehours={officeHours} chatInfo={chatRoomInfo?.team} />
            </ChatInfoWrapper>
          </Section>
        )}
      </Container>
    </>
  );
};

export default ChatRoom;

const Container = styled.div`
  min-width: 100%;
  min-height: 100%;
  max-height: 100%;
  display: flex;
  gap: 12px;
  justify-content: space-around;

  @media ${({ theme }) => theme.device.tablet} {
    justify-content: space-between;
  }
  @media ${({ theme }) => theme.device.mobileL} {
    flex-direction: column;
  }
  @media ${({ theme }) => theme.device.mobileL} {
    display: block;
    padding: 0;
  }

  padding: 0 12px;
`;

const Section = styled.div`
  width: 100%;
  min-height: 100%;
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

  @media ${({ theme }) => theme.device.mobileL} {
    &.section {
      display: none;
    }
  }
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

const ChatInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ChatContainer = styled.div`
  width: 100%;
  height: 588px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  height: 46px;
  background-color: ${({ theme }) => theme.colors.purple1};
`;

const Title = styled.h1``;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover > div + .altText {
    display: block;
    opacity: 1;
    position: absolute;
    right: 2px;
    width: 5rem;
    opacity: 1;
    padding: 5px;
    border: solid #333 1px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.purple1};
  }
`;
const InviteIcon = styled.div`
  width: 30px;
  text-align: center;
  &.altText {
    opacity: 0;
    display: none;
  }
  cursor: pointer;
`;
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

const EmptyMeaageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  &.ADMIN {
    color: ${({ theme }) => theme.colors.green2};
  }
  &.COACH {
    color: orange;
  }
  &.error {
    color: tomato;
  }
`;

const UserName = styled.p`
  font-weight: 600;
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
