import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { paths } from "../../utils/path";

function AdminNavbar() {
  const navigate = useNavigate();
  return (
    <Container>
      <Flex>
        <Wrapper
          onClick={() => {
            navigate(paths.ADD_USERS);
          }}
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
        >
          <Text>
            🔔
            <br />
            알림 생성
          </Text>
        </Wrapper>
        <Wrapper onClick={() => navigate(paths.ADMIN_NOTICE_LIST)}>
          <Text>
            📣
            <br />
            공지
          </Text>
        </Wrapper>
        <Wrapper onClick={() => navigate(paths.UPDATE_OFFICE_HOUR)}>
          <Text>
            🕘
            <br />
            오피스아워 <br />
            시간 변경
          </Text>
        </Wrapper>
        <Wrapper onClick={() => navigate(paths.ADMIN_PROJECTS)}>
          <Text>
            👨‍💻
            <br />
            프로젝트
          </Text>
        </Wrapper>
        <Wrapper onClick={() => navigate(paths.ADMIN_SEARCH_USERS)}>
          <Text>
            👥
            <br />
            사용자 조회
          </Text>
        </Wrapper>
        <Wrapper onClick={() => navigate(paths.ADMIN_SETTINGS_CHAT)}>
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

const Flex = styled.div`
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  align-items: end;
  padding-right: 16px;
  gap: 16px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
  width: 100%;
  cursor: pointer;
  :hover {
    transition: ease-in-out 0.3s;
    transform: scale(1.2);
    border-radius: 12px;
  }
`;

const Text = styled.p`
  text-align: center;
`;
