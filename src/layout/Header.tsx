import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { paths } from "../utils/path";
import { imgPaths } from "../utils/path";
import { useNavigate } from "react-router-dom";
import { tokenAtom } from "../recoil/TokenAtom";
import { useSetRecoilState } from "recoil";
import { AxiosAuth } from "../servies/auth";
import { currentUserAtom } from "../recoil/UserAtom";
import MobileHeader from "./MobileHeader";

const Header = ({ adminMenu }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const navigate = useNavigate();

  const setToken = useSetRecoilState(tokenAtom);
  const setCurrentUser = useSetRecoilState(currentUserAtom);

  const handleClickLogout = async () => {
    try {
      const res = await AxiosAuth.fetchLogout();
      if (res.data.statusCode === 200) localStorage.removeItem("userToken");
    } catch (e) {
      console.error(e);
    }

    setToken(null);
    setCurrentUser(null);

    navigate(paths.LOGIN);
  };
  return (
    <Container>
      <Flex>
        <Relative to={paths.HOME}>
          <Img src={imgPaths.ELICE_LOGO} alt="logo" />
        </Relative>
        <Wrapper>
          {adminMenu && (
            <LinkItem>
              <Link to={paths.ADMIN}>관리</Link>
            </LinkItem>
          )}
          <LinkItem>
            <Link to={paths.MENU}>메뉴</Link>
          </LinkItem>
          <LinkItem>
            <a href={"https://elice-lab.imweb.me/"}>엘리스랩</a>
          </LinkItem>
          <LinkItem>
            <a href={"https://elice.io/ko"}>엘리스홈</a>
          </LinkItem>
          {/* <LinkItem>
            <Link to={paths.MYPAGE}>마이페이지</Link>
          </LinkItem> */}

          <LinkItem onClick={handleClickLogout}>
            <>로그아웃</>
          </LinkItem>
        </Wrapper>
      </Flex>

      <MobileHeader isOpen={isOpen} toggleMenu={toggleMenu}>
        <ul>
          {adminMenu && (
            <li>
              <LinkItem>
                <Link to={paths.ADMIN}>관리</Link>
              </LinkItem>
            </li>
          )}
          <li>
            <LinkItem>
              <Link to={paths.MENU}>메뉴</Link>
            </LinkItem>
          </li>
          <li>
            <a href={"https://elice-lab.imweb.me/"}>엘리스랩</a>
          </li>
          <li>
            <a
              href={
                "https://aitrack.elice.io/alltracks?_cardType=homeSearch&_from=explore&_landingSectionTrackId=8139&_orientation=vertical&_title=AI%20%ED%8A%B8%EB%9E%99%2011%EA%B8%B0"
              }
            >
              엘리스홈
            </a>
          </li>
          {/* <li>
            <LinkItem>
              <Link to={paths.MYPAGE}>마이페이지</Link>
            </LinkItem>
          </li> */}
          <li>
            <LinkItem onClick={handleClickLogout}>
              <>로그아웃</>
            </LinkItem>
          </li>
        </ul>
      </MobileHeader>
    </Container>
  );
};

export default Header;

const Img = styled.img`
  width: 12rem;
  padding: 10px;

  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);

  @media ${({ theme }) => theme.device.mobileL} {
    width: 60px;
  }
`;

const Container = styled.header`
  width: 100%;
  background-color: #fff;
  position: fixed;
  z-index: 1000;
  top: 0;
`;

const Flex = styled.div`
  display: flex;
  gap: 4px;
  top: 0;
  height: 56px;
  width: 100%;
  justify-content: flex-end;

  @media ${({ theme }) => theme.device.mobileL} {
    display: none;
  }
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

  cursor: pointer;
  @media ${({ theme }) => theme.device.mobileL} {
    width: 40px;
  }
`;
