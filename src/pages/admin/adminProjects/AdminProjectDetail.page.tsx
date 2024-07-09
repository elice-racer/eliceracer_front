import { useNavigate, useParams } from "react-router-dom";
import { AxiosAdmin, TeamsInfo } from "../../../services/admin";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { AxiosProject, ProjectInfo } from "../../../services/projects";
import { paths } from "../../../utils/path";

// 프로젝트 조회해서 내용 넣기
// todo 프로젝트 조회시 track 카테고리 업데이트되면 track 정보 추가하기
function AdminProjectDetail() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectInfo>();

  const [teams, setTeams] = useState<TeamsInfo[]>();

  const fetchGetProject = async () => {
    try {
      const res = await AxiosProject.getProjectId(id);
      if (res.statusCode === 200) setProject(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  /** 해당 프로젝트 팀 조회 */
  const fetchGetProjectsTeams = async () => {
    try {
      const res = await AxiosAdmin.getProjectDetail(id);
      if (res.statusCode === 200) {
        setTeams(res.data);
      }
    } catch (e: any) {
      console.error(e);

      if (e.response.statue === 409) {
        console.log("이미 존재하는 팀 채팅방입니다.");
        return;
      }
    }
  };

  /** 채팅방 생성 */
  const fetchCreateChatRoom = async (e: any) => {
    const teamId = e.target.id;
    try {
      const res = await AxiosAdmin.createTeamChat({ teamId });
      if (res.statusCode === 200) return alert(`${res.data.chatName} 채팅이 생성되었습니다!`);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchGetProjectsTeams();
    fetchGetProject();
  }, []);

  if (!project) return;

  return (
    <Container>
      <FlexWrapper>
        <TitleWrapper>
          <TitleTextWrapper>
            <TrackText id={project.track.id} onClick={() => navigate(`${paths.TRACKS_SETTINGS}/${project.track.id}`)}>
              {project.track.trackName}
              {project.track.cardinalNo}
            </TrackText>
            <Text>{project.round}차</Text>
            <Text>{project.projectName}</Text>
          </TitleTextWrapper>
          <OptionWrapper>
            <OptionButton>프로젝트 일정 수정</OptionButton>
            <OptionButton className="tomato">프로젝트 삭제</OptionButton>
          </OptionWrapper>
        </TitleWrapper>
        <ProjectInfoWrapper>
          <TextFlexWrapper>
            <SubText>프로젝트 진행 기간</SubText>
            <Text>
              {project.startDate.slice(0, 10)}~{project.endDate.slice(0, 10)}
            </Text>
          </TextFlexWrapper>
          <TextFlexWrapper>
            <SubText>담당 코치</SubText>
            <Text>project.coachList</Text>
          </TextFlexWrapper>
          <TextFlexWrapper>
            <SubText>프로젝트 이름</SubText>
            <Text>{project.projectName}</Text>
          </TextFlexWrapper>
          <TextFlexWrapper>
            <SubText>프로젝트 한줄 설명</SubText>
            <Text>예시 : 공공 데이터를 활용한 인공지능 웹 서비스 프로젝트</Text>
          </TextFlexWrapper>
          <TextFlexWrapper>
            <SubText>회차</SubText>
            <Text>{project.round}</Text>
          </TextFlexWrapper>
          <TextFlexWrapper>
            <SubText>프로젝트 안내 노션</SubText>
            <Text>{project.projectName}</Text>
          </TextFlexWrapper>
          <TextFlexWrapper>
            <SubText>프로젝트 git url</SubText>
            <Text>{project.round}</Text>
          </TextFlexWrapper>
        </ProjectInfoWrapper>

        <TeamsListWrapper>
          <SubText>프로젝트 팀</SubText>
          <Text className="info">채팅방이 생성되지 않은 팀일 경우, 채팅방 생성 버튼을 통해 채팅방을 생성하실 수 있습니다!</Text>
          {teams?.map((team, _idx) => (
            <TeamWrapper key={team.id}>
              {/* todo teamId로 chatId 조회 */}
              <TeamTextWrapper onClick={() => navigate(`${paths.ADMIN_SETTINS_TEAMS}/${team.id}`)}>
                {team.teamName ? (
                  <Text>
                    {team.teamNumber}팀 {team.teamName}
                  </Text>
                ) : (
                  <Text>{team.teamNumber}팀 </Text>
                )}
              </TeamTextWrapper>
              {team.id ? (
                <CreateChatBtn onClick={() => navigate(team.id)} id={team.id}>
                  팀 채팅방 바로가기
                </CreateChatBtn>
              ) : (
                <CreateChatBtn onClick={fetchCreateChatRoom} id={team.id}>
                  채팅방 생성
                </CreateChatBtn>
              )}
            </TeamWrapper>
          ))}
        </TeamsListWrapper>

        <SubText>오피스아워 스케줄</SubText>
      </FlexWrapper>
    </Container>
  );
}

export default AdminProjectDetail;

const Text = styled.p`
  &.info {
    color: #616161;
  }
`;

const Container = styled.div`
  width: 100%;
`;

const FlexWrapper = styled.div`
  width: 100%;

  padding: 0 30px;
  display: flex;

  flex-direction: column;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  font-weight: bold;
  font-size: 1.4rem;

  padding: 0 0 12px 0;
  border-bottom: 3px solid ${({ theme }) => theme.colors.purple1};
`;

const TitleTextWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const OptionWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const OptionButton = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.purple2};
  border-radius: 6px;
  padding: 2px 6px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.purple2};
    color: white;
    transition: 0.1s;
  }
  &.tomato {
    border: 2px solid ${({ theme }) => theme.colors.tomato};
    &:hover {
      background-color: ${({ theme }) => theme.colors.tomato};
      color: white;
      transition: 0.1s;
    }
  }
`;

const ProjectInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 16px 0;
`;

const SubText = styled.div`
  width: 120px;
  font-weight: 600;
`;

const TextFlexWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const TrackText = styled.div`
  background-color: ${({ theme }) => theme.colors.purple1};
  padding: 2px 4px;
  border-radius: 2px;
  cursor: pointer;
`;

const TeamsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const TeamWrapper = styled.div`
  height: 30px;
  padding: 12px 4px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const TeamTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.purple2};
    font-weight: 600;
  }
`;

const CreateChatBtn = styled.div`
  height: 26px;
  padding: 2px 4px;
  background-color: ${({ theme }) => theme.colors.purple0};
  border-radius: 4px;
  cursor: pointer;
`;
