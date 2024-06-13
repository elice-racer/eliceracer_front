import { styled } from "styled-components";

function CheckedVersion({ ...props }) {
  return (
    <Container {...props}>
      <Wrapper>
        <Text>version 0.0.1</Text>
      </Wrapper>
      <Wrapper>
        <Text>해당 사이트 관련 문의나 요청 사항, 피드백 등등 아래 폼을 통해 자유롭게 의견 남겨주세요.</Text>
        <Button onClick={() => {}}>의견 제출하기</Button>
      </Wrapper>
    </Container>
  );
}

export default CheckedVersion;

const Container = styled.div`
  @media ${({ theme }) => theme.device.mobileL} {
    display: none;
  }
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.gray2};
`;

const Button = styled.a`
  text-decoration: none;
  height: 42px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.purple1};
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Wrapper = styled.div``;
