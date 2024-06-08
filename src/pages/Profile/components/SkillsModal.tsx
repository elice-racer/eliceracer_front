import styled from "styled-components";

interface SkillModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

function SkillsModal({ isModalOpen, onClose }: SkillModalProps) {
  return (
    <>
      <Container className={isModalOpen ? "" : "disable"}>
        SkillsModal
        <ButtonWrapper>
          <Button onClick={() => {}}></Button>
          <Button className="close" onClick={onClose}>
            닫기
          </Button>
        </ButtonWrapper>
      </Container>
      <Dimed className={isModalOpen ? "" : "disable"} onClick={onClose} />
    </>
  );
}

export default SkillsModal;

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
  width: 100%;
  max-width: 435px;
  height: 300px;

  border-radius: 10px;
  background-color: #fff;

  &.disable {
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.puple2};
  &.close {
    background-color: ${({ theme }) => theme.colors.gray1};
  }
`;

export const Dimed = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.3;
  display: block;

  &.disable {
    display: none;
  }
`;
