import styled from "styled-components";
import ChatList from "./components/ChatList";
import UsersList from "./components/UsersList";
import { AxiosUser, ChatRoomUsers, UsersPageInfo } from "../../services/user";
import { useEffect, useState } from "react";
import { AxiosChat, Chats } from "../../services/chat";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../recoil/UserAtom";
import MiniProfileModal from "./components/MiniProfileModal";
import { paths } from "../../utils/path";
import { useNavigate } from "react-router-dom";

export default function ChatHome() {
  const user = useRecoilValue(currentUserAtom);

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [miniProfile, setMiniProfile] = useState<UsersPageInfo>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatNameModalOpen, setChatNameModalOpen] = useState(false);

  const [userList, setUserList] = useState<ChatRoomUsers[]>([]);
  const [chatsList, setChatList] = useState<Chats[]>();

  const [searchUser, setSearchUser] = useState("");

  const [_selectedUsers, _setSelectedUsers] = useState<string[]>([]);

  const [_chatName, _setChatName] = useState();

  const [_chatNameInput, _setChatNameInput] = useState();

  /** 채팅 리스트 가져오기 */
  const fetchGetChatList = async () => {
    try {
      const res = await AxiosChat.getChats();
      if (res.statusCode === 200) setChatList(res.data);
    } catch (e: any) {
      setError(e.response?.data.message);
    }
  };

  /** current user 친구 목록 */
  const fetchGetUsers = async () => {
    try {
      const res = await AxiosUser.getChatUsersList();
      if (res.statusCode === 200) setUserList(res.data || []);
    } catch (e: any) {
      setError(e.response.data.message);
      if (e.response.status === 404) {
        try {
          fetchSearchUserList();
        } catch (e: any) {
          setError(e.response?.data.message);
        }
      }
    }
  };

  /** 유저 미니프로필 조회 */
  const fetchMiniProfile = async (id: string) => {
    try {
      const res = await AxiosUser.getUsersPage(id);
      if (res.statusCode === 200) setMiniProfile(res.data);
    } catch (e: any) {
      setError(e.response?.data.message);
    }
  };

  /** 프로필 열기 */
  const handleClick = (e: any) => {
    if (!e) return alert("유저 프로필을 확인할 수 없습니다.");
    fetchMiniProfile(e);
    setIsModalOpen(true);
  };

  /** 멤버 검색 */
  const fetchSearchUserList = async () => {
    try {
      const res = await AxiosUser.getSearchUser(searchUser);

      if (res.status === 200) {
        setUserList(res.data.data);
      }
    } catch (e: any) {
      setError(e.response?.data.message);
    }
  };

  /** 그룹채팅 시 초대할 채팅방의 유저를 선택 */
  // const handleSelectedchatUsers = (e: any) => {
  //   const newUsers = e.target.id;
  //   setSelectedUsers(users => [...users, newUsers]);
  // };

  const handleStartUsersChat = async (userId: string, chatName: string) => {
    try {
      const res = await AxiosChat.createUsersChat({ userIds: [userId], chatName: chatName });
      if (res.status === 201) {
        alert(`채팅방이 생성되었습니다!`);
        fetchGetChatList();
        navigate(`${paths.CHAT_HOME}/${res.data.data.id}`);
      }
    } catch (e: any) {
      setError(e.response?.data.message);
    }
  };

  // const handleStartGroupChat = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key !== "Enter") return;

  //   if (e.nativeEvent.isComposing) return;

  //   if (_chatNameInput.trim() === "") return;
  //   try {
  //     const res = await AxiosChat.createChat({e.target.id})
  //   } catch (e) {
  //      setError(e.response.data.message);
  //   }
  // };

  useEffect(() => {
    fetchGetChatList();
    fetchGetUsers();
  }, []);

  useEffect(() => {}, [chatsList]);
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
  const [chatNameInput, setChatNameInput] = useState("");
  const handleChageChatNameInput = (e: any) => setChatNameInput(e.target.value);
  return (
    <>
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
          <SearchWrapper>
            <Input
              type="text"
              placeholder="유저를 검색해주세요"
              value={searchUser}
              onChange={e => setSearchUser(e.target.value)}
              onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  fetchSearchUserList();
                }
              }}
            />
          </SearchWrapper>
          <SearchIcon onClick={fetchSearchUserList}>🔎</SearchIcon>
          <SelectedUsers></SelectedUsers>
          <Error>{error}</Error>
          <UsersList users={userList} myInfo={user} onOpenMiniProfile={handleClick} />
        </Section>
        <Section>
          <ChatList chatsList={chatsList} />
        </Section>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  @media ${({ theme }) => theme.device.mobileL} {
    flex-direction: column;
  }

  margin-top: 60px;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Error = styled.p`
  color: tomato;
`;

const SelectedUsers = styled.div`
  width: 100%;
`;

const SearchWrapper = styled.div`
  width: 100%;
  padding: 12px;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray1};
  height: 36px;
`;

const SearchIcon = styled.p`
  position: absolute;
  top: 50%;
  right: 12px;

  transform: translateY(-50%);
  font-size: 14px;

  cursor: pointer;
`;
