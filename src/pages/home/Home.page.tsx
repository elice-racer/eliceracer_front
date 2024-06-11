import styled from "styled-components";
// import ChatList from "../chat/components/ChatList";
// import UsersList from "../chat/components/UsersList";
import { paths } from "../../utils/path";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <Container>
      <Section>
        <Button onClick={() => navigate(paths.CHAT_HOME)}>채팅홈 바로가기</Button>
        {/* <UsersList /> */}
      </Section>
      <Section>{/* <ChatList chatsList={chatsList} /> */}</Section>
      <Section></Section>
    </Container>
  );
}

export default Home;

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

const Button = styled.div`
  text-align: center;
  width: 160px;
  background-color: ${({ theme }) => theme.colors.purple1};
  padding: 3px 5px;
  border-radius: 8px;
`;
