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
      <TitleWrapper>
        <Title>파일업로드 : 프로젝트 생성 및 팀 빌딩하기</Title>
      </TitleWrapper>

      <Text>잘못된 파일을 등록했을 경우 수정된 파일을 다시 등록해주세요!</Text>
      <Wrapper>
        <InputWrapper>
          <Label>
            <Input type="file" accept=".xlsx, .xls, .csv" onChange={onFileUpload} ref={inputFileRef} />
          </Label>
          <button onClick={onClear}>등록 취소</button>
        </InputWrapper>
      </Wrapper>
      <TeamsListWrapper>
        <TitleWrapper>
          <Title>생성 된 팀 확인하기</Title>
        </TitleWrapper>
        <Text>아래 양식은 프로젝트 생성된 팀을 조회할 때 사용됩니다.</Text>
        <Wrapper>
          <InputWrapper>
            <SelectBox options={options} name="trackName" value={track.trackName} onChange={onChange} />
            <Input type="text" name="cardinalNo" value={track.cardinalNo} onChange={onChange} placeholder="기수를 입력해주세요." required />
            <Input type="text" name="lastRound" value={track.lastRound} onChange={onChange} placeholder="프로젝트 회차를 입력해주세요." required />
          </InputWrapper>
        </Wrapper>
        <Text>아래 버튼을 눌러 생성된 팀 목록을 불러와주세요.</Text>

        <Wrapper>
          <Button onClick={onClicktoGet}>생성 된 팀 목록 확인하기</Button>
          {teamsInfo && (
            <TextWrapper>
              <Text>
                {track.trackName}
                {track.cardinalNo}기의 {track.lastRound}차 프로젝트 팀 목록입니다. 아래 채팅방 생성 바로가기를 눌러주세요.
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
        </Wrapper>
      </TeamsListWrapper>
    </Container>
  );
}

export default UploadTeamBuilding;

const Container = styled.div``;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 37px;

  padding: 12px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.purple1};
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
const Title = styled.h1`
  font-size: 1.4rem;
`;

const TeamsListWrapper = styled.div``;

const TextWrapper = styled.div``;

const Label = styled.label``;

const Input = styled.input``;

const Text = styled.p`
  font-weight: bold;
  font-size: 1rem;
  color: #777;
`;

const Button = styled.div`
  padding: 2px 4px;
  border-radius: 4px;
  text-align: center;
  width: 30%;
  background-color: ${({ theme }) => theme.colors.purple0};
`;
