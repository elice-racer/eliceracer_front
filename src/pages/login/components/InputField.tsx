import { InputHTMLAttributes } from "react";
import { styled } from "styled-components";

interface InputFielProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function InputFiled({ label, error, ...props }: InputFielProps) {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <Input {...props} />
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  @media ${({ theme }) => theme.device.tablet} {
    width: 260px;
  }
  @media ${({ theme }) => theme.device.mobileM} {
    width: 200px;
  }
  @media ${({ theme }) => theme.device.mobileS} {
    width: 180px;
  }
`;
const Label = styled.label`
  font-size: 1.2rem;
  padding-left: 12px;
  width: 100%;
`;
const Error = styled.div`
  color: tomato;
`;
const Input = styled.input`
  width: 100%;
  height: 30px;
  padding-left: 10px;
  border-width: 0;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.purple1};
  color: ${({ theme }) => theme.colors.gray2};
`;
