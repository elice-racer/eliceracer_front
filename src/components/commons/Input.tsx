import { InputHTMLAttributes } from "react";
import { styled } from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}
export default function Input({ ...props }: InputProps) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input``;
