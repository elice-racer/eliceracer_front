import styled from "styled-components";
import SelectBox from "./SelectBox";
import { RefObject } from "react";

const OPTIONS = [
  { value: "", name: "트랙을 선택해주세요." },
  { value: "AI", name: "AI" },
  { value: "CLOUD", name: "CLOUD" },
  { value: "SW", name: "SW" },
];

interface UploadRacersProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  track: { trackName: string; cardinalNo: string };
  onCreateTrack: any;
  onClear: () => void;
  onFileUpload: any;
  inputFileRef: RefObject<HTMLInputElement>;
}

function UploadRacers({ onChange, track, onCreateTrack, onClear, onFileUpload, inputFileRef }: UploadRacersProps) {
  return (
    <Container>
      <Title>파일업로드 : 트랙 생성하기</Title>
      <Wrapper>
        <SelectBox options={OPTIONS} name="trackName" value={track.trackName} onChange={onChange} />
        <Input type="text" name="cardinalNo" value={track.cardinalNo} onChange={onChange} placeholder="기수를 입력해주세요." required />
      </Wrapper>
      <CreateTrackBtn onClick={onCreateTrack}>트랙 생성하기</CreateTrackBtn>
      <Title>유저 정보 등록하기</Title>
      <Text>유저 정보를 등록하려면 아래 파일을 업로드하세요.</Text>
      <InputWrapper>
        <Label>
          <Input type="file" accept=".xlsx, .xls, .csv" onChange={onFileUpload} ref={inputFileRef} />
        </Label>
        <button onClick={onClear}>등록 취소</button>
      </InputWrapper>
    </Container>
  );
}

export default UploadRacers;

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  margin-bottom: 12px;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 12px;
`;

const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 12px;
`;
const Text = styled.p`
  font-weight: bold;
  font-size: 1rem;
  color: #777;
`;

const Label = styled.label``;
const Input = styled.input``;

const CreateTrackBtn = styled.button`
  width: 140px;
  height: 30px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme }) => theme.colors.purple1};
  color: ${({ theme }) => theme.colors.gray2};
  margin-bottom: 12px;
`;
