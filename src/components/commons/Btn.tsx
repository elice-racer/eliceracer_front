import styled from "styled-components";
import { ButtonHTMLAttributes, ReactNode } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  childen: ReactNode;
}
function Btn({ children, ...props }: ButtonProps) {
  return <Button {...props}>{children}</Button>;
}

export default Btn;

const Button = styled.button`
  @media ${({ theme }) => theme.device.mobileS} {
  }
`;
