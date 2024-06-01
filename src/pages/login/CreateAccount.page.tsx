import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserInfoBox from "./components/UserInfoBox";
import { imgPaths, paths } from "../../utils/path";
import { fetchAuthUserNumber, fetchCheckedAuthCode, fetchSignupUser } from "../../servies/auth";

export default function CreateAccount() {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [confirmUser, setConfirmUser] = useState(false);

  const [userAuth, setUserAuth] = useState({
    realName: "",
    phoneNumber: "",
  });

  const [authCode, setAuthCode] = useState("");

  const [userData, setUserData] = useState({
    realName: userAuth.realName,
    phoneNumber: userAuth.phoneNumber,
    userName: "",
    password: "",
    role: "racer",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserAuth(userInfo => ({ ...userInfo, [name]: value }));
    setAuthCode(authCode);
    setUserData(userInfo => ({ ...userInfo, [name]: value }));
  };

  /** 유저 전화번호 인증 */
  const handleAuthUserPhoneNumber = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetchAuthUserNumber(userAuth);
      if (res.status === 200) {
        setError("인증번호가 전송되었습니다.");
      }
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || "에러가 발생했습니다.";
      setError(errorMessage);
    }
  };

  /** 인증번호 확인 */
  const handleCheckedAuthCode = async (e: any) => {
    e.prevenDefualt();
    try {
      const res = await fetchCheckedAuthCode({ ...userAuth, authCode });
      if (res.status === 201) setConfirmUser(true);
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || "에러가 발생했습니다.";
      setError(errorMessage);
    }
  };

  /** 유저 회원가입 완료! */
  const handleAddUsersEmailAndPW = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetchSignupUser(userData);
      if (res.status === 201) navigate(paths.LOGIN);
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || "에러가 발생했습니다.";
      setError(errorMessage);
    }
  };

  return (
    <Wrapper>
      <Img src={imgPaths.ELICE_LOGO} />
      <h1>본인 인증</h1>
      {error && <Error>{error}</Error>}
      <Input onChange={onChange} name="realName" value={userAuth.realName} placeholder="name" />
      <Input onChange={onChange} name="phoneNumber" value={userAuth.phoneNumber} placeholder="phone number" />
      <AuthSendBtn onClick={handleAuthUserPhoneNumber}>인증문자 보내기</AuthSendBtn>

      <Input onChange={onChange} name="authCode" value={authCode} placeholder="auth code" />
      <Btn onClick={handleCheckedAuthCode}>본인 인증 완료</Btn>
      {confirmUser ? (
        <UserInfoBox onClick={handleAddUsersEmailAndPW} password={userData.password} />
      ) : (
        <Text>
          이미 회원이신가요? <Link to={paths.LOGIN}>로그인하기&rarr;</Link>
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

const AuthSendBtn = styled.button`
  width: 230px;
  height: 30px;
  border: none;
  border-radius: 16px;
  background-color: #b67bff;

  cursor: pointer;
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

  cursor: pointer;
`;

const Text = styled.p`
  color: #dbdbdb;
  font-size: 0.8rem;
`;
