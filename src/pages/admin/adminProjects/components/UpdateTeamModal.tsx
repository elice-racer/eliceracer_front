import styled from "styled-components";
import Modal from "../../../../components/commons/Modal";

export interface ModalProps {
  isOpen: boolean;
  onClick: () => void;
  onClose: () => void;
}

interface UpdateTeamModalProps extends ModalProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function UpdateTeamModal({ isOpen, value, onChange, onClick, onClose }: UpdateTeamModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <TextWrapper>
        <LabelText>{value}</LabelText>
        <Text onChange={onChange}></Text>
      </TextWrapper>
      <div onClick={onClick}></div>
    </Modal>
  );
}

export default UpdateTeamModal;

const TextWrapper = styled.div``;

const LabelText = styled.h3``;

const Text = styled.p``;
