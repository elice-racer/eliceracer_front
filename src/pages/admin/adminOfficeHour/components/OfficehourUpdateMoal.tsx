import styled from "styled-components";
import LoadingButton from "@mui/lab/LoadingButton";
import { Modal } from "../../../../components/commons/Modal";
import { OfficehourData } from "../AdminOfficeHour.page";

interface OfficehourUpdateMoalProps {
  isOpen: boolean;
  isLoading: boolean;

  value: OfficehourData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  onClose: () => void;
}
function OfficehourUpdateMoal({ isOpen, isLoading, onClick, value, onChange, onClose }: OfficehourUpdateMoalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="오피스아워">
      {value.id}
      <Input type="text" name="" value={value.coachName} onChange={onChange} required />
      <ButtonWrapper>
        {/* mui ui createTheme이용해서 테마 커스텀하기 */}
        <LoadingButton loading={isLoading} variant="outlined" onClick={onClick}>
          완료
        </LoadingButton>
      </ButtonWrapper>
    </Modal>
  );
}

export default OfficehourUpdateMoal;

const Input = styled.input``;

const ButtonWrapper = styled.div`
  padding-top: 4px;
  display: flex;
  justify-content: end;
`;
