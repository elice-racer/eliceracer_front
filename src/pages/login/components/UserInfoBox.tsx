import styled from "styled-components";

function UserInfoBox() {
  return (
    <Wrapper>
      <Input name="password" placeholder="password" />
      <Input name="confirmPassword" placeholder="checked password" />
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
