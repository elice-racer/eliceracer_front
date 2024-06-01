import { Link } from "react-router-dom";
import styled from "styled-components";
import { paths } from "../../../utils/path";

function AfterSendEmailInfo() {
  return (
    <Container>
      <TextWrapper>
        <Text>환영합니다!</Text>
        <Text>정보가 등록되었습니다. </Text>
        <Text> 이메일 인증 후 로그인해주세요.</Text>
      </TextWrapper>
      <Btn to={paths.LOGIN}>로그인하러 가기</Btn>
    </Container>
  );
}

export default AfterSendEmailInfo;

const Container = styled.p`
  width: 100%;
  height: 60px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.gray2};
  font-size: 1.2rem;
`;

const Btn = styled(Link)`
  text-align: center;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.puple2};
  width: 160px;
  height: 52px;
`;
