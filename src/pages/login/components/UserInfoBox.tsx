import styled from "styled-components";

function UserInfoBox({ onClick }: any) {
  return (
    <Wrapper>
      <Input name="password" placeholder="password" />
      <Input name="confirmPassword" placeholder="checked password" />
      <Btn onClick={onClick}>회원가입!</Btn>
    </Wrapper>
  );
}

export default UserInfoBox;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  height: 100%;
  margin-top: 50px;
`;

const Input = styled.input`
  width: 240px;
  height: 30px;
  border-radius: 12px;
  background-color: #eeeafe;
  padding-left: 16px;
  border: none;
`;

const Btn = styled.button`
  border: none;
  width: 230px;
  height: 30px;
  border-radius: 12px;
  color: #fff;
`;
