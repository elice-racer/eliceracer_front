import styled from "styled-components";
import { imgPaths } from "../../utils/path";
import { useNavigate } from "react-router-dom";

function EmptyData() {
  const navigate = useNavigate();
  return (
    <Container>
      <Flex>
        <Img src={imgPaths.EMPTY} alt="Not Found" />
        <TextWrapper>
          <Text>등록된 데이터가 없습니다.</Text>
          <Text>관리자에게 문의해주세요.</Text>
        </TextWrapper>
        <BackButton
          onClick={() => {
            navigate(-1);
          }}
        >
          뒤로 가기
        </BackButton>
      </Flex>
    </Container>
  );
}

export default EmptyData;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Flex = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  width: 120px;
  height: 120px;
`;

const Text = styled.h1`
  font-size: 1.4rem;
`;

const BackButton = styled.div`
  border: solid 2px ${({ theme }) => theme.colors.purple2};
  border-radius: 6px;
  font-size: 1.4rem;
  padding: 4px 30px;
  text-align: center;
  font-weight: 600;

  &:hover {
    background-color: ${({ theme }) => theme.colors.purple2};
    color: #fff;
    transition: 0.1s ease-in;
  }
`;

const TextWrapper = styled.div``;
