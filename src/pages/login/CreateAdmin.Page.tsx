import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { imgPaths, paths } from "../../utils/path";
import InputFiled from "./components/InputField";

export default function CreateAdmin() {
  const [error, setError] = useState("");

  return (
    <Wrapper>
      <Img src={imgPaths.ELICE_LOGO} />
      <Title>관리자 계정 등록하기</Title>
      <InputFiled error={error} name="name" placeholder="name" />
      <InputFiled error={error} name="email" placeholder="email" />
      <InputFiled error={error} name="password" placeholder="password" />
      <InputFiled error={error} name="password" placeholder="checked password" />
      <Btn>이메일 인증하기</Btn>
      <Text>
        이미 회원이신가요? <Link to={paths.LOGIN}>로그인하기&rarr;</Link>
      </Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  margin-top: 50px;
`;

const Img = styled.img`
  width: 230px;
  margin: 50px 0 40px 0;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  margin-bottom: 14px;
`;
const Input = styled.input`
  width: 240px;
  height: 30px;
  border-radius: 12px;
  background-color: #eeeafe;
  padding-left: 16px;
  border: none;
`;

const Error = styled.p`
  color: tomato;
  font-size: 0.8rem;
`;
const Btn = styled.button`
  width: 230px;
  height: 30px;
  border-radius: 16px;
  border: none;
  background-color: #b67bff;
`;

const Text = styled.p`
  color: #dbdbdb;
  font-size: 0.8rem;
`;
