import styled from "styled-components";
import { imgPaths } from "../../utils/path";

function SuccessAuthEmail() {
  return (
    <Container>
      <Flex>
        <Img src={imgPaths.SUCCESS_CREATE_USERS} alt="Success" />
        <Text>이메일 인증이 완료되었습니다!</Text>
        <Button>
          <Text>이메일 인증 바로가기</Text>
        </Button>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 500px;
  height: 500px;
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
  width: 30%;
  color: ${({ theme }) => theme.colors.purple0};
  height: 32px;
`;
