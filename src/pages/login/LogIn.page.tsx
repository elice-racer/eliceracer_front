import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { fetchLogin } from "../../servies/auth";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../store/TokenAtom";

function LogIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.redirectedFrom?.pathname || "/";
  const [userLoginForm, setUserLoginForm] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const token = useRecoilValue(tokenAtom);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserLoginForm(userInfo => ({ ...userInfo, [name]: value }));
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    try {
      fetchLogin(userLoginForm);
      navigate(from);
    } catch (e: any) {
      setError(e);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);
  // State = 컴포넌트 내부에서 변화할 수 있는 값
  return (
    <Wrapper>
      <Img src="imgs/elice-logo.svg" />
      <Input onChange={onChange} name="identifier" value={userLoginForm.identifier} placeholder="id" type="id" required />
      <Input onChange={onChange} name="password" value={userLoginForm.password} placeholder="password" type="password" required />
      {error && <Error>{error}</Error>}
      <Btn onClick={handleLogin}>로그인</Btn>
      <Text>아이디 | 비밀번호 찾기</Text>

      <Text>
        처음 방문하셨나요? <Link to="/create-account">회원가입하기 &rarr;</Link>
      </Text>
    </Wrapper>
  );
}

export default LogIn;

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
