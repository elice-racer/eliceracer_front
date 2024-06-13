import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { paths } from "../utils/path";
import { useState } from "react";
import MobileHeader from "./MobileHeader";

function IntroHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <Container>
      <Flex>
        <Wrapper>
          <LinkItem>
            <a href={"https://elice-lab.imweb.me/"}>엘리스랩</a>
          </LinkItem>
          <LinkItem>
            <a href={"https://elice.io/ko"}>엘리스홈</a>
          </LinkItem>
          <Relative to={paths.INTRO}>
            <>회원가입</>
          </Relative>
          <Relative to={paths.LOGIN}>
            <>로그인</>
          </Relative>
        </Wrapper>
      </Flex>
      <MobileHeader isOpen={isOpen} toggleMenu={toggleMenu}>
        <ul>
          <li>
            <a href={"https://elice-lab.imweb.me/"}>엘리스랩</a>
          </li>
          <li>
            <a href={"https://elice.io/ko"}>엘리스홈</a>
          </li>
          <li>
            <Relative to={paths.INTRO}>
              <>회원가입</>
            </Relative>
          </li>
          <li>
            <Relative to={paths.LOGIN}>
              <>로그인</>
            </Relative>
          </li>
        </ul>
      </MobileHeader>
    </Container>
  );
}

export default IntroHeader;

const Container = styled.header`
  width: 100%;
  background-color: #fff;
  position: fixed;
  top: 0;
`;

// const Anchor = styled.a`
//   padding: 0;
// `;

const Flex = styled.div`
  display: flex;
  gap: 4px;
  height: 56px;
  width: 100%;
  justify-content: flex-end;

  @media ${({ theme }) => theme.device.mobileL} {
    display: none;
  }
`;

const Relative = styled(Link)`
  position: relative;
  width: 80px;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const LinkItem = styled.p`
  width: 80px;
  text-align: center;

  /* background-color: blue; */

  /* &::after {
    content: "";
    width: 1px;
    height: 4px;
    background-color: red;
    padding: 1px;
  } */
`;
