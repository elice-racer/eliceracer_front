import styled from "styled-components";
import ChatList from "./components/ChatList";
import UsersList from "./components/UsersList";
import { AxiosUser, UsersInfo } from "../../servies/user";
import { useEffect, useState } from "react";

function ChatHome() {
  const [error, setError] = useState("");
  const [myInfo, setMyInfo] = useState<UsersInfo | undefined>();
  const [users, setUsers] = useState();

  const fetchMyInfo = async () => {
    try {
      const res = await AxiosUser.getMyInfo();
      if (res.statusCode === 200) {
        setMyInfo(res.data);
      }
    } catch (e) {
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
    fetchGetUsers();
    fetchMyInfo();
  }, []);
  return (
    <Container>
      <Error>{error}</Error>
      <Section>
        <UsersList users={users} myInfo={myInfo} />
      </Section>
      <Section>
        <ChatList />
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
