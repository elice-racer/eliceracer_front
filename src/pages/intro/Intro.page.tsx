import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { paths } from "../../utils/path";

function Intro() {
  const navigate = useNavigate();
  return (
    <Container>
      <Text>포지션을 선택해주세요.</Text>
      <BoxWrapper>
        <Box onClick={() => navigate(paths.CREATE_USER)}>
          <p>레이서</p>
        </Box>
        <Box onClick={() => navigate(paths.CREATE_ADMIN)}>
          <p>관리자</p>
        </Box>
      </BoxWrapper>
      <Text>
        이미 회원이신가요? <Link to={paths.LOGIN}>로그인하기&rarr;</Link>
      </Text>
    </Container>
  );
}

export default Intro;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;

  height: 100vh;
  text-align: center;
`;
const BoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  @media ${({ theme }) => theme.device.mobileL} {
    flex-direction: column;
    gap: 4px;
  }
`;

const Box = styled.div`
  background-color: ${({ theme }) => theme.colors.purple2};
  width: 80px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  cursor: pointer;

  p {
    color: #fff;
    font-weight: bold;

    @media ${({ theme }) => theme.device.mobileL} {
      font-size: 1.2rem;
    }
  }

  @media ${({ theme }) => theme.device.mobileL} {
    flex-direction: column;
    height: 48px;
    width: 100px;
  }
`;

const Text = styled.p`
  font-size: 1.2rem;
`;
