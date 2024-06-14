import styled from "styled-components";
import { ProjectInfo } from "../../../servies/projects";
interface UrlDashboardProps {
  projectUrls: ProjectInfo[];
}

function UrlDashboard({ projectUrls }: UrlDashboardProps) {
  return (
    <Container>
      <UrlDashboardWrapper>
        <Wapper>
          <TitleWrapper>
            <Title>바로 가기 📎</Title>
          </TitleWrapper>
          <DataWrapper>
            <ProjectListWrapper>
              {projectUrls ? (
                projectUrls.map(project => (
                  // 클릭하면 해당 프로젝트 노션으로 이동할 수 있게!
                  <ProjectWrapper key={project.id} onClick={() => {}}>
                    <NameWrapper>
                      <Text className="track">
                        {project.track.trackName}
                        {project.track.cardinalNo}
                      </Text>
                      <Text>{project.round}차</Text>
                      <Text>{project.projectName}</Text>
                    </NameWrapper>
                    <DateWrapper>
                      <Text className="info">진행 기간</Text>
                      <Text>
                        {project.startDate.split("T")[0]} ~ {project.endDate.split("T")[0]}
                      </Text>
                    </DateWrapper>
                  </ProjectWrapper>
                ))
              ) : (
                <Text className="info">현재 등록된 프로젝트 일정이 없습니다.</Text>
              )}
            </ProjectListWrapper>
          </DataWrapper>
        </Wapper>
      </UrlDashboardWrapper>
    </Container>
  );
}

export default UrlDashboard;

const Container = styled.div`
  width: 100%;
  margin-bottom: 12px;
`;

const UrlDashboardWrapper = styled.div``;

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
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h1`
  font-size: 1.3em;
`;

const ProjectListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DataWrapper = styled.div`
  margin: 6px 0;
  width: 100%;
  height: 158px;
  display: flex;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.gray1};
`;

const ProjectWrapper = styled.div`
  width: 100%;
  height: 50px;
  background-color: #fff;
  padding: 0 8px;
  cursor: pointer;
  &:hover {
    background-color: #e9e2f32c;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 4px;
`;

const NameWrapper = styled.div`
  display: flex;
  gap: 4px;
`;
const Text = styled.p`
  &.track {
    color: ${({ theme }) => theme.colors.purple3};
  }
  &.info {
    color: ${({ theme }) => theme.colors.gray2};
  }
`;
