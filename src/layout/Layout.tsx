import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import IntroHeader from "./IntroHeader";
import { AxiosUser } from "../servies/user";
import { useEffect, useState } from "react";

export const NavLayout = () => {
  return <></>;
};

export const Layout = () => {
  const [adminMenu, setAdminMenu] = useState(false);

  /** 유저정보를 확인하고 관리자인지 식별하는 함수 */
  const fetchGetUser = async () => {
    try {
      const res = await AxiosUser.getCurrentUser();

      if (res.status === 200) {
        const { data } = res.data;
        if (data.role === "ADMIN") {
          setAdminMenu(true);
        }
      }
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || "에러가 발생했습니다.";
      console.log(errorMessage);
    }
  };

  useEffect(() => {
    fetchGetUser();
  }, []);

  return (
    <Container>
      <Header adminMenu={adminMenu} />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </Container>
  );
};

export const IntroLayout = () => {
  return (
    <Container>
      <IntroHeader />
      <Outlet />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100dvw;
  height: 100%;
`;

const Wrapper = styled.div``;
