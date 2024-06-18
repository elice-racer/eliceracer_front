import { useNavigate, Outlet } from "react-router-dom";
import { paths } from "../utils/path";
import { useEffect, useState } from "react";
import { AxiosUser } from "../services/user";
import Header from "../layout/Header";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { currentUserAtom } from "../recoil/UserAtom";

export const ProtectedRoute = () => {
  const [adminMenu, setAdminMenu] = useState(false);
  const setCurrentUser = useSetRecoilState(currentUserAtom);

  const navigate = useNavigate();

  const NotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") alert("브라우저에서 알람을 설정해주세요.");
  };

  /** 유저정보를 확인하고 관리자인지 식별하는 함수 */
  const fetchGetUser = async () => {
    try {
      const res = await AxiosUser.getCurrentUser();

      if (res.statusCode === 200) {
        const currentUser = res.data;
        if (currentUser) {
          setCurrentUser(currentUser);
        }
        if (currentUser?.role === "ADMIN") {
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

  useEffect(() => {
    NotificationPermission();
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
  height: 100%;
  width: 100%;
  margin-top: 56px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 12px;
`;
