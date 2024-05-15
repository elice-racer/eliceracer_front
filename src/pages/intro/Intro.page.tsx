import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

function Intro() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Text>포지션을 선택해주세요.</Text>
      <BoxWrapper>
        <Box onClick={() => navigate("/create-account")}>
          <p>레이서</p>
        </Box>
        <Box onClick={() => navigate("/create-admin")}>
          <p>관리자</p>
        </Box>
      </BoxWrapper>
      <Text>
        이미 회원이신가요? <Link to="/login">로그인하기&rarr;</Link>
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
  background-color: #b67bff;
  width: 80px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 14px;
  cursor: pointer;
`;

const Text = styled.p`
  color: #dbdbdb;
  font-size: 0.8rem;
`;
