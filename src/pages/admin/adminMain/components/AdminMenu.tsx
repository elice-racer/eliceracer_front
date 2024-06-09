import { styled } from "styled-components";
import { paths } from "../../../../utils/path";
import { Link } from "react-router-dom";

function AdminMenu() {
  return (
    <Container>
      <Wrapper>
        <FastLinkItem to={paths.ADD_USERS}>빠른 파일 업로드</FastLinkItem>
        <FastLinkItem to={paths.ADMIN_ADD_NOTICE}>빠른 공지 등록</FastLinkItem>
      </Wrapper>
      <Wrapper>
        <LinkItem to={paths.ADMIN_NOTICE_LIST}>
          <Text>공지</Text>
        </LinkItem>
        <LinkItem to={paths.OFFICE_HOUR}>
          <Text>오피스아워</Text>
        </LinkItem>
        <LinkItem to={paths.ALERT}>
          <Text>공지 및</Text>
          <Text>출결 알림</Text>
        </LinkItem>
      </Wrapper>
      <Wrapper>
        <LinkItem to={paths.ADMIN_PROJECTS}>프로젝트</LinkItem>
        <LinkItem to={paths.ADMIN_SEARCH_USERS}>
          <Text>트랙 및 </Text>
          <Text>레이서 조회</Text>
        </LinkItem>
        <LinkItem to={paths.ADMIN_SETTINGS_CHAT}>채팅방 관리</LinkItem>
      </Wrapper>
    </Container>
  );
}

export default AdminMenu;

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

  background-color: ${({ theme }) => theme.colors.purple2};
  color: #000;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

  &:hover {
    transform: scale(1.06);

    background-color: ${({ theme }) => theme.colors.purple3};
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

  background-color: ${({ theme }) => theme.colors.purple1};
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
