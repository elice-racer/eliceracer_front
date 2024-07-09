import { useParams } from "react-router-dom";
import { AxiosProject, TeamInfo } from "../../../services/projects";
import { useEffect, useState } from "react";
import styled from "styled-components";

/**관리자 팀 상세 조회 페이지 */
function AdminTeams() {
  const { id } = useParams();

  const [teamInfo, setTeamInfo] = useState<TeamInfo>();
  const fetchGetTeamInfo = async () => {
    try {
      const res = await AxiosProject.getTeamInfo(id);
      console.log(res);
      if (res.statusCode === 200) setTeamInfo(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchGetTeamInfo();
  }, []);

  if (!id) return;

  if (!teamInfo) return;

  return (
    <Container>
      <Flex>{teamInfo.id}</Flex>
    </Container>
  );
}

export default AdminTeams;

const Container = styled.div`
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
  padding: 12px;
`;
