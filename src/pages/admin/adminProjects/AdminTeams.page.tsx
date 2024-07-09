import { useNavigate, useParams } from "react-router-dom";
import { AxiosProject, TeamInfo } from "../../../services/projects";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { paths } from "../../../utils/path";

/**관리자 팀 상세 조회 페이지 */
function AdminTeams() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [team, setTeam] = useState<TeamInfo>();

  const fetchGetTeamInfo = async () => {
    try {
      const res = await AxiosProject.getTeamInfo(id);
      console.log(res);
      if (res.statusCode === 200) setTeam(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchGetTeamInfo();
  }, []);

  if (!id)
    return (
      <Container>
        <Flex>존재하지 않는 팀입니다.</Flex>
      </Container>
    );

  if (!team)
    return (
      <Container>
        <Flex>해당 팀의 정보가 존재하지 않습니다.</Flex>
      </Container>
    );

  return (
    <Container>
      <Flex>
        <TitleWrapper>
          <TitleTextWrapper>
            {team.track ? (
              <Title>
                {`${team.track?.trackName} 
              ${team.track?.cardinalNo} (${team.round}차 프로젝트)`}{" "}
              </Title>
            ) : (
              <Text className="info">트랙 정보가 없습니다.</Text>
            )}
            {team.teamName ? (
              <Title>
                {team.teamNumber}팀 {team.teamName}
              </Title>
            ) : (
              <Text className="info"> {team.teamNumber}팀 이름이 존재하지않습니다.</Text>
            )}
          </TitleTextWrapper>
          <OptionWrapper>
            <OptionButton>팀 정보 수정</OptionButton>
            <OptionButton className="tomato">팀 삭제</OptionButton>
          </OptionWrapper>
        </TitleWrapper>
        <ProjectInfoWrapper>
          <TextFlexWrapper>
            <SubText>프로젝트 진행 기간</SubText>
            <Text>{team.startDate ? "${team.startDate?.slice(0, 10)}~${team.endDate?.slice(0, 10)}" : "등록된 일정이 없는 프로젝트입니다."}</Text>
          </TextFlexWrapper>
          <TextFlexWrapper>
            <SubText>담당 코치</SubText>
            <NameTagWrapper>
              {team.coachList
                ? team.coachList.map(user => (
                    <NameTag key={id} onClick={() => navigate(user.id)}>
                      <p>{user.realName}</p>
                    </NameTag>
                  ))
                : "등록된 프로젝트 코치가 없습니다."}
            </NameTagWrapper>
          </TextFlexWrapper>

          <TextFlexWrapper>
            <SubText>팀 노션</SubText>
            <Text>{team.notion}</Text>
          </TextFlexWrapper>
          <TextFlexWrapper>
            <SubText>팀 git url</SubText>
            <Text>{team.gitlab}</Text>
          </TextFlexWrapper>

          <Button onClick={() => navigate(`${paths.ADMIN_SETTINGS_CHAT}/${team.chatId}`)}>팀 채팅방 바로가기 💬</Button>
        </ProjectInfoWrapper>
        <TextFlexWrapper>
          <SubText>팀 멤버</SubText>
          <NameTagWrapper>
            {team.userList
              ? team.userList.map(user => (
                  <NameTag key={id} onClick={() => navigate(user.id)}>
                    <p>{user.realName}</p>
                  </NameTag>
                ))
              : "유저가 존재하지않습니다."}
          </NameTagWrapper>
        </TextFlexWrapper>

        <SubText>오피스아워 스케줄</SubText>
      </Flex>
    </Container>
  );
}

export default AdminTeams;

const Container = styled.div`
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  gap: 4px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  padding: 0 0 12px 0;
  border-bottom: 3px solid ${({ theme }) => theme.colors.purple1};
`;

const TitleTextWrapper = styled.div``;

const Text = styled.p`
  &.info {
    color: #333;
  }
`;

const Title = styled.h1``;

const OptionWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const OptionButton = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.purple2};
  border-radius: 6px;
  padding: 2px 6px;
  height: 30px;

  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.purple2};
    color: white;
    transition: 0.1s ease-in-out;
  }
  &.tomato {
    border: 2px solid ${({ theme }) => theme.colors.tomato};
    &:hover {
      background-color: ${({ theme }) => theme.colors.tomato};
      color: white;
      transition: 0.1s ease-in-out;
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

const NameTagWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const NameTag = styled.div`
  border: 1px solid #dbdbdb;
  width: 52px;
  display: flex;
  justify-content: center;
  padding: 2px 6px;
`;

const Button = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.purple2};
  padding: 2px 6px;
  width: 136px;
  cursor: pointer;
`;
