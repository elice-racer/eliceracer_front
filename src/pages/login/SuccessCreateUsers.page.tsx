import styled from "styled-components";
import { imgPaths, paths } from "../../utils/path";
import Btn from "../../components/commons/Btn";
import { useNavigate } from "react-router-dom";

function SuccessCreateUsers() {
  const navigate = useNavigate();
  return (
    <Container>
      <Flex>
        <Img src={imgPaths.SUCCESS_CREATE_USERS} alt="Not Found" />
        <Text>회원가입을 완료하였습니다!</Text>
        <Btn children="로그인하러가기" onClick={() => navigate(paths.LOGIN)} />
      </Flex>
    </Container>
  );
}

export default SuccessCreateUsers;

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
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.purple3};
`;
