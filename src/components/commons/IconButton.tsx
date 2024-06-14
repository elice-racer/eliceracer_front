import { IconButton as MUIIconButton, IconButtonProps } from "@mui/material";
import styled from "styled-components";

export default function IconButton({ children, ...props }: IconButtonProps) {
  return <StyledIconButton {...props}>{children}</StyledIconButton>;
}

const StyledIconButton = styled(MUIIconButton)`
  padding: 4px !important;
  background-color: transparent !important;
`;
