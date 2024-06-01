import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { imgPaths, paths } from "../../utils/path";
import InputFiled from "./components/InputField";
import { fetchSignupAdmin } from "../../servies/auth";
import AfterSendEmailInfo from "./components/AfterSendEmailInfo";

export default function CreateAdmin() {
  const [error, setError] = useState("");

  const [createAdminForm, setCreateAdminForm] = useState({
    email: "",
    realName: "",
    password: "",
  });

  const [checkedPassword, setCheckedPassword] = useState("");
  const [sendEmail, setSendEmail] = useState(false);

  const onCheckedPassword = () => {
    if (createAdminForm.password === checkedPassword) {
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateAdminForm(AdminInfo => ({ ...AdminInfo, [name]: value }));
    setCheckedPassword(checkedPassword);
  };

  const handleCreateAdmin = async (e: any) => {
    if (createAdminForm.realName === "") return alert("이름을 입력해주세요.");
    if (createAdminForm.email === "") return alert("이메일을 입력해주세요.");
    if (createAdminForm.password === "") return alert("비밀번호를 입력해주세요.");
    // if (checkedPassword === "") return alert("비밀번호를 확인해주세요.");
    e.preventDefault();

    try {
      const res = await fetchSignupAdmin(createAdminForm);
      console.log(res);
      setSendEmail(true);
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || "에러가 발생했습니다.";
      setError(errorMessage);
    }
  };

  return (
    <Wrapper>
      <Img src={imgPaths.ELICE_LOGO} />
      <Title>관리자 계정 등록하기</Title>
      {sendEmail ? (
        <AfterSendEmailInfo />
      ) : (
        <>
          <InputFiled onChange={onChange} name="realName" value={createAdminForm.realName} placeholder="name" type="text" required />
          <InputFiled onChange={onChange} name="email" value={createAdminForm.email} placeholder="email" type="email" required />
          <InputFiled onChange={onChange} name="password" value={createAdminForm.password} placeholder="password" type="password" required />
          <InputFiled
            error={error}
            onChange={onChange}
            name="checkedPassword"
            value={checkedPassword}
            placeholder="checked password"
            type="text"
            required
          />
          <Btn onClick={handleCreateAdmin}>이메일 인증하기</Btn>

          <Text>
            이미 회원이신가요? <Link to={paths.LOGIN}>로그인하기&rarr;</Link>
          </Text>
        </>
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
  margin: 50px 0 10px 0;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  margin-bottom: 14px;
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
