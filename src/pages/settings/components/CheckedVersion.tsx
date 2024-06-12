import { styled } from "styled-components";
import Btn from "../../../components/commons/Btn";

function CheckedVersion({ ...props }) {
  return (
    <Container {...props}>
      <Text>version 0.0.1</Text>
      <Text>해당 사이트 관련 문의나 요청 사항, 피드백 등등 아래 메일을 통해 자유롭게 의견 남겨주세요.</Text>
      <Text>모르겠으면 일루~: jieunlim@elicer.com</Text>
      <Text>클라이언트 (프론트) : chaemaa00@gmail.com</Text>
      <Text>서버 : nib@gmail.com</Text>
      <Btn children="문의" onClick={() => {}} />
    </Container>
  );
}

export default CheckedVersion;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.gray2};
`;
