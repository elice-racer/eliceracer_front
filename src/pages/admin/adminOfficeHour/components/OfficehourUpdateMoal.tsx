import styled from "styled-components";
import { Dimed } from "../../../profile/components/SkillsModal";

interface OfficehourUpdateMoalProps {
  isOpen: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  onClose: () => void;
}
function OfficehourUpdateMoal({ isOpen, onClick, value, onChange, onClose }: OfficehourUpdateMoalProps) {
  return (
    <>
      <Container $isOpen={isOpen}>
        AdminUpdateOfficeHour{value}
        <Input onChange={onChange} />
        <SubmitUpdatedBtn onClick={onClick}>변경</SubmitUpdatedBtn>
      </Container>
      <Dimed className={isOpen ? "" : "disable"} onClick={onClose} />
    </>
  );
}

export default OfficehourUpdateMoal;

const Container = styled.div<{ $isOpen: boolean }>`
  position: fixed;

  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  background-color: #fff;

  width: 294px;
  height: 120px;

  display: flex;
  align-items: center;
  justify-content: center;

  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  z-index: 9999;
  border: 1px solid ${({ theme }) => theme.colors.purple2};

  padding: 12px;
`;

const SubmitUpdatedBtn = styled.div`
  border: 1px solid #bdbdbd;
  padding: 6px;
`;

const Input = styled.input``;
