import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { paths } from "../../utils/path";

function Intro() {
  const navigate = useNavigate();
  return (
    <Wrapper>
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
    </Wrapper>
  );
}

export default Intro;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
`;
const BoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
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
`;

const Text = styled.p`
  font-size: 0.8rem;
`;
