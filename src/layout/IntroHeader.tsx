import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { paths } from "../utils/path";

function IntroHeader() {
  return (
    <Container>
      <Flex>
        <Wrapper>
          <LinkItem>
            <Link to={"https://elice-lab.imweb.me/"}>엘리스랩</Link>
          </LinkItem>
          <LinkItem>
            <Link to={"https://elice.io/ko"}>엘리스홈</Link>
          </LinkItem>
          <Relative to={paths.INTRO}>
            <>회원가입</>
          </Relative>
          <Relative to={paths.LOGIN}>
            <>로그인</>
          </Relative>
        </Wrapper>
      </Flex>
    </Container>
  );
}

export default IntroHeader;

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
