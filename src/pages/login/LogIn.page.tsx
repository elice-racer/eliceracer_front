import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { styled } from "styled-components";
import { AxiosAuth } from "../../servies/auth";
import { useSetRecoilState } from "recoil";
import { tokenAtom } from "../../recoil/TokenAtom";
import InputFiled from "./components/InputField";
import { imgPaths, paths } from "../../utils/path";
import { loadingAtom } from "../../recoil/LoadingAtom";
// import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

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
      return alert("아이디를 입력해주세요.");
    }
    if (userLoginForm.password === "") {
      return alert("비밀번호를 입력해주세요!");
    }
    setLoading(true);

    try {
      const res = await AxiosAuth.fetchLogin(userLoginForm);
      // const test = Cookies.get("refreshToken");
      if (res.data?.statusCode === 200) {
        const loginToken = res.headers?.authorization.replace("Bearer ", "");
        setToken(loginToken);
        localStorage.setItem("userToken", loginToken);
        navigate(from);
      }
      setLoading(false);
    } catch (e: any) {
      console.log(e);
      const errorMessage = e.res?.data?.message || "에러가 발생했습니다.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Img src={imgPaths.ELICE_LOGO} />
      <InputFiled onChange={onChange} name="identifier" value={userLoginForm.identifier} placeholder="id" type="id" required onKeyDown={onKeyDown} />
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
      <Btn onClick={handleLogin}>로그인</Btn>
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
  height: 100%;
  margin-top: 50px;
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

const Img = styled.img`
  width: 230px;
  margin: 50px 0 40px 0;
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
  font-size: 0.8rem;
`;

const TextWrapper = styled.div``;
const StyledLink = styled(Link)``;
