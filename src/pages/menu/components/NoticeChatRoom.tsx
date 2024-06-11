import styled from "styled-components";

const CHAT_ROOM_DATA = {
  roomId: 1,
  roomname: "Notice",
  Member: 6,
};

const MESSAGE = [
  {
    id: 1,
    userTrack: "AI8",
    realName: "진채영",
    message: "엘리스 공지!! 만족도 조사~~",
  },
  {
    id: 1,
    userTrack: "AI8",
    realName: "진채영",
    message: "엘리스 공지!! 만족도 조사~~",
  },
  {
    id: 1,
    userTrack: "AI8",
    realName: "진채영",
    message: "엘리스 공지!! 만족도 조사~~",
  },
];

// 시간순으로 채팅 출력??
function NoticeChatRoom() {
  return (
    <Container id={String(CHAT_ROOM_DATA.roomId)}>
      <Header>
        <SubTitle>⬅️</SubTitle>
        <Title>{CHAT_ROOM_DATA.roomname}</Title>
        <SubTitle>🧑‍💻</SubTitle>
      </Header>
      <Body>
        {MESSAGE.map(message => {
          return (
            <ChatItem>
              <NameWrapper>
                <Text className="track">{message.userTrack}</Text>
                <Text className="user">{message.realName}</Text>
              </NameWrapper>
              <Text>{message.message}</Text>
            </ChatItem>
          );
        })}
      </Body>
      <FooterTypingBar>
        <OptionBar></OptionBar>
        <TypingBar></TypingBar>
      </FooterTypingBar>
    </Container>
  );
}

export default NoticeChatRoom;

const Container = styled.div`
  width: 420px;
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 46px;
  background-color: ${({ theme }) => theme.colors.purple1};
`;

const Title = styled.h1``;

const SubTitle = styled.h2``;

const Body = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background-color: ${({ theme }) => theme.colors.gray1};
  height: 530px;
  padding: 20px;
`;
// 남은 영역 차지하게 하는 css가 뭐지?

const ChatItem = styled.div`
  margin-top: 10px;
  padding: 6px;
  border-radius: 16px;
  background-color: white;
  width: 100%;
`;

const NameWrapper = styled.div`
  display: flex;
  gap: 2px;
`;
const Text = styled.p`
  &.user {
    color: blue;
    font-weight: 600;
  }
  &.track {
    color: green;
    font-weight: 600;
  }
`;

const FooterTypingBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  height: 180px;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.purple1};
`;

const OptionBar = styled.div`
  height: 54px;
  width: 400px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.purple2};
`;
const TypingBar = styled.div`
  height: 88px;
  width: 400px;
  border-radius: 6px;
  background-color: #fff;
`;
