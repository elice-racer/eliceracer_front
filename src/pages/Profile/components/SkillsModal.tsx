import styled from "styled-components";
import modalState from "../../../recoil/Modal";
import { useRecoilState } from "recoil";

function SkillsModal() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Container className={isModalOpen ? "" : "disable"}>
        SkillsModal
        <ButtonWrapper>
          <Button onClick={() => {}}></Button>
          <Button className="close" onClick={handleCloseModal}>
            닫기
          </Button>
        </ButtonWrapper>
      </Container>
      <Dimed className={isModalOpen ? "" : "disable"} onClick={handleCloseModal} />
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
    background-color: ${({ theme }) => theme.colos.gray1};
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
