import styled from "styled-components";
import ChatList from "./components/ChatList";
import UsersList from "./components/UsersList";
import { AxiosUser, ChatRoomUsers } from "../../servies/user";
import { useEffect, useState } from "react";
import { AxiosChat, Chats } from "../../servies/chat";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../recoil/UserAtom";
import MiniProfileModal from "./components/MiniProfileModal";

function ChatHome() {
  const myInfo = useRecoilValue(currentUserAtom);
  const [userInfo, setUsetInfo] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<ChatRoomUsers[]>();
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
      console.error(e);
    }
  };

  /** current user 친구 목록 */
  const fetchGetUsers = async () => {
    try {
      const res = await AxiosUser.getChatUsersList();
      if (res.statusCode === 200) setUsers(res.data);
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  /** 유저 미니프로필 조회 */
  const fetchUserInfo = async (id: string) => {
    try {
      const res = await AxiosUser.getUsersPage(id);
      if (res.statusCode === 200) setUsetInfo(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = (e: any) => {
    if (!e) return alert("유저 프로필을 확인할 수 없습니다.");
    fetchUserInfo(e);
    setIsModalOpen(true);
  };

  /** 생성할 채팅방의 유저를 선택 */
  // const handleSelectedchatUsers = (e: any) => {
  //   const newUsers = e.target.id;
  //   setSelectedUsers(users => [...users, newUsers]);
  // };

  const handleStartUsersChat = async (e: any) => {
    try {
      const userId = e.target.id;
      const chatName = e.target.innerText;

      const res = await AxiosChat.createUsersChat({ userIds: [userId], chatName: chatName });

      if (res.status === 201) {
        alert(`채팅방이 생성되었습니다! 채팅 목록에서 생성된 채팅방을 확인하세요!`);
        fetchGetChatList();
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
        userdata={userInfo}
        onClick={handleStartUsersChat}
      />
      <Container>
        <Section>
          <SelectedUsers></SelectedUsers>
          <Error>{error}</Error>
          {users && <UsersList users={users} myInfo={myInfo} onOpenMiniProfile={handleClick} />}
        </Section>
        <Section>
          <ChatList chatsList={chatsList} />
        </Section>
      </Container>
    </>
  );
}

export default ChatHome;

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
