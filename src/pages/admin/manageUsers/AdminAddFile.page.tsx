import { styled } from "styled-components";
import GetUsers from "./components/GetUsers";

function AdminAddFile() {
  return (
    <Container>
      <Title>유저 정보 등록하기</Title>
      <Text>유저 정보를 등록하려면 아래 파일을 업로드하세요.</Text>
      <Input type="file" accept=".xlsx, .xls, .csv" />
      <Text>아래는 파일에서 받아온 유저정보입니다.</Text>
      <GetUsers />
    </Container>
  );
}
export default AdminAddFile;

const Container = styled.div`
  width: 100dvw;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const Title = styled.h1`
  font-size: 1.4rem;
`;

const Text = styled.p``;

const Input = styled.input``;
