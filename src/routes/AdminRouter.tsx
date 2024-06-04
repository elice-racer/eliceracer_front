import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../layout/Header";
import { paths } from "../utils/path";
import styled from "styled-components";
import { AxiosUser } from "../servies/user";

export const AdminRouter = () => {
  const navigate = useNavigate();

  /** 유저정보를 확인하고 관리자인지 식별하는 함수 */
  const fetchGetUser = async () => {
    try {
      const res = await AxiosUser.getUserInfo();

      if (res.status === 200) {
        const { data } = res.data;

        if (data.role !== "ADMIN") {
          alert("관리자 권한만 접근가능합니다.");
          navigate(paths.HOME);
        }
      }
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || "에러가 발생했습니다.";
      console.log(errorMessage);
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
      <Header />
      <Outlet />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100dvw;
  height: 100%;
`;
