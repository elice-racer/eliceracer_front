import { RefObject } from "react";
import styled from "styled-components";
import SelectBox from "./SelectBox";
import { ProjectInfo } from "../../../../servies/projects";

interface UploadOfficehourFileProps {
  options: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGetProjects: any;
  projects: ProjectInfo[] | undefined;
  track: { trackName: string; cardinalNo: string; lastRound: string };
  onFileUpload: any;
  inputFileRef: RefObject<HTMLInputElement>;
  onClear: () => void;
  setProjectId: any;
}

function UploadOfficehour({
  options,
  onChange,
  onGetProjects,
  projects,
  track,
  onFileUpload,
  inputFileRef,
  onClear,
  setProjectId,
}: UploadOfficehourFileProps) {
  return (
    <Container>
      <TitleWrapper>
        <Title>파일업로드 : 오피스아워 일정 파일 등록하기</Title>
      </TitleWrapper>
      <Wrapper>
        <Text>오피스아워 일정을 등록할 트랙의 프로젝트를 조회해주세요.</Text>
        <InputWrapper>
          <SelectBox options={options} name="trackName" value={track.trackName} onChange={onChange} />
          <Input type="text" name="cardinalNo" value={track.cardinalNo} onChange={onChange} placeholder="기수를 입력해주세요." required />
        </InputWrapper>
        <Button onClick={onGetProjects}>프로젝트 조회</Button>
        <Text>아래 불러온 프로젝트 목록에서 오피스아워 일정을 등록할 프로젝트를 선택해 주세요.</Text>
        <ProjectsWrapper>
          {projects
            ? projects.map(project => (
                <ProjectItem key={project.id} onClick={() => setProjectId(project.id)}>
                  {project.round}차 {project.projectName} (시작일 : {project.startDate.split("T")[0]})
                </ProjectItem>
              ))
            : "프로젝트 목록을 불러와주세요."}
        </ProjectsWrapper>
        <InputWrapper>
          <Label>
            <Input type="file" accept=".xlsx, .xls, .csv" onChange={onFileUpload} ref={inputFileRef} />
          </Label>
          <Button onClick={onClear}>등록 취소</Button>
        </InputWrapper>
      </Wrapper>
    </Container>
  );
}

export default UploadOfficehour;

const Container = styled.div``;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 37px;

  padding: 12px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.purple1};
`;

const Title = styled.h1`
  font-size: 1.4rem;
`;

const Text = styled.p`
  font-weight: bold;
  font-size: 1rem;
  color: #777;
`;

const Input = styled.input``;

const Button = styled.div`
  padding: 2px 4px;
  border-radius: 4px;
  text-align: center;
  width: 30%;
  background-color: ${({ theme }) => theme.colors.purple1};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.purple2};
    color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 12px;
  gap: 4px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 12px 0;
`;

const Label = styled.label``;

const ProjectsWrapper = styled.div`
  height: 72px;
`;

const ProjectItem = styled.div`
  height: 30px;
  padding: 2px 4px;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
