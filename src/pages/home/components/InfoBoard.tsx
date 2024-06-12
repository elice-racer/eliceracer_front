import styled from "styled-components";
import OfficeHourWeekly from "../../../components/officehour/OfficehourWeekly";

function InfoBoard() {
  return (
    <Container>
      <ProjectInfo>
        <Wapper>
          <TitleWrapper>
            <Title>프로젝트</Title>
          </TitleWrapper>
          <InfoWrapper>
            <Text className="info">현재 등록된 오피스아워 일정이 없습니다.</Text>
          </InfoWrapper>
        </Wapper>
      </ProjectInfo>

      <OfficeHourWeekly />
    </Container>
  );
}

export default InfoBoard;

const Container = styled.div``;

const ProjectInfo = styled.div``;

const Wapper = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  background-color: ${({ theme }) => theme.colors.purple1};
`;

const Title = styled.h1`
  font-size: 1.3em;
`;

const InfoWrapper = styled.div`
  margin: 6px 0;
  width: 100%;
  height: 230px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray1};
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Text = styled.p`
  &.info {
    color: ${({ theme }) => theme.colors.gray2};
  }
`;
