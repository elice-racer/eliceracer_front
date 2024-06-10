import { RefObject } from "react";
import styled from "styled-components";
import SelectBox from "./SelectBox";
import { TeamsInfo } from "../../../../servies/admin";
import { Link } from "react-router-dom";
import { paths } from "../../../../utils/path";
interface UploadTeamBuildingProps {
  options: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClicktoGet: any;
  track: { trackName: string; cardinalNo: string; lastRound: string };
  teamsInfo: TeamsInfo[] | undefined;
  onFileUpload: any;
  inputFileRef: RefObject<HTMLInputElement>;
  onClear: () => void;
}
function UploadTeamBuilding({ options, onChange, onClicktoGet, track, teamsInfo, onFileUpload, inputFileRef, onClear }: UploadTeamBuildingProps) {
  return (
    <Container>
      <Title>파일업로드 : 팀 빌딩하기</Title>
      <Wrapper>
        <SelectBox options={options} name="trackName" value={track.trackName} onChange={onChange} />
        <Input type="text" name="cardinalNo" value={track.cardinalNo} onChange={onChange} placeholder="기수를 입력해주세요." required />
        <Input type="text" name="lastRound" value={track.lastRound} onChange={onChange} placeholder="프로젝트 회차를 입력해주세요." required />
      </Wrapper>
      <InputWrapper>
        <Label>
          <Input type="file" accept=".xlsx, .xls, .csv" onChange={onFileUpload} ref={inputFileRef} />
        </Label>
        <button onClick={onClear}>등록 취소</button>
      </InputWrapper>
      <TeamsListWrapper>
        <Text>아래 버튼을 눌러 생성된 팀 목록을 불러와주세요.</Text>
        <Button onClick={onClicktoGet}>생성 된 팀 목록 확인하기</Button>
        {teamsInfo && (
          <TextWrapper>
            <Text>
              {track.trackName}
              {track.cardinalNo}기의 {track.lastRound}차 프로젝트 팀 목록입니다.
            </Text>
            <Link to={paths.ADMIN_PROJECTS}>채팅방 생성 바로가기</Link>
          </TextWrapper>
        )}
        {teamsInfo?.map((team, idx) => (
          <TextWrapper key={team.id}>
            <Text>
              {idx + 1} [{team.teamNumber}팀] {team.teamName}
              {team.gitlab} {team.notion}
            </Text>
          </TextWrapper>
        ))}
      </TeamsListWrapper>
    </Container>
  );
}

export default UploadTeamBuilding;

const Container = styled.div``;

const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 12px;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 12px;
`;
const Title = styled.h1`
  font-size: 1.4rem;
  margin-bottom: 12px;
`;
const TeamsListWrapper = styled.div``;

const TextWrapper = styled.div``;
const Label = styled.label``;

const Input = styled.input``;

const Text = styled.p``;

const Button = styled.div`
  padding: 2px 4px;
  border-radius: 4px;
  text-align: center;
  width: 30%;
  background-color: ${({ theme }) => theme.colors.purple0};
`;
