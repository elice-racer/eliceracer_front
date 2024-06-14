import styled from "styled-components";
import { imgPaths } from "../../utils/path";

function SuccessAuthEmail() {
  return (
    <Container>
      <Flex>
        <Img src={imgPaths.SUCCESS_CREATE_USERS} alt="Success" />
        <Wrapper>
          <Text>이메일 인증이 완료되었습니다!</Text>
          <Button>이메일 인증 바로가기</Button>
        </Wrapper>
      </Flex>
    </Container>
  );
}

export default SuccessAuthEmail;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Flex = styled.div`
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  justify-content: center;
  align-items: center;
`;
const Img = styled.img`
  width: 160px;
  height: 160px;
`;

const Text = styled.h1`
  font-size: 1.4em;
  color: ${({ theme }) => theme.colors.purple3};
  &.button {
    font-size: 1.2em;
    color: ${({ theme }) => theme.colors.purple3};
  }
`;

const Button = styled.div`
  width: 100%;
  text-align: center;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.purple3};
  color: ${({ theme }) => theme.colors.purple0};
  height: 32px;
  padding: 3px 10px;
  border-radius: 3px;
  cursor: pointer;
`;
