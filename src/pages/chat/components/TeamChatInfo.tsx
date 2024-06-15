import styled from "styled-components";
import EmptyImage from "../../../components/commons/EmptyImage";
import TeamChatOfficehour from "./TeamChatOfficehour";

interface TeamChatInfoProps {
  officehours: any;
}
function TeamChatInfo({ officehours }: TeamChatInfoProps) {
  return (
    <Container>
      <Wrapper>
        <>
          <TitleWrapper>
            <Title>오피스아워 일정</Title>
          </TitleWrapper>
          <DataWrapper>
            {officehours ? <TeamChatOfficehour officehours={officehours} /> : <EmptyImage message="현재 등록된 오피스아워 일정이 없습니다." />}
          </DataWrapper>
        </>
        <TitleWrapper>
          <Title>팀 노션 페이지</Title>
        </TitleWrapper>
        <DataWrapper>{officehours ? "" : <p>등록된 노션 페이지가 없습니다.</p>}</DataWrapper>

        <TitleWrapper>
          <Title>프로젝트 깃랩</Title>
        </TitleWrapper>
        <DataWrapper>{officehours ? "" : <p>등록된 프로젝트 깃랩이 없습니다.</p>}</DataWrapper>
      </Wrapper>
    </Container>
  );
}

export default TeamChatInfo;

const Container = styled.div``;

const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray1};
  border-radius: 6px;
  padding: 4px 0;
`;

const TitleWrapper = styled.div`
  height: 42px;
  padding: 12px 12px 0 12px;
  margin: 0 16px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray2};
`;

const DataWrapper = styled.div`
  margin: 6px 0;
  width: 100%;

  display: flex;
  justify-content: center;
  min-height: 48px;
`;

const Title = styled.h1``;
