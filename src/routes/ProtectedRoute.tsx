import { useNavigate, Outlet } from "react-router-dom";
import { paths } from "../utils/path";
import { useEffect, useState } from "react";
import { AxiosUser } from "../services/user";
import Header from "../layout/Header";
import styled from "styled-components";

export const ProtectedRoute = () => {
  const [adminMenu, setAdminMenu] = useState(false);

  const navigate = useNavigate();

  /** 유저정보를 확인하고 관리자인지 식별하는 함수 */
  const fetchGetUser = async () => {
    try {
      const res = await AxiosUser.getCurrentUser();

      if (res.statusCode === 200) {
        const data = res.data;
        if (data?.role === "ADMIN") {
          setAdminMenu(true);
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
      <Header adminMenu={adminMenu} />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </Container>
  );

  // return isLogin ? <>{element} </> : <Navigate to={paths.LOGIN} replace state={{ redirectedFrom: curruntLocation }} />;
};

const Container = styled.div`
  position: relative;
  width: 100dvw;
  height: 100%;

  margin-top: 68px;
`;

const Wrapper = styled.div``;
