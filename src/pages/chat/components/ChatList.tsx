import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { paths } from "../../../utils/path";
import { Chats } from "../../../servies/chat";

interface ChatsListProps {
  chatsList: Chats[] | undefined;
  error?: string;
}

function ChatList({ chatsList, error }: ChatsListProps) {
  const navigate = useNavigate();
  // 유저를 눌렀을 때 채팅방 생성되게

  return (
    <Container>
      <Flex>
        <TitleWrapper>
          <Title>채팅 목록</Title>
        </TitleWrapper>
        <ChatListWrapper>
          {error && <Text>{error}</Text>}
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

const ChatListWrapper = styled.div``;

const ChatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 12px;
  height: 46px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray1};
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h1`
  font-size: 1.4rem;
`;

const Text = styled.p``;
