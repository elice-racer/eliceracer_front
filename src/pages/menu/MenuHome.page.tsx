import styled from "styled-components";
import UsersMenu from "./components/UsersMenu";
import NoticeChatRoom from "./components/NoticeChatRoom";
import UsersMiniProfile from "../../components/user/UsersMiniProfile";

function MenuHome() {
  return (
    <Container>
      <SideSection>
        <NoticeChatRoom />
      </SideSection>
      <MainSection>
        <TitleWrapper>
          <Title>(data:유저 이름)님, 환영합니다!</Title>
          <QuotesWrapper>
            <Text>"(Staticdata: 개발관련 명언)"</Text>
          </QuotesWrapper>
        </TitleWrapper>
        <LinkWrapper>
          <SubTitle>(data:트랙 정보)의 노션 바로가기</SubTitle>
          <SubTitle>(data:프로젝트 깃랩)프로젝트 Gitlab바로가기</SubTitle>
        </LinkWrapper>
        <UsersMenu />
      </MainSection>
      <SideSection>
        <UsersMiniProfile />
      </SideSection>
    </Container>
  );
}
export default MenuHome;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const SideSection = styled.div`
  width: 420px;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.purple1};
`;

const MainSection = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 500px;
  height: 120px;
  background-color: ${({ theme }) => theme.colors.purple1};
`;

const QuotesWrapper = styled.div``;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 500px;
  height: 120px;
  background-color: ${({ theme }) => theme.colors.gray1};
`;

const Title = styled.h1``;
const SubTitle = styled.h2``;
const Text = styled.p``;
