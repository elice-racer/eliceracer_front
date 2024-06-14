import { Button as MUIButton, ButtonProps } from "@mui/material";
import styled from "styled-components";

export default function Button({ children, ...props }: ButtonProps) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

const StyledButton = styled(MUIButton)`
  background-color: ${({ theme }) => theme.colors.purple5} !important;

  height: 36px !important;

  color: #fff !important;

  z-index: 1 !important;
`;
