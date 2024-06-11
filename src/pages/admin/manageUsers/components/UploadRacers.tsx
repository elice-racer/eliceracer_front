import styled from "styled-components";
import SelectBox from "./SelectBox";
import { RefObject } from "react";

interface UploadRacersProps {
  options: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  track: { trackName: string; cardinalNo: string };
  onCreateTrack: any;
  onClear: () => void;
  onFileUpload: any;
  inputFileRef: RefObject<HTMLInputElement>;
}

function UploadRacers({ options, onChange, track, onCreateTrack, onClear, onFileUpload, inputFileRef }: UploadRacersProps) {
  return (
    <Container>
      <TitleWrapper>
        <Title>파일업로드 : 트랙 생성하기</Title>
      </TitleWrapper>
      <Text>파일 업로드전 트랙을 생성해주세요. "트랙 생성하기" 버튼을 누르면 트랙이 생성됩니다.</Text>
      <Wrapper>
        <SelectBox options={options} name="trackName" value={track.trackName} onChange={onChange} />
        <Input type="text" name="cardinalNo" value={track.cardinalNo} onChange={onChange} placeholder="기수를 입력해주세요." required />
      </Wrapper>
      <CreateTrackBtn onClick={onCreateTrack}>트랙 생성하기</CreateTrackBtn>
      <TitleWrapper>
        <Title>유저 정보 등록하기</Title>
      </TitleWrapper>
      <Text>유저 정보를 등록하려면 아래 파일을 업로드하세요.</Text>
      <Wrapper>
        <InputWrapper>
          <Label>
            <Input type="file" accept=".xlsx, .xls, .csv" onChange={onFileUpload} ref={inputFileRef} />
          </Label>
          <button onClick={onClear}>등록 취소</button>
        </InputWrapper>
      </Wrapper>
    </Container>
  );
}

export default UploadRacers;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
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
const Wrapper = styled.div`
  display: flex;
  gap: 5px;
  margin: 12px 0;
`;

const InputWrapper = styled.div`
  display: flex;
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
