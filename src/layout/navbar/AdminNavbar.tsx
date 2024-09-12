import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { paths } from "../../utils/path";

function AdminNavbar() {
  const navigate = useNavigate();
  const currentUrl = window.location.pathname;
  return (
    <Container>
      <Flex>
        <Wrapper
          onClick={() => {
            navigate(paths.ADMIN);
          }}
          active={currentUrl === paths.ADMIN}
        >
          <Text>
            📂
            <br />
            빠른 <br />
            파일 업로드
          </Text>
        </Wrapper>
        <Wrapper
          onClick={() => {
            navigate(paths.TRACKS_SETTINGS);
          }}
          active={currentUrl.includes(paths.TRACKS_SETTINGS)}
        >
          <Text>
            🏁
            <br />
            트랙 관리
          </Text>
        </Wrapper>
        <Wrapper
          onClick={() => {
            alert("준비 중입니다.");
          }}
          active={currentUrl.includes(paths.ALERT)}
        >
          <Text>
            🔔
            <br />
            알림 생성
          </Text>
        </Wrapper>
        <Wrapper onClick={() => navigate(paths.ADMIN_NOTICE_LIST)} active={currentUrl.includes(paths.ADMIN_NOTICE_LIST)}>
          <Text>
            📣
            <br />
            공지
          </Text>
        </Wrapper>
        <Wrapper onClick={() => navigate(paths.UPDATE_OFFICE_HOUR)} active={currentUrl.includes(paths.UPDATE_OFFICE_HOUR)}>
          <Text>
            🕘
            <br />
            오피스아워 <br />
            시간 변경
          </Text>
        </Wrapper>
        <Wrapper onClick={() => navigate(paths.ADMIN_PROJECTS)} active={currentUrl.includes(paths.ADMIN_PROJECTS)}>
          <Text>
            👨‍💻
            <br />
            프로젝트
          </Text>
        </Wrapper>
        <Wrapper onClick={() => navigate(paths.ADMIN_SEARCH_USERS)} active={currentUrl.includes(paths.ADMIN_SEARCH_USERS)}>
          <Text>
            👥
            <br />
            사용자 조회
          </Text>
        </Wrapper>
        <Wrapper onClick={() => navigate(paths.ADMIN_SETTINGS_CHAT)} active={currentUrl.includes(paths.ADMIN_SETTINGS_CHAT)}>
          <Text>
            💬
            <br />
            채팅방 관리
          </Text>
        </Wrapper>
      </Flex>
    </Container>
  );
}

export default AdminNavbar;

const Container = styled.div`
  width: 200px;
  height: 100dvh;
  margin-top: -82px;
  background-color: ${({ theme }) => theme.colors.purple0};
`;

const Flex = styled.nav`
  margin-top: 70px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 16px;
`;

const Wrapper = styled.li<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.6rem;
  padding: 12px 0;
  cursor: pointer;
  :hover {
    transition: ease-in-out 0.3s;
    transform: scale(1.2);
    border-radius: 12px;
  }
  background-color: ${({ active }) => (active ? "#dfd6ff" : "none")};
`;

const Text = styled.p`
  text-align: center;
`;
