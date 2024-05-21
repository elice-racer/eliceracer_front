import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserInfoBox from "./components/UserInfoBox";
import { imgPaths, paths } from "../../utils/path";

export default function CreateAccount() {
  const [error, setError] = useState("");
  const [confirmUser, setConfirmUser] = useState(false);

  const [userAuth, setUserAuth] = useState({
    name: "",
    phoneNumber: "",
    authCode: "",
  });

  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    realName: "",
  });
  /**
   * todo
   * user 회원가입
   * 번호 인증
   * 이메일 인증?
   * 트랙 확인
   * 본인 인증 완료상태면
   * 번호인증을 하면 이메일이 날아옴 , 날아온 이메일 기반으로 정보가 자동 입력됨
   */
  return (
    <Wrapper>
      <Img src={imgPaths.ELICE_LOGO} />
      <h1>본인 인증</h1>
      {error && <Error>{error}</Error>}
      <Input name="name" placeholder="name" />
      <Input name="phoneNumber" placeholder="phone number" />
      <Input name="authCode" placeholder="auth code" />
      <Btn onClick={() => setConfirmUser(true)}>본인 인증하기</Btn>
      {confirmUser ? (
        <UserInfoBox />
      ) : (
        <Text>
          이미 회원이신가요? <Link to={paths.LOGIN}>로그인하기&rarr;</Link>{" "}
        </Text>
      )}
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
