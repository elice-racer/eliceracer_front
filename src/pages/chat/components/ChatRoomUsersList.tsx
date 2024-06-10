import styled from "styled-components";

function ChatRoomUsersList() {
  return (
    <Container>
      <TitleWrapper>
        <Title>참여 인원</Title>
      </TitleWrapper>
    </Container>
  );
}

export default ChatRoomUsersList;

const Container = styled.div``;

const TitleWrapper = styled.div`
  padding: 2px 12px;
  align-items: center;
  width: 500px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  border: red solid 1px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.gray2};
`;
