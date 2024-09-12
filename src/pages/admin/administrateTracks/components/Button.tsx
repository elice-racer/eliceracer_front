import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isBasic: boolean;
  children: ReactNode;
  onClick: MouseEventHandler;
}

function Button({ isBasic = true, children, ...props }: ButtonProps) {
  return (
    <StyledButton {...props} type={isBasic}>
      {children}
    </StyledButton>
  );
}

export default Button;

const StyledButton = styled.button<{ type: boolean }>`
  &:hover {
    cursor: pointer;
    background-color: ${({ type }) => (type ? "#dfd6ff" : "tomato")};
    color: #fff;
  }
  background-color: #fff;
  border: 1px solid ${({ type }) => (type ? "#dfd6ff" : "tomato")};
  color: ${({ type }) => (type ? "#aa8dff" : "tomato")};
  text-align: center;
  padding: 4px 6px;
  border-radius: 6px;
`;
