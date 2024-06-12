import styled from "styled-components";

interface TeamChatInfoProps {
  officehours?: any;
}
function TeamChatInfo({ officehours }: TeamChatInfoProps) {
  return (
    <Container>
      <Wrapper>
        <>
          <TitleWrapper>
            <Title>오피스아워 일정</Title>
          </TitleWrapper>
          <DataWrapper>{officehours ? "" : <Text className="info">현재 등록된 오피스아워 일정이 없습니다.</Text>}</DataWrapper>
        </>
        <TitleWrapper>
          <Title>팀 노션 페이지</Title>
        </TitleWrapper>
        <DataWrapper>{officehours ? "" : <Text className="info">현재 등록된 오피스아워 일정이 없습니다.</Text>}</DataWrapper>

        <TitleWrapper>
          <Title>프로젝트 깃랩</Title>
        </TitleWrapper>
        <DataWrapper>{officehours ? "" : <Text className="info">현재 등록된 오피스아워 일정이 없습니다.</Text>}</DataWrapper>
      </Wrapper>
    </Container>
  );
}

export default TeamChatInfo;

const Container = styled.div``;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: 6px;
  padding: 4px 0;
`;

const TitleWrapper = styled.div`
  height: 42px;
  padding: 12px 12px 0 12px;
  margin: 0 16px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.blue2};
`;

const DataWrapper = styled.div`
  margin: 6px 0;
  width: 100%;

  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray1};
`;

const Title = styled.h1``;

const Text = styled.p`
  &.info {
    color: ${({ theme }) => theme.colors.gray2};
  }
`;
