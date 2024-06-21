import styled from "styled-components";
import AdminAddOfficeHour from "./components/AdminAddOfficeHour";
import AdminUpdateOfficeHour from "./components/AdminUpdateOfficeHour";
import OfficeHourDataBoard from "./components/OfficeHourDataBoard";

function AdminOfficeHour() {
  return (
    <Container>
      <Button>오피스아워 파일 재등록하러가기</Button>
      <AdminAddOfficeHour />
      <AdminUpdateOfficeHour />
      <OfficeHourDataBoard />
    </Container>
  );
}

export default AdminOfficeHour;

const Container = styled.div`
  width: 100%;
`;

const Button = styled.div`
  height: 30px;
  width: 295px;
`;
