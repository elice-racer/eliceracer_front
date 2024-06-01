import { Outlet } from "react-router-dom";
import { AdminNavbar, Navbar } from "./Navbar";
import styled from "styled-components";

export const NavLayout = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

export const Layout = () => {
  return (
    <Container>
      <Wrapper>
        <Outlet />
      </Wrapper>
    </Container>
  );
};

export const AdminLayout = () => {
  return (
    <Container>
      <AdminNavbar />
      <Outlet />
    </Container>
  );
};

export const IntroLayout = () => {
  return (
    <div>
      하하ㅣ 인트로 네브바 만들기
      <Outlet />
      이이ㅣㅇ
    </div>
  );
};

const Container = styled.div`
  position: relative;
  width: 100dvw;
  height: 100%;
`;

const Wrapper = styled.div``;
