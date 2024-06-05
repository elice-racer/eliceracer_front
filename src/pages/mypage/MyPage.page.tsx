import styled from "styled-components";
import Btn from "../../components/commons/Btn";
import { imgPaths } from "../../utils/path";

function MyPage() {
  return (
    <Container>
      <Header>
        <Title>프론트엔드 : 진채영</Title>
        <BtnWrapper>
          <Btn childen="수정하기" />
        </BtnWrapper>
      </Header>
      <Wrapper>
        <BasicInfoWrapper>
          <ImgWrapper>
            <Img src={imgPaths.DEFAULT_PROFILE_IMG} alt="기본이미지" />
          </ImgWrapper>
          <UserInfoWrapper></UserInfoWrapper>
        </BasicInfoWrapper>
        <SubTitle>업적</SubTitle>
        <AchievBox></AchievBox>
        <SubTitle>나의 TMI</SubTitle>
        <TMIBox></TMIBox>
      </Wrapper>
    </Container>
  );
}
export default MyPage;

const Container = styled.div`
  width: 470px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const Title = styled.h1``;

const SubTitle = styled.h2``;

const BtnWrapper = styled.div``;

const BasicInfoWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ImgWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  width: 160px;
  padding-top: 30px;
  background-color: ${({ theme }) => theme.colors.gray1};
`;

const Img = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
  object-position: center center;
`;

const UserInfoWrapper = styled.div`
  width: 300px;
  height: 300px;
  background-color: ${({ theme }) => theme.colors.gray1};
`;

const AchievBox = styled.div`
  width: 470px;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.gray1};
`;

const TMIBox = styled.div`
  width: 470px;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.gray1};
`;
