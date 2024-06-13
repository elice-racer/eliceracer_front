import { styled } from "styled-components";
import { imgPaths } from "../../utils/path";

function ComingSoonPage() {
  return (
    <Container>
      <Img src={imgPaths.NO_AVAILABLE} alt="Coming Soon" />
      <Message>준비중인 페이지입니다</Message>
    </Container>
  );
}

export default ComingSoonPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
`;

const Img = styled.img`
  max-width: 20rem;
  height: auto;
  margin-bottom: 20px;
`;

const Message = styled.h1`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colors.primary || "black"};
`;
