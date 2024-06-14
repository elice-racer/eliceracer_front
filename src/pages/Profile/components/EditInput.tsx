import { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface EditInputProps extends InputHTMLAttributes<HTMLInputElement> {}

function EditInput({ ...props }: EditInputProps) {
  return <TextInput {...props} />;
}

export default EditInput;

const TextInput = styled.input`
  border: none;
  border-radius: 6px;
  padding: 2px 6px;
  border: 1px solid ${({ theme }) => theme.colors.gray1};
  height: 36px;

  outline: none;

  transition: 0.3s all ease-in-out;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.purple2};
  }
`;
