import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// components
import AuthTimer from "../../components/commons/AuthTimer";

// paths
import { imgPaths, paths } from "../../utils/path";

// api
import { AxiosAuth } from "../../servies/auth";
import { useSnackbar } from "../../hooks/useSnackbar";
import { validatePassword } from "../../utils/regEx";

export default function CreateAccount() {
  const navigate = useNavigate();

  const { snackbarOpen } = useSnackbar();
  // 타이머 시작
  const [timerStart, setTimerStart] = useState(false);

  // 본인인증 완료 여부
  const [confirmUser, setConfirmUser] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const EXPIRE_TIME = 60 * 10;

  const [error, setError] = useState("");

  const [userData, setUserData] = useState({
    realName: "진채영",
    phoneNumber: "01034663728",
    username: "",
    password: "",
    confirmPassword: "",
    authCode: "",
    role: "racer",
  });

  const [isPasswordPattern, setIsPasswordPattern] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    if (name === "password" || name === "confirmPassword") {
      if (validatePassword(value)) {
        setIsPasswordPattern(true);
      } else {
        setIsPasswordPattern(false);
      }
    }
  };

  /** 유저 전화번호 인증 */
  const handleAuthUserPhoneNumber = async () => {
    try {
      const { realName, phoneNumber } = userData;
      const res = await AxiosAuth.fetchAuthUserNumber({ realName, phoneNumber });
      console.log(res);
      if (res.status === 201) {
        setTimerStart(true);
        snackbarOpen({ message: "인증번호가 전송되었습니다", open: true });
      }
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || "에러가 발생했습니다.";
      setError(errorMessage);
    }
  };

  /** 인증번호 확인 */
  const handleCheckedAuthCode = async () => {
    try {
      const { authCode, realName, phoneNumber } = userData;
      const res = await AxiosAuth.fetchCheckedAuthCode({ realName, phoneNumber, authCode });
      if (res.status === 201) {
        setTimerStart(false);
        setConfirmUser(true);
      }
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || "에러가 발생했습니다.";
      setError(errorMessage);
    }
  };

  /** 유저 회원가입 완료! */
  const handleAddUsersEmailAndPW = async () => {
    try {
      const { authCode, confirmPassword, ...props } = userData;
      const res = await AxiosAuth.fetchSignupUser({ ...props });
      if (res.status === 200) navigate(paths.SUCCESS_USER);
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || "에러가 발생했습니다.";
      // to do 인증안돼있을때 예외처리하기
      setError(errorMessage);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Wrapper>
      <Img src={imgPaths.ELICE_LOGO} />
      <h1>본인 인증</h1>
      {error && <Error>{error}</Error>}
      <Input onChange={onChange} name="realName" value={userData.realName} placeholder="name" ref={inputRef} />
      <Input onChange={onChange} name="phoneNumber" value={userData.phoneNumber} placeholder="phone number" />
      <AuthSendBtn onClick={handleAuthUserPhoneNumber}>인증문자 보내기</AuthSendBtn>
      <AuthWrapper>
        <Input onChange={onChange} name="authCode" value={userData.authCode} placeholder="auth code" />
        <TimerWrapper>{timerStart && <AuthTimer expire_time={EXPIRE_TIME} start={timerStart} setStart={setTimerStart} />}</TimerWrapper>
      </AuthWrapper>
      <Btn onClick={handleCheckedAuthCode}>본인 인증 완료</Btn>
      {confirmUser ? (
        <Wrapper>
          <Input name="username" placeholder="Id" value={userData.username} onChange={onChange} />
          <Input name="password" placeholder="비밀번호를 입력하세요." value={userData.password} onChange={onChange} />
          <Input name="confirmPassword" placeholder="checked password" value={userData.confirmPassword} onChange={onChange} />
          {userData.confirmPassword.length !== 0 && <>{!isPasswordPattern && "특수문자를 포함한 8자리 - 20자리"}</>}
          {userData.confirmPassword.length !== 0 && <>{userData.password !== userData.confirmPassword && "비밀번호가 같지 않습니다."}</>}
          <Btn onClick={handleAddUsersEmailAndPW}>회원가입!</Btn>
        </Wrapper>
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

const AuthWrapper = styled.div`
  position: relative;
`;

const TimerWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;

  transform: translateY(-50%);
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
