import styled from "styled-components";
import { imgPaths, paths } from "../../utils/path";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SuccessCreateUsers() {
  const navigate = useNavigate();
  return (
    <Container>
      <Flex>
        <Img src={imgPaths.SUCCESS_CREATE_USERS} alt="Not Found" />
        <Text>회원가입을 완료하였습니다!</Text>
        <StyledButton onClick={() => navigate(paths.LOGIN)}>로그인하러가기</StyledButton>
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
  height: 100vh;
`;

const StyledButton = styled(Button)`
  background-color: #6643db !important;
  width: 100%;
  height: 36px;

  color: #fff !important;

  font-weight: bold !important;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 240px;
  height: 240px;
`;

const Text = styled.h1`
  margin-top: 24px;
  margin-bottom: 24px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.gray3};
`;
