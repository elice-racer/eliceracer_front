import styled from "styled-components";
import { ChatInfo, ChatMessage } from "../../../services/chat";

interface NoticeChatProps {
  chatRoomInfo?: ChatInfo;
  messages?: ChatMessage[];
  chatContainerRef?: any;
}

function NoticeChatRoom({ chatRoomInfo, messages, chatContainerRef }: NoticeChatProps) {
  return (
    <ChatContainer id={String(chatRoomInfo?.id)}>
      <Header>
        <Title>{chatRoomInfo?.chatName}</Title>
      </Header>
      <Body ref={chatContainerRef}>
        <MessagesWrapper>
          {messages ? (
            messages.map(message => {
              return (
                <Flex key={message.id}>
                  <Wrapper>
                    <NameWrapper>
                      <Text className="track">
                        [{message.user.track.trackName}
                        {message.user.track.cardinalNo}]
                      </Text>
                      <UserName className={message.user.role}>{message.user.realName}</UserName>
                    </NameWrapper>
                    <>
                      <ChatItem>
                        <Text>{message.content}</Text>
                      </ChatItem>
                    </>
                    <DateWapper>
                      <Text className="date">{message.createdAt.split("T")[1].split(".")[0]}</Text>
                    </DateWapper>
                  </Wrapper>
                </Flex>
              );
            })
          ) : (
            <Text>활성화된 공지채널이 없습니다.</Text>
          )}
        </MessagesWrapper>
      </Body>
    </ChatContainer>
  );
}

export default NoticeChatRoom;

const ChatContainer = styled.div`
  width: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  height: 46px;
  background-color: ${({ theme }) => theme.colors.purple1};
`;

const Title = styled.h1``;

const Body = styled.div`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.gray1};
  height: 100%;
  flex-wrap: wrap;
  overflow-y: auto;
`;
const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
`;
const ChatItem = styled.div`
  width: auto;
  margin-top: 2px;
  padding: 6px;
  border-radius: 0 8px 8px 8px;
  background-color: white;
  &.me {
    border-radius: 8px 8px 0px 8px;
  }
`;

const DateWapper = styled.div`
  display: flex;
  justify-content: end;
  &.me {
    justify-content: start;
    margin-left: 4px;
  }
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  &.me {
    justify-content: end;
  }
`;
const Wrapper = styled.div`
  width: 86%;
  margin: 2px;
`;
const NameWrapper = styled.div`
  display: flex;
  gap: 2px;
  &.me {
    justify-content: end;
  }
`;

const Text = styled.p`
  &.track {
    color: ${({ theme }) => theme.colors.purple2};
    font-weight: 600;
  }
  &.date {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.gray2};
  }
`;

const UserName = styled.p`
  font-weight: 600;
  &.RACER {
  }
  &.ADMIN {
    color: ${({ theme }) => theme.colors.green2};
  }
  &.COACH {
    color: ${({ theme }) => theme.colors.blue2};
  }
`;
