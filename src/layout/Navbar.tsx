import { Link } from "react-router-dom";
import styled from "styled-components";
import { paths } from "../utils/path";
import { imgPaths } from "../utils/path";

export const Navbar = () => {
  return (
    <Header>
      <Nav>
        <Link to={paths.HOME}>홈</Link>
        <Link to={paths.LOGIN}>로그인</Link>
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

export const AdminNavbar = () => {
  return (
    <TopNav>
      <Flex>
        <Relative to={paths.HOME}>
          <Img src={imgPaths.ELICE_LOGO} alt="logo" />
        </Relative>
        <Wrapper>
          <LinkItem>
            <Link to={"https://elice-lab.imweb.me/"}>엘리스랩</Link>
          </LinkItem>
          <LinkItem>
            <Link to={"https://elice.io/ko"}>엘리스홈</Link>
          </LinkItem>
          <LinkItem>
            <Link to={paths.MYPAGE}>마이페이지</Link>
          </LinkItem>
          <LinkItem>
            <Link to={paths.LOGIN}>로그아웃</Link>
          </LinkItem>
        </Wrapper>
      </Flex>
    </TopNav>
  );
};

const Img = styled.img`
  width: 12rem;
  padding: 10px;

  position: absolute;
  left: 0px;
  top: 50%;
  transform: translateY(-50%);
`;

const TopNav = styled.header`
  width: 100%;

  background-color: #fff;
  position: relative;
`;

const Flex = styled.div`
  display: flex;
  gap: 4px;
  top: 0;
  height: 56px;
  width: 100%;
  justify-content: flex-end;
`;

const Relative = styled(Link)`
  position: relative;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
const LinkItem = styled.p`
  width: 68px;
  text-align: center;
  color: #000;
  /* background-color: blue; */

  /* &::after {
    content: "";
    width: 1px;
    height: 4px;
    background-color: red;
    padding: 1px;
  } */
`;
