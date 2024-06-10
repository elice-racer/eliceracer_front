import styled from "styled-components";

function TeamChatInfo() {
  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>오피스아워 일정</Title>
        </TitleWrapper>
      </Wrapper>
    </Container>
  );
}

export default TeamChatInfo;

const Container = styled.div`
  height: 250px;
`;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: 12px;
  height: 240px;
`;

const TitleWrapper = styled.div`
  height: 42px;
  padding: 12px 12px 0 12px;
  margin: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.blue2};
`;
const Title = styled.h1``;
