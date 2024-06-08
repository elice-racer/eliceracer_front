import styled from "styled-components";
import { imgPaths } from "../../utils/path";

function Notfound() {
  return (
    <Container>
      <Flex>
        <Img src={imgPaths.NOT_FOUND} alt="Not Found" />
        <Text>페이지를 찾을 수 없습니다</Text>
      </Flex>
    </Container>
  );
}

export default Notfound;

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
  color: ${({ theme }) => theme.colors.puple3};
`;
