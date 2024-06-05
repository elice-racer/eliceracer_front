import styled from "styled-components";
import { paths } from "../../utils/path";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <Container>
      <Wrapper>
        <FastLinkItem to={paths.NOTICE_LIST}>공지 확인</FastLinkItem>
        <FastLinkItem to={paths.OFFICE_HOUR_SCHEDULE}>오피스아워 확인</FastLinkItem>
      </Wrapper>
      <Wrapper>
        <LinkItem to={paths.MYPAGE}>
          <Text>마이페이지</Text>
        </LinkItem>
        <LinkItem to={paths.CHAT_LIST}>
          <Text>채팅 바로가기</Text>
        </LinkItem>
        <LinkItem to={paths.MY_ALERT}>
          <Text>내 알림</Text>
        </LinkItem>
      </Wrapper>
      <Wrapper>
        <LinkItem to={paths.MY_PROJECT_LIST}>내 프로젝트</LinkItem>
        <LinkItem to={paths.SETTINGS}>
          <Text>설정</Text>
        </LinkItem>
        <LinkItem to={paths.ADMIN_SETTINGS_CHAT}>서비스 문의 및 버전</LinkItem>
      </Wrapper>
    </Container>
  );
}

export default Menu;

/**
 * menu안에 있을 것들
 * mypage^
 * 설정^
 * 오피스아워 확인^
 * 내 프로젝트 확인^
 * 공지확인^
 * 서비스 문의 및 버전 확인^
 *
 */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const FastLinkItem = styled(Link)`
  display: flex;
  width: 120px;
  height: 40px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  background-color: ${({ theme }) => theme.colors.puple2};
  color: #000;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  &:hover {
    transform: scale(1.06);

    background-color: ${({ theme }) => theme.colors.puple3};
    color: #fff;
    transition: 0.5s;
    /* box-shadow: inset 0 0 10px; */
  }
`;

const LinkItem = styled(Link)`
  display: flex;
  flex-direction: column;
  width: 78px;
  height: 60px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  background-color: ${({ theme }) => theme.colors.puple1};
  color: #000;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  &:hover {
    transform: scale(1.06);
    color: ${({ theme }) => theme.colors.gray2};
    transition: 0.5s;
  }
`;

const Text = styled.p`
  text-align: center;
`;
