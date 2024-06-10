import { Link } from "react-router-dom";
import styled from "styled-components";
import { paths } from "../utils/path";
import { imgPaths } from "../utils/path";
import { useNavigate } from "react-router-dom";
import { tokenAtom } from "../recoil/TokenAtom";
import { useSetRecoilState } from "recoil";

const Header = ({ adminMenu }: any) => {
  const navigate = useNavigate();

  const setToken = useSetRecoilState(tokenAtom);
  const onClickLogout = () => {
    // 액세스토큰 스토리지에서 삭제
    localStorage.removeItem("userToken");

    // 리코일 초기화
    setToken(null);

    // 홈으로 넘기기
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
            <Link to={"https://elice-lab.imweb.me/"}>엘리스랩</Link>
          </LinkItem>
          <LinkItem>
            <Link to={"https://elice.io/ko"}>엘리스홈</Link>
          </LinkItem>
          <LinkItem>
            <Link to={paths.MYPAGE}>마이페이지</Link>
          </LinkItem>

          <LinkItem onClick={onClickLogout}>
            <>로그아웃</>
          </LinkItem>
        </Wrapper>
      </Flex>
    </Container>
  );
};

export default Header;

const Img = styled.img`
  width: 12rem;
  padding: 10px;

  position: absolute;
  left: 0px;
  top: 50%;
  transform: translateY(-50%);
`;

const Container = styled.header`
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

  cursor: pointer;
  /* background-color: blue; */

  /* &::after {
    content: "";
    width: 1px;
    height: 4px;
    background-color: red;
    padding: 1px;
  } */
`;
