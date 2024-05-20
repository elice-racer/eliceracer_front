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
