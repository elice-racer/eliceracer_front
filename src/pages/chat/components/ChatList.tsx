import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { paths } from "../../../utils/path";
import { Chats } from "../../../services/chat";
import EmptyImage from "../../../components/commons/EmptyImage";

interface ChatsListProps {
  chatsList: Chats[] | undefined;
  error?: string;
}

function ChatList({ chatsList, error }: ChatsListProps) {
  const navigate = useNavigate();

  return (
    <Container>
      <Flex>
        <TitleWrapper>
          <Title>채팅 목록</Title>
        </TitleWrapper>
        <ChatListWrapper>
          {error && <EmptyImage message={error} />}
          {chatsList ? (
            chatsList?.map(chat => (
              <ChatItem key={chat.id} onClick={() => navigate(`${paths.CHAT_HOME}/${chat.id}`)}>
                <Text>{chat.chatName}</Text>
                <Text>👥 {chat.users}</Text>
              </ChatItem>
            ))
          ) : (
            <Text>생성된 채팅방이 없습니다.</Text>
          )}
        </ChatListWrapper>
      </Flex>
    </Container>
  );
}

export default ChatList;

const Container = styled.div`
  width: 100%;
  min-height: 100%;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 2px 6px;
`;

const ChatListWrapper = styled.div`
  position: relative;
  gap: 4px;
  flex-wrap: wrap;
  overflow-y: auto;
  height: 450px;
`;

const ChatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 12px;
  height: 46px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray1};

  transition: 0.3s all ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.purple1};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h1`
  font-size: 1.4rem;
`;

const Text = styled.p``;
