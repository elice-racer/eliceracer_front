import { RefObject } from "react";
import styled from "styled-components";

interface UploadTeamBuildingProps {
  onFileUpload: any;
  inputFileRef: RefObject<HTMLInputElement>;
  onClear: () => void;
}
function UploadTeamBuilding({ onFileUpload, inputFileRef, onClear }: UploadTeamBuildingProps) {
  return (
    <Container>
      <InputWrapper>
        <Label>
          <Input type="file" accept=".xlsx, .xls, .csv" onChange={onFileUpload} ref={inputFileRef} />
        </Label>
        <button onClick={onClear}>등록 취소</button>
      </InputWrapper>
    </Container>
  );
}

export default UploadTeamBuilding;

const Container = styled.div``;

const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 12px;
`;
const Label = styled.label``;
const Input = styled.input``;
