import styled from "styled-components";
import { Dimed } from "../../profile/components/SkillsModal";
import Button from "../../../components/commons/Button";

interface CreateChatNameModalProps {
  $isOpen: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  onClose: () => void;
}

function ChatNameModal({ $isOpen, onClick, value, onChange, onClose }: CreateChatNameModalProps) {
  return (
    <>
      <Container $isOpen={$isOpen}>
        <Wrapper>
          <Input className="input" value={value} onChange={onChange} placeholder="채팅방 이름을 설정해주세요" />
          <ButtonWrapper>
            <Button className="button" onClick={onClick}>
              채팅방 생성
            </Button>
          </ButtonWrapper>
        </Wrapper>
      </Container>

      <Dimed className={$isOpen ? "" : "disable"} onClick={onClose} />
    </>
  );
}

export default ChatNameModal;

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
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 13px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .input {
    width: 100% !important;
    border: none;
    border-radius: 0px;
  }

  .button {
    margin-top: 12px;
    width: 100px;
    background-color: ${({ theme }) => theme.colors.purple5} !important;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const Input = styled.input`
  width: 100%;
  height: 36px;

  border: 1px solid #dbdbdb !important;
  padding-left: 4px;
`;
