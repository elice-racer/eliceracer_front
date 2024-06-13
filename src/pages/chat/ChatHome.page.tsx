import styled from "styled-components";
import ChatList from "./components/ChatList";
import UsersList from "./components/UsersList";
import { AxiosUser } from "../../servies/user";
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
  const [users, setUsers] = useState();
  const [chatsList, setChatList] = useState<Chats[]>();

  const fetchGetChatList = async () => {
    try {
      const res = await AxiosChat.getChats();
      if (res.statusCode === 200) setChatList(res.data);
    } catch (e: any) {
      console.error(e);
    }
  };

  const fetchGetUsers = async () => {
    try {
      const res = await AxiosUser.getChatUsersList();
      if (res.status === 200) setUsers(res.data.data);
    } catch (e: any) {
      console.error(e);
      setError(e.response.data.message);
    }
  };

  /** 유저 미니프로필 조회 */
  const fetchUserInfo = async (id: string) => {
    try {
      const res = await AxiosUser.getUsersPage(id);
      console.log(res.data);
      if (res.statusCode === 200) setUsetInfo(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = (e: any) => {
    console.dir(e.target.id);

    if (!e.target.id) return alert("유저 프로필을 확인할 수 없습니다.");
    fetchUserInfo(e.target.id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchGetChatList();
    fetchGetUsers();
  }, []);

  return (
    <>
      <MiniProfileModal
        isModalOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        userData={userInfo}
      />
      <Container>
        <Error>{error}</Error>
        <Section>
          <UsersList users={users} myInfo={myInfo} onClick={handleClick} />
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
