import styled from "styled-components";
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick: MouseEventHandler;
}

function Btn({ children, onClick, ...props }: ButtonProps) {
  return (
    <Button {...props} onClick={onClick}>
      {children}
    </Button>
  );
}

export default Btn;

const Button = styled.button`
  width: 120px;
  height: 30px;
  border-radius: 8px;
  border: none;

  color: #000;
  background-color: ${({ theme }) => theme.colors.purple2};
  @media ${({ theme }) => theme.device.mobileS} {
  }
`;
