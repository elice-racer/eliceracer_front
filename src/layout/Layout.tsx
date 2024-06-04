import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AdminNavbar, Navbar } from "./Navbar";
import { paths } from "../utils/path";
import styled from "styled-components";
import { AxiosUser } from "../servies/user";

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
  const navigate = useNavigate();

  /** 유저정보를 확인하고 관리자인지 식별하는 함수 */
  const fetchGetUser = async () => {
    try {
      const res = await AxiosUser.getUserInfo();

      if (res.status === 200) {
        const { data } = res.data;

        if (data.role !== "ADMIN") {
          alert("관리자가 아니여서 리다이렉트 합니다");
          navigate(paths.HOME);
        }
      }
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || "에러가 발생했습니다.";
      navigate(paths.LOGIN);
    }
  };

  useEffect(() => {
    const access_token = localStorage.getItem("userToken");
    if (!access_token) {
      navigate(paths.LOGIN);
    } else {
      fetchGetUser();
    }
  }, []);

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
