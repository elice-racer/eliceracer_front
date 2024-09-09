import styled from "styled-components";

import Button from "../../../components/commons/Button";
import { Dimed } from "../../../components/commons/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

interface CreateChatNameModalProps {
  isOpen: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  onClose: () => void;
}

function ChatNameModal({ isOpen, onClick, value, onChange, onClose }: CreateChatNameModalProps) {
  return (
    <>
      <Container $isOpen={isOpen}>
        {/* <Modal isOpen={isOpen} onClose={onClose} width="294px" height="120px" zIndex="9999"> */}
        <Wrapper>
          <ButtonFlex>
            <IconButton aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </ButtonFlex>
          <Input className="input" value={value} onChange={onChange} placeholder="채팅방 이름을 설정해주세요" />
          <ButtonFlex>
            <Button className="button" onClick={onClick}>
              채팅방 생성
            </Button>
          </ButtonFlex>
        </Wrapper>
      </Container>
      <Dimed $isOpen={isOpen} $zIndex="1000" onClick={onClose} />
      {/* </Modal> */}
    </>
  );
}

export default ChatNameModal;

const Container = styled.div<{ $isOpen: boolean }>`
  width: 294px;
  height: 120px;

  border: 1px solid ${({ theme }) => theme.colors.purple2};
  background-color: #fff;

  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;

  position: fixed;
  transform: translate(-50%, -50%);

  top: 50%;
  left: 50%;

  z-index: 9999;
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
`;

const ButtonFlex = styled.div`
  width: 100%;
  padding: 4px;

  display: flex;
  justify-content: end;
`;

const Input = styled.input`
  width: 100%;
  height: 36px;

  border: 1px solid #dbdbdb !important;
  padding-left: 4px;
`;
