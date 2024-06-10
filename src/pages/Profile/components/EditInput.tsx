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
  background-color: ${({ theme }) => theme.colors.purple1};
`;
