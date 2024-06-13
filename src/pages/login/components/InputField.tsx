import { InputHTMLAttributes, forwardRef } from "react";
import { styled } from "styled-components";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
// forWordRef 추가
const InputFiled = forwardRef<HTMLInputElement, InputFieldProps>(({ label, error, ...props }, ref) => {
  return (
    <Wrapper>
      {label && <Label>{label}</Label>}
      <Input ref={ref} {...props} />
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
});

export default InputFiled;

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
