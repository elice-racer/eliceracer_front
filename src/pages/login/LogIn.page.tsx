import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { AxiosAuth } from "../../services/auth";
import { useSetRecoilState } from "recoil";
import { tokenAtom } from "../../recoil/TokenAtom";
import InputFiled from "./components/InputField";
import { imgPaths, paths } from "../../utils/path";
import { loadingAtom } from "../../recoil/LoadingAtom";
import { useSnackbar } from "../../hooks/useSnackbar";
import Button from "../../components/commons/Button";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { snackbarOpen } = useSnackbar();

  const inputRef = useRef<HTMLInputElement>(null);

  const setLoading = useSetRecoilState(loadingAtom);
  const from = location?.state?.redirectedFrom?.pathname || paths.HOME;

  const [userLoginForm, setUserLoginForm] = useState({
    identifier: "",
    password: "",
  });

  const [error, setError] = useState("");
  const setToken = useSetRecoilState(tokenAtom);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLoginForm(userInfo => ({ ...userInfo, [name]: value }));
  };

  const handleLogin = async () => {
    if (userLoginForm.identifier === "") {
      snackbarOpen({ message: "아이디를 입력해주세요", open: true });
      return;
    }
    if (userLoginForm.password === "") {
      snackbarOpen({ message: "비밀번호를 입력해주세요", open: true });
      return;
    }
    setLoading(true);

    try {
      const res = await AxiosAuth.fetchLogin(userLoginForm);
      if (res.data?.statusCode === 200) {
        const loginToken = res.headers?.authorization.replace("Bearer ", "");
        setToken(loginToken);
        localStorage.setItem("userToken", loginToken);
        navigate(from);
      }
      setLoading(false);
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || "에러가 발생했습니다.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <Wrapper>
      <Img src={imgPaths.ELICE_LOGO} />
      <Form>
        <InputFiled
          ref={inputRef}
          onChange={onChange}
          name="identifier"
          value={userLoginForm.identifier}
          placeholder="id"
          type="id"
          required
          onKeyDown={onKeyDown}
        />
        <InputFiled
          error={error}
          onChange={onChange}
          name="password"
          value={userLoginForm.password}
          placeholder="password"
          type="password"
          required
          onKeyDown={onKeyDown}
        />
      </Form>
      <ButtonWrapper>
        <Button onClick={handleLogin} className="login-button">
          로그인
        </Button>
      </ButtonWrapper>

      <TextWrapper>
        <StyledLink to={paths.FIND_ID}>아이디</StyledLink> | <StyledLink to={paths.FIND_PW}>비밀번호 찾기</StyledLink>
      </TextWrapper>
      <Text>
        처음 방문하셨나요? <Link to={paths.INTRO}>회원가입하기 &rarr;</Link>
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
  width: 100%;
  margin: 0 auto;

  /* @media ${({ theme }) => theme.device.tablet} {
    background-color: blue;
  }
  @media ${({ theme }) => theme.device.mobileM} {
    background-color: red;
  }
  @media ${({ theme }) => theme.device.mobileS} {
    background-color: green;
  } */
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-button {
    width: 295px;
    @media ${({ theme }) => theme.device.tablet} {
      width: 260px;
    }
    @media ${({ theme }) => theme.device.mobileM} {
      width: 180px;
    }
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Img = styled.img`
  width: 230px;
  margin: 50px 0 40px 0;
`;

const Text = styled.p`
  font-size: 0.8rem;
`;

const TextWrapper = styled.div``;
const StyledLink = styled(Link)``;
