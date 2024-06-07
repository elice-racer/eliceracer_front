import styled from "styled-components";
import { imgPaths, paths } from "../utils/path";
import { Link, useNavigate } from "react-router-dom";
import Btn from "./commons/Btn";

const UsersData = {
  id: 1,
  email: "jiop96@naver.com",
  username: "jiop96",
  realName: "진채영",
  phoneNumber: "01034663728",
  comment: "안녕하세요. 프론트엔드 개발을 하고 있습니다.",
  position: "프론트",
  skill: "React",
  github: "https://github.com/elice-racer/eliceracer_front/tree/feat/mypage",
  blog: "velog.io",
  sns: "https://www.instagram.com/_aeng2",
  description: "헬로",
  role: "racer",
  status: 1,
  track: "AI8",
  teams: "최강팀",
};

const UserSkill = ["React", "Node", "Next.js"];

function UsersMiniProfile() {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <ImgWrapper>
          <UserProfileImg src={imgPaths.DEFAULT_PROFILE_IMG} />
        </ImgWrapper>
      </Header>
      <Body>
        <ColWrapper>
          <Wrapper>
            <Title>{UsersData.realName}</Title>
            <Text className="subInfo">{UsersData.role}🏁</Text>
          </Wrapper>
          <Text className="subInfo">{UsersData.track}</Text>

          <SubTitle>보유 스택</SubTitle>
          <SkillInfoWrapper>
            {UserSkill.map(item => (
              <Text className="skill">{item}</Text>
            ))}
          </SkillInfoWrapper>
          <Link to={UsersData.github}>깃허브 바로가기</Link>
          <Wrapper>
            <SubTitle>진행한 프로젝트 :</SubTitle>
            <Text>{UsersData.id}</Text>
          </Wrapper>
          <SubTitle>업적</SubTitle>
          <Text>성실한 엘리스</Text>
        </ColWrapper>
        <ButtonWrapper>
          <Btn children="더보기" onClick={() => navigate(paths.MYPAGE)} />
        </ButtonWrapper>
      </Body>
    </Container>
  );
}

export default UsersMiniProfile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 350px;
  height: 100vh;
  border-radius: 8px;
  background-color: #ffffff7d;
`;

const Header = styled.div`
  height: 240px;
`;

const ImgWrapper = styled.div`
  border-radius: 100px;
  width: 160px;
  height: 160px;
  padding: 50px 20px 0 30px;
`;

const UserProfileImg = styled.img`
  border-radius: 100px;
  width: 160px;
  height: 160px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
`;

const ColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const SkillInfoWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1``;

const SubTitle = styled.h2``;

const Text = styled.p`
  &.subInfo {
    color: ${({ theme }) => theme.colors.gray2};
  }
  &.skill {
    background-color: ${({ theme }) => theme.colors.blue2};
    padding: 2px 6px;
    border-radius: 12px;
  }
`;
