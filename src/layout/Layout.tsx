import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const NavLayout = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

export const Layout = () => {
  return <Outlet />;
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
