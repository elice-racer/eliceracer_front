import styled from "styled-components";
import Select from "react-select";
import { Skills } from "../../../servies/user";
interface SkillModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  defaultData: Skills[] | null | undefined;
  optionsData: Skills[] | undefined;
}

function SkillsModal({ isModalOpen, onClose, defaultData, optionsData }: SkillModalProps) {
  return (
    <>
      <Container className={isModalOpen ? "" : "disable"}>
        <TitleWrapper>
          <Title>보유 기술 스택</Title>
        </TitleWrapper>
        <SkillsWrapper>
          <Select defaultValue={defaultData} isMulti name="skills" options={optionsData} className="basic-multi-select" classNamePrefix="select" />
        </SkillsWrapper>
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

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  padding: 1rem 1.5rem;
  background: rgb(255, 255, 255);
`;

const Title = styled.p`
  line-height: 1.5;
  user-select: auto;
`;

const SkillsWrapper = styled.div`
  position: relative;
  padding: 1.5rem;
  flex: 1 1 auto;
  overflow: auto;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  border: none;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.purple2};
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
