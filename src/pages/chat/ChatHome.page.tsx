import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// component
import ChatList from "./components/ChatList";
import UsersList from "./components/UsersList";
import SearchInput from "./components/SearchInput";

// apis
import { AxiosUser, ChatRoomUsers, UsersPageInfo } from "../../services/user";
import { AxiosChat, Chats } from "../../services/chat";

// recoil
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../recoil/UserAtom";

// utils
import { paths } from "../../utils/path";

// modal
import MiniProfileModal from "./components/MiniProfileModal";
import GroupChatStartModal from "./components/groupChats/GroupChatStartModal";

export default function ChatHome() {
  const currentUser = useRecoilValue(currentUserAtom);

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [miniProfile, setMiniProfile] = useState<UsersPageInfo>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatNameModalOpen, setChatNameModalOpen] = useState(false);

  const [userList, setUserList] = useState<ChatRoomUsers[]>([]);
  const [chatsList, setChatList] = useState<Chats[]>();

  const [searchUser, setSearchUser] = useState("");

  const [selectedUsers, setSelectedUsers] = useState<ChatRoomUsers[]>([]);

  const [_chatName, _setChatName] = useState();

  const [_chatNameInput, _setChatNameInput] = useState();
  const [isCreateGroupChatModalOpen, setIsCreateGroupChatModalOpen] = useState(false);
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

  const handleStartUsersChat = async (users: ChatRoomUsers[], chatName: string) => {
    const convertUserIds = users.map(user => user.id);

    try {
      const res = await AxiosChat.createUsersChat({ userIds: convertUserIds, chatName: chatName });
      if (res.status === 201) {
        alert(`채팅방이 생성되었습니다!`);
        fetchGetChatList();
        navigate(`${paths.CHAT_HOME}/${res.data.data.id}`);
      }
    } catch (e: any) {
      setError(e.response?.data.message);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchSearchUserList();
    }
  };

  const handleChangeSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUser(e.target.value);
  };

  const handleChangeGroupChatMembers = (chatRoomUser: ChatRoomUsers, flag: boolean) => {
    if (flag) {
      setSelectedUsers(selectedUsers.concat(chatRoomUser));
    } else {
      setSelectedUsers(selectedUsers.filter(user => user.id !== chatRoomUser.id));
    }
  };

  // const handleStartGroupChat = async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key !== "Enter") return;
  //   if (e.nativeEvent.isComposing) return;
  //   if (chatNameInput.trim() === "") return;
  //   try {
  //     const res = await AxiosChat.createUsersChat(data);
  //     console.log(res);
  //   } catch (e: any) {
  //     setError(e.response.data.message);
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
      const findUser = userList.find(user => user.id === miniProfile.id);
      if (findUser) {
        handleStartUsersChat([findUser], chatNameInput);
        setChatNameInput("");
      }
    }
  };
  const [chatNameInput, setChatNameInput] = useState("");
  const handleChageChatNameInput = (e: any) => setChatNameInput(e.target.value);

  if (!currentUser) return;

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
      <GroupChatStartModal
        currentUser={currentUser}
        userList={userList}
        groupchatMember={selectedUsers}
        onClose={() => setIsCreateGroupChatModalOpen(false)}
        isOpen={isCreateGroupChatModalOpen}
        onChangeGroupMember={handleChangeGroupChatMembers}
        onCreateGroupChat={handleStartUsersChat}
      />
      <Container>
        <Wrapper>
          <Section>
            <SearchInput
              searchUser={searchUser}
              onKeyUp={handleKeyUp}
              onChange={handleChangeSearchUser}
              onFetchSearchUserList={fetchSearchUserList}
            />
            <Button onClick={() => setIsCreateGroupChatModalOpen(true)}>그룹 채팅 시작하기</Button>

            <Error>{error}</Error>
            {currentUser && (
              <StyledUserScrollWrapper>
                <UsersList users={userList} myInfo={currentUser} onOpenMiniProfile={handleClick} />
              </StyledUserScrollWrapper>
            )}
          </Section>
          <Section>
            <StyledChatScrollWrapper>
              <ChatList chatsList={chatsList} />
            </StyledChatScrollWrapper>
          </Section>
        </Wrapper>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  @media ${({ theme }) => theme.device.mobileL} {
    flex-direction: column;
  }

  max-width: 700px;

  margin: 0 auto;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  padding-bottom: 136px;

  gap: 12px;

  box-sizing: border-box;
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

const Button = styled.div`
  color: #fff;
  background-color: ${({ theme }) => theme.colors.purple5};
  border: 1px solid ${({ theme }) => theme.colors.purple5};
  padding: 4px 12px;
  margin: 4px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.purple0};
    color: ${({ theme }) => theme.colors.purple5};
    border: 1px solid ${({ theme }) => theme.colors.purple5};
  }
`;
const StyledUserScrollWrapper = styled.div`
  height: 100%;
  width: 100%;

  overflow-y: auto;
  border: 1px solid #dbdbdb;
`;

const StyledChatScrollWrapper = styled.div`
  height: 100%;
  width: 100%;

  overflow-y: auto;
  border: 1px solid #dbdbdb;
`;
