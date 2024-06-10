import { useParams } from "react-router-dom";
import { AxiosAdmin, CreateChat, ProjectInfo, TeamsInfo } from "../../servies/admin";
import { useEffect, useState } from "react";
import styled from "styled-components";

// 프로젝트 조회해서 내용 넣기
function AdminProjectDetail() {
  const { id } = useParams();

  const [project, setProject] = useState<ProjectInfo>();

  const [teams, setTeams] = useState<TeamsInfo[]>();

  const [createTeamChat, setCreateTeamChat] = useState<CreateChat>({ teamId: "" });
  const fetchGetProject = async () => {
    try {
      const res = await AxiosAdmin.getProject(id);
      console.log(res);
      if (res.statusCode === 200) setProject(res.data);
    } catch (e) {
      console.error(e);
    }
  };
  const fetchGetProjectsTeams = async () => {
    try {
      const res = await AxiosAdmin.getProjectDetail(id);
      console.log(res);
      if (res.statusCode === 200) {
        setTeams(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCreateChatRoom = async (e: any) => {
    setCreateTeamChat(e.target.id);

    try {
      const res = await AxiosAdmin.createTeamChat(createTeamChat);
      console.log("==========채팅방생성-------");
      console.log(res);
      console.log("==========채팅방생성-------");
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
                <Text>
                  {team.teamNumber}팀{team.id}
                </Text>
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
