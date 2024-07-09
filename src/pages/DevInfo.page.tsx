import styled from "styled-components";
import { imgPaths } from "../utils/path";

function DevInfo() {
  return (
    <Container>
      <InfoWrapper>
        <Img src={imgPaths.NO_AVAILABLE} alt="Coming Soon" />
        <Text>현재 서비스 점검 중입니다!</Text>
        <Text>더 나은 EliceRacer App 서비스로 돌아오겠습니다.</Text>
      </InfoWrapper>
    </Container>
  );
}

export default DevInfo;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 34px;
`;

const Img = styled.img`
  max-width: 20rem;
  height: auto;
  margin-bottom: 20px;
`;

const Text = styled.h2``;
