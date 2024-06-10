import styled from "styled-components";
import { Skills } from "../../../servies/user";
import React, { forwardRef, useState, Ref, useRef, useEffect } from "react";
import SkillBadge from "./SkillBadge";

interface SkillModalProps {
  isModalOpen: boolean;
  searchValue: string;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  showSkills: string[];
  searchSkills: Skills[];
  onAddSkill: () => void;
  onAddTempSkill: (skillName: string) => void;
  onDeleteTempSkill: (skillName: string) => void;
}

function SkillsModal(
  { isModalOpen, onClose, onChangeValue, searchValue, searchSkills, showSkills, onAddSkill, onAddTempSkill, onDeleteTempSkill }: SkillModalProps,
  ref: Ref<HTMLInputElement>
) {
  const skillboxRef = useRef<HTMLDivElement>(null);
  const [skillModalOpen, setSkillModalOpen] = useState(false);

  const [height, setHeight] = useState<number>(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onAddTempSkill(searchValue);
    }
  };

  useEffect(() => {
    if (skillboxRef.current) {
      const height = skillboxRef.current.getBoundingClientRect().height;

      if (height > 32) setHeight(height);
    }
  }, [skillModalOpen]);
  return (
    <>
      <StyledSkillMoal className={isModalOpen ? "" : "disable"}>
        <Container className={isModalOpen ? "" : "disable"}>
          <TitleWrapper>
            <Title>보유 기술 스택</Title>
          </TitleWrapper>
          <Wrapper ref={skillboxRef}>
            {showSkills.map(skill => (
              <SkillBadge skillName={skill} isDelete onDelete={onDeleteTempSkill} />
            ))}
            <Input
              value={searchValue}
              onChange={onChangeValue}
              onFocus={() => setSkillModalOpen(true)}
              onBlur={() => setSkillModalOpen(false)}
              onKeyDown={handleKeyDown}
              placeholder="기술 스택을 입력해주세요"
              ref={ref}
            />
          </Wrapper>
          <ButtonWrapper>
            <Button onClick={onAddSkill}>저장</Button>
            <Button className="close" onClick={onClose}>
              닫기
            </Button>
          </ButtonWrapper>
        </Container>
        <SkillContainer isOpen={skillModalOpen && searchValue !== ""} style={{ top: `calc(45% + ${height / 2}px` }}>
          {searchSkills.map(skill => (
            <SkillItem skillName={skill.skillName} onClick={() => onAddTempSkill(skill.skillName)} />
          ))}
          {searchValue !== "" && !searchSkills.find(skill => skill.skillName === searchValue) && (
            <StyledAddSkillButton
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                onAddTempSkill(searchValue);
              }}
              onMouseDown={handleMouseDown}
            >
              + "{searchValue}" 추가하기
            </StyledAddSkillButton>
          )}
        </SkillContainer>
      </StyledSkillMoal>
      <Dimed className={isModalOpen ? "" : "disable"} onClick={onClose} />
    </>
  );
}

interface SkillItemProps {
  skillName: string;
  onClick: () => void;
}

function SkillItem({ skillName, onClick }: SkillItemProps) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <StyledSkillItem onClick={handleClick} onMouseDown={handleMouseDown}>
      {skillName}
    </StyledSkillItem>
  );
}

export default forwardRef<HTMLInputElement, SkillModalProps>(SkillsModal);

const StyledSkillMoal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
  width: 100%;
  max-width: 700px;
  height: 560px;
  z-index: 999;
  border-radius: 10px;
  background-color: transparent;

  &.disable {
    display: none;
  }
  padding: 24px 20px;
`;

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
  width: 100%;
  max-width: 435px;
  height: 280px;
  z-index: 999;
  border-radius: 10px;
  background-color: #fff;

  &.disable {
    display: none;
  }
  padding: 24px 20px;
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 4px;
  max-height: 80px;
  overflow-y: scroll;
`;

const Input = styled.input`
  width: 140px;
  min-width: 140px;

  height: 30px;
  border: none;
  padding-left: 4px;
`;
const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  background: rgb(255, 255, 255);
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  user-select: none;
  padding-bottom: 24px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 4px;
  padding-top: 24px;
`;

const Button = styled.button`
  border: none;
  border-radius: 6px;
  width: 58px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.purple2};
  &.close {
    background-color: ${({ theme }) => theme.colors.gray1};
  }
`;

// skill style
const SkillContainer = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: 200px;
  background-color: #fff;
  z-index: 999;
  position: absolute;
  left: 50%;
  max-width: 400px;
  transform: translateX(-50%);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const StyledSkillItem = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 1px;
  display: flex;
  align-items: center;

  font-size: 1.2rem;
  font-weight: 500;
  color: #000;
  padding-left: 4px;

  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.gray1};
  }
`;

const StyledAddSkillButton = styled(StyledSkillItem)`
  padding-left: 12px;
`;

// dimmed
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
