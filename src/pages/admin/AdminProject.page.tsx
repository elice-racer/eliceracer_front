import styled from "styled-components";
import { paths } from "../../utils/path";
import { Link, useNavigate } from "react-router-dom";
import SelectBox from "./administrateUsers/components/SelectBox";
import { useEffect, useState } from "react";
import { AxiosProject, ProjectInfo } from "../../services/projects";

const OptTrack = [
  { value: "", name: "트랙" },
  { value: "AI", name: "AI" },
  { value: "CLOUD", name: "CLOUD" },
  { value: "SW", name: "SW" },
];

function AdminProject() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectInfo[]>();
  const [track, setTrack] = useState({
    trackName: "",
    cardinalNo: "",
    lastRound: "",
  });

  const handleChangeTrackInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTrack(createTrack => ({ ...createTrack, [name]: value }));
  };

  const fetchGetAllProjects = async () => {
    try {
      const res = await AxiosProject.getAllProjectsList();
      if (res.statusCode === 200) setProjects(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDetailClick = (key: string) => {
    navigate(`${paths.ADMIN_PROJECTS}/${key}`);
  };
  useEffect(() => {
    fetchGetAllProjects();
  }, []);
  return (
    <Container>
      <Wrapper>
        <TitleFlex>
          <TitleTextWrapper>
            <Title>프로젝트 조회</Title>
            <Link to={paths.ADD_USERS}>
              <AddBtn>프로젝트 일정 등록</AddBtn>
            </Link>
          </TitleTextWrapper>
          <SelectWrapper>
            <SelectBox options={OptTrack} name="trackName" value={track.trackName} onChange={handleChangeTrackInfo} />
            <Input type="text" name="cardinalNo" value={track.cardinalNo} onChange={handleChangeTrackInfo} placeholder="기수" required />
            <Input type="text" name="lastRound" value={track.lastRound} onChange={handleChangeTrackInfo} placeholder="회차" required />
          </SelectWrapper>
        </TitleFlex>
        <ProjectListWrapper>
          {projects?.map((project, idx) => (
            <ProjectWrapper key={project.id} onClick={() => handleDetailClick(project.id)}>
              <Text className="gray">{idx + 1}</Text>
              <Text>
                {project.track.trackName} {project.track.cardinalNo}
              </Text>
              <Text>{project.projectName}</Text>
            </ProjectWrapper>
          ))}
        </ProjectListWrapper>
      </Wrapper>
    </Container>
  );
}

export default AdminProject;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 80%;
`;

const TitleFlex = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  border-bottom: solid 2px ${({ theme }) => theme.colors.purple2};
`;

const TitleTextWrapper = styled.div`
  display: flex;

  align-items: center;
  padding: 10px;
  gap: 12px;
`;

const Title = styled.h1``;

const AddBtn = styled.div`
  color: ${({ theme }) => theme.colors.purple3};
  text-align: center;
  padding: 2px 5px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.purple2};
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 4px;
  padding: 12px;
`;

const Input = styled.input``;

const ProjectListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;
const ProjectWrapper = styled.div`
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray1};
  cursor: pointer;
`;
const Text = styled.p`
  &.gray {
    color: ${({ theme }) => theme.colors.gray2};
  }
  padding: 2px 4px;
  border-radius: 4px;
`;
