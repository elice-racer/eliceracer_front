import styled from "styled-components";
import AdminMenu from "./components/AdminMenu";

function AdminMain() {
  return (
    <Container>
      <Wrapper>
        <AdminMenu />
      </Wrapper>
    </Container>
  );
}

export default AdminMain;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  width: 100%;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
