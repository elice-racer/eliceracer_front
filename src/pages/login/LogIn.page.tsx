import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { fetchLogin } from "../../servies/auth";
import { useRecoilState } from "recoil";
import { tokenAtom } from "../../recoil/TokenAtom";
import InputFiled from "./components/InputField";
import { imgPaths, paths } from "../../utils/path";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.redirectedFrom?.pathname || paths.HOME;
  const [userLoginForm, setUserLoginForm] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [token, setToken] = useRecoilState(tokenAtom);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLoginForm(userInfo => ({ ...userInfo, [name]: value }));
  };

  const handleLogin = async (e: any) => {
    if (userLoginForm.identifier === "") {
      return alert("아이디를 입력해주세요.");
    }
    if (userLoginForm.password === "") {
      return alert("비밀번호를 입력해주세요!");
    }
    e.preventDefault();
    try {
      const res = await fetchLogin(userLoginForm);
      localStorage.setItem("userToken", res.accessToken);
      setToken(res.accessToken);
      navigate(from);
    } catch (e: any) {
      setError(e);
    }
  };
  useEffect(() => {
    if (token) {
      navigate(paths.HOME);
    }
  }, []);
  // State = 컴포넌트 내부에서 변화할 수 있는 값
  return (
    <Wrapper>
      <Img src={imgPaths.ELICE_LOGO} />
      <InputFiled error={error} onChange={onChange} name="identifier" value={userLoginForm.identifier} placeholder="id" type="id" required />
      <InputFiled error={error} onChange={onChange} name="password" value={userLoginForm.password} placeholder="password" type="password" required />
      <Btn onClick={handleLogin}>로그인</Btn>
      <Text>아이디 | 비밀번호 찾기</Text>

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
  @media ${({ theme }) => theme.device.tablet} {
    background-color: blue;
  }
  @media ${({ theme }) => theme.device.mobileM} {
    background-color: red;
  }
  @media ${({ theme }) => theme.device.mobileS} {
    background-color: green;
  }
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
`;

const Text = styled.p`
  color: #dbdbdb;
  font-size: 0.8rem;
`;
