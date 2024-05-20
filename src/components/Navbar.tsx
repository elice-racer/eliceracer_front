import { Link } from "react-router-dom";
import styled from "styled-components";

export const Navbar = () => {
  return (
    <Header>
      <Nav>
        <Link to={"/"}>홈</Link>
        <Link to={"/login"}>로그인</Link>
      </Nav>
    </Header>
  );
};

const Header = styled.header`
  width: 100%;
  height: 72px;
  border-bottom: 1px solid var(--line-gray);
  display: flex;
`;

const Nav = styled.div`
  width: 300px;
`;
