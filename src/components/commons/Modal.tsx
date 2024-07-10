import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;

  title?: string;
  width?: string;
  height?: string;
}

function Modal({ isOpen, onClose, children, title, width = "700px", height = "600px" }: ModalProps) {
  return (
    <>
      <ModalContainer $isOpen={isOpen} $width={width} $height={height}>
        <OptionWrapper>
          <Title>{title}</Title>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </OptionWrapper>
        {children}
      </ModalContainer>
      <Dimed $isOpen={isOpen} onClick={onClose} />
    </>
  );
}

export default Modal;

const OptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h1``;

const ModalContainer = styled.div<{ $isOpen: boolean; $width: string; $height: string }>`
  @media ${({ theme }) => theme.device.mobileL} {
    height: 100%;
    width: 100%;
    border-radius: 0px;
  }

  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};

  border-radius: 10px;
  background-color: #fff;

  padding: 24px 20px;

  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;

  position: fixed;
  transform: translate(-50%, -50%);

  top: 50%;
  left: 50%;

  z-index: 999;
`;

export const Dimed = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  height: 100%;

  background-color: #000;
  opacity: 0.3;

  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};

  position: fixed;
  top: 0;
  left: 0;

  z-index: 888;
`;
