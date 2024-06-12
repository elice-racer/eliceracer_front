import styled from "styled-components";
import ChatList from "./components/ChatList";
import UsersList from "./components/UsersList";
import { AxiosUser } from "../../servies/user";
import { useEffect, useState } from "react";
import { AxiosChat, Chats } from "../../servies/chat";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../recoil/UserAtom";

function ChatHome() {
  const myInfo = useRecoilValue(currentUserAtom);

  const [error, setError] = useState("");
  const [users, setUsers] = useState();
  const [chatsList, setChatList] = useState<Chats[]>();

  const fetchGetChatList = async () => {
    try {
      const res = await AxiosChat.getChats();
      console.log(res);
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

  useEffect(() => {
    fetchGetChatList();
    fetchGetUsers();
  }, []);

  return (
    <Container>
      <Error>{error}</Error>
      <Section>
        <UsersList users={users} myInfo={myInfo} />
      </Section>
      <Section>
        <ChatList chatsList={chatsList} />
      </Section>
      <Section></Section>
    </Container>
  );
}

export default ChatHome;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Error = styled.p`
  color: tomato;
`;
