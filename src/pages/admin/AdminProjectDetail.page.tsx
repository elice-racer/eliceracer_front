import { useParams } from "react-router-dom";
import { AxiosAdmin, TeamsInfo } from "../../services/admin";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ProjectInfo } from "../../services/projects";

// 프로젝트 조회해서 내용 넣기
// todo 프로젝트 조회시 track 카테고리 업데이트되면 track 정보 추가하기
function AdminProjectDetail() {
  const { id } = useParams();

  const [project, setProject] = useState<ProjectInfo>();

  const [teams, setTeams] = useState<TeamsInfo[]>();

  const fetchGetProject = async () => {
    try {
      const res = await AxiosAdmin.getProject(id);
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

  return (
    <Container>
      <Flex>
        <TitleWrapper>
          <Text>{project?.round}차</Text>
          <Text>{project?.projectName}</Text>
        </TitleWrapper>
        <TeamsListWrapper>
          {teams?.map((team, _idx) => (
            <TeamWrapper key={team.id}>
              {team.teamName ? (
                <Text>
                  {team.teamNumber}팀 {team.teamName}
                </Text>
              ) : (
                <Text>{team.teamNumber}팀 </Text>
              )}
              <CreateChatBtn onClick={fetchCreateChatRoom} id={team.id}>
                채팅방 생성
              </CreateChatBtn>
            </TeamWrapper>
          ))}
        </TeamsListWrapper>
      </Flex>
    </Container>
  );
}

export default AdminProjectDetail;

const Text = styled.p``;

const Container = styled.div`
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 4px;

  font-weight: bold;
  font-size: 1.4rem;
`;

const TeamsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const TeamWrapper = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const CreateChatBtn = styled.div`
  height: 26px;
  padding: 2px 4px;
  background-color: ${({ theme }) => theme.colors.purple0};
  border-radius: 4px;
  cursor: pointer;
`;
