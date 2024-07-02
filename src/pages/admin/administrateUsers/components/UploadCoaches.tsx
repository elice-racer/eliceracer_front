import { RefObject } from "react";
import styled from "styled-components";

interface UploadCoachsProps {
  onFileUpload: any;
  inputFileRef: RefObject<HTMLInputElement>;
  onClear: () => void;
}
function UploadCoaches({ onFileUpload, inputFileRef, onClear }: UploadCoachsProps) {
  return (
    <Container>
      <TitleWrapper>
        <Title>파일업로드 : 코치 멤버 등록하기</Title>
      </TitleWrapper>
      <Text>잘못된 파일을 등록했을 경우 수정된 파일을 다시 등록해주세요!</Text>
      <InputWrapper>
        <Label>
          <Input type="file" accept=".xlsx, .xls, .csv" onChange={onFileUpload} ref={inputFileRef} />
        </Label>
        <button onClick={onClear}>등록 취소</button>
      </InputWrapper>
    </Container>
  );
}

export default UploadCoaches;

const Container = styled.div``;

const Title = styled.h1`
  font-size: 1.4rem;
`;

const Text = styled.p`
  font-weight: bold;
  font-size: 1rem;
  color: #777;
`;

const InputWrapper = styled.div`
  display: flex;
  margin: 12px 0;
`;
const Label = styled.label``;

const Input = styled.input``;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 37px;

  padding: 12px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.purple1};
`;
