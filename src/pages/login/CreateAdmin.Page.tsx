import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { imgPaths, paths } from "../../utils/path";
import InputFiled from "./components/InputField";
import { AxiosAuth } from "../../servies/auth";
import AfterSendEmailInfo from "./components/AfterSendEmailInfo";

export default function CreateAdmin() {
  const [error, setError] = useState("");

  const [createAdminForm, setCreateAdminForm] = useState({
    email: "",
    realName: "",
    password: "",
    confirmPassword: "",
  });

  const [sendEmail, setSendEmail] = useState(false);

  // todo 정규식 추가 하기
  // const onCheckedPassword = () => {
  //   if (createAdminForm.password === createAdminForm.confirmPassword) {
  //   }
  // };

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateAdminForm(AdminInfo => ({ ...AdminInfo, [name]: value }));
  };

  const handleCreateAdmin = async (e: any) => {
    e.preventDefault();
    if (createAdminForm.realName === "") return alert("이름을 입력해주세요.");
    if (createAdminForm.email === "") return alert("이메일을 입력해주세요.");
    if (createAdminForm.password === "") return alert("비밀번호를 입력해주세요.");
    if (createAdminForm.confirmPassword !== createAdminForm.password) return alert("비밀번호가 일치하지 않습니다.");

    // todo 상태코드 확인후 console.log()삭제하기
    try {
      const { email, password, realName } = createAdminForm;
      const res = await AxiosAuth.fetchSignupAdmin({ email, password, realName });
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
          <InputFiled onChange={onChangeForm} name="realName" value={createAdminForm.realName} placeholder="name" type="text" required />
          <InputFiled onChange={onChangeForm} name="email" value={createAdminForm.email} placeholder="email" type="email" required />
          <InputFiled onChange={onChangeForm} name="password" value={createAdminForm.password} placeholder="password" type="password" required />
          <InputFiled
            error={error}
            onChange={onChangeForm}
            name="confirmPassword"
            value={createAdminForm.confirmPassword}
            placeholder="confirm password"
            type="password"
            required
          />

          {createAdminForm.password !== "" && createAdminForm.confirmPassword !== "" && (
            <>
              {createAdminForm.password === createAdminForm.confirmPassword ? (
                <ConfirmText isConfirm>비밀번호가 일치합니다.</ConfirmText>
              ) : (
                <ConfirmText isConfirm={false}>비밀번호가 일치하지 않습니다.</ConfirmText>
              )}
            </>
          )}

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
// const Error = styled.p`
//   color: tomato;
//   font-size: 0.8rem;
// `;
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

const ConfirmText = styled.p<{ isConfirm: boolean }>`
  color: ${({ isConfirm }) => (isConfirm ? "#b67bff" : "tomato")};
  transition: all 0.3s ease-in;
`;
