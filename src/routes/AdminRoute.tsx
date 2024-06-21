import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../layout/Header";
import { paths } from "../utils/path";
import styled from "styled-components";
import { AxiosUser } from "../services/user";
import { useSetRecoilState } from "recoil";
import { currentUserAtom } from "../recoil/UserAtom";
import AdminNavbar from "../layout/navbar/AdminNavbar";

export const AdminRoute = () => {
  const navigate = useNavigate();
  const setCurrentUser = useSetRecoilState(currentUserAtom);

  /** 유저정보를 확인하고 관리자인지 식별하는 함수 */
  const fetchGetUser = async () => {
    try {
      const res = await AxiosUser.getCurrentUser();

      if (res.statusCode === 200) {
        const currentUser = res.data;

        if (currentUser) {
          setCurrentUser(currentUser);
        }

        if (currentUser?.role !== "ADMIN") {
          alert("관리자 권한만 접근가능합니다.");
          navigate(paths.HOME);
        }
      }
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || "에러가 발생했습니다.";
      console.error(errorMessage);
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
      <Flex>
        <AdminNavbar />
        <Outlet />
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100dvw;
  height: 100%;
  margin-top: 68px;
`;

const Flex = styled.div`
  display: flex;
`;
