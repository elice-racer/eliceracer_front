import styled from "styled-components";
import ChatList from "./components/ChatList";
import UsersList from "./components/UsersList";
import { AxiosUser, ChatRoomUsers } from "../../services/user";
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
  const [miniProfile, setMiniProfile] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [userList, setUserList] = useState<ChatRoomUsers[]>([]);
  const [chatsList, setChatList] = useState<Chats[]>();

  const [_selectedUsers, _setSelectedUsers] = useState<string[]>([]);

  const [_chatName, _setChatName] = useState();

  const [_chatNameInput, _setChatNameInput] = useState();

  /** 채팅 리스트 가져오기 */
  const fetchGetChatList = async () => {
    try {
      const res = await AxiosChat.getChats();
      if (res.statusCode === 200) setChatList(res.data);
    } catch (e: any) {
      console.log("fetch Get ChatList Error!!");
      console.error(e);
    }
  };

  /** current user 친구 목록 */
  const fetchGetUsers = async () => {
    try {
      const res = await AxiosUser.getChatUsersList();
      if (res.statusCode === 200) setUserList(res.data || []);
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  /** 유저 미니프로필 조회 */
  const fetchMiniProfile = async (id: string) => {
    try {
      const res = await AxiosUser.getUsersPage(id);
      if (res.statusCode === 200) setMiniProfile(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = (e: any) => {
    if (!e) return alert("유저 프로필을 확인할 수 없습니다.");
    fetchMiniProfile(e);
    setIsModalOpen(true);
  };

  /** 생성할 채팅방의 유저를 선택 */
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
    } catch (e) {
      console.log(e);
    }
  };

  // const handleStartGroupChat = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key !== "Enter") return;

  //   if (e.nativeEvent.isComposing) return;

  //   if (_chatNameInput.trim() === "") return;
  //   try {
  //     const res = await AxiosChat.createChat({e.target.id})
  //   } catch (e) {
  //     console.dir(e);
  //   }
  // };

  useEffect(() => {
    fetchGetChatList();
    fetchGetUsers();
  }, []);

  useEffect(() => {}, [chatsList]);

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
