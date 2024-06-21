import styled from "styled-components";

interface SkillBadgeProps {
  key: string;
  skillName: string;
  isDelete?: boolean;
  onDelete?: (skillName: string) => void;
}

// todo key 수정
function SkillBadge({ key, skillName, isDelete, onDelete }: SkillBadgeProps) {
  return (
    <StyledSkillBadge key={key}>
      {skillName}
      {isDelete && <StyledDeleteIcon onClick={() => (onDelete ? onDelete(skillName) : {})}>Ⅹ</StyledDeleteIcon>}
    </StyledSkillBadge>
  );
}

export default SkillBadge;

const StyledSkillBadge = styled.div`
  position: relative;

  padding: 2px 6px;
  background-color: ${({ theme }) => theme.colors.purple1};
  border-radius: 10px;
  height: 30px;
  border: 1px solid #dbdbdb;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
`;

const StyledDeleteIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: content-box;

  padding: 0 8px;

  cursor: pointer;
`;
