import styled from "styled-components";
import { imgPaths, paths } from "../../utils/path";
import { Link, useNavigate } from "react-router-dom";
import { UsersPageInfo } from "../../servies/user";

interface UserMiniProfileProps {
  userdata?: UsersPageInfo;
}
function UsersMiniProfile({ userdata }: UserMiniProfileProps) {
  const navigate = useNavigate();

  return (
    <>
      {userdata ? (
        <Container>
          <Header>
            <ImgWrapper>
              <UserProfileImg src={imgPaths.DEFAULT_PROFILE_IMG} />
            </ImgWrapper>
          </Header>
          {userdata ? (
            <Body>
              <ColWrapper>
                <Wrapper>
                  <Title>{userdata.realName}</Title>
                  <Text className="subInfo">{userdata.role} 🏁</Text>
                </Wrapper>
                {userdata.comment ? <Text>{userdata.comment}</Text> : <Text className="subInfo">한 줄 소개를 입력해주세요.</Text>}
                {userdata.track ? (
                  <Text className="subInfo">
                    {userdata.track.trackName}
                    {userdata.track.cardinalNo}
                  </Text>
                ) : (
                  ""
                )}
                <SubTitle>보유 스택</SubTitle>
                <SkillInfoWrapper>
                  {userdata.skills.length === 0 ? (
                    <Text className="subInfo">등록된 기술 스택이 없습니다.</Text>
                  ) : (
                    userdata.skills.map(skill => (
                      <Text className="skill" key={skill.id}>
                        {skill.skillName}
                      </Text>
                    ))
                  )}
                </SkillInfoWrapper>

                {userdata.github ? <Link to={userdata.github ? userdata.github : ""}>깃허브 바로가기</Link> : ""}
                {/* <Wrapper>
                <SubTitle>진행한 프로젝트 :</SubTitle>
                <Text></Text>
              </Wrapper> */}
                <SubTitle>업적</SubTitle>
                <Text className="skill">성실한 엘리스🏆</Text>
              </ColWrapper>
              <ButtonWrapper>
                <Button onClick={() => navigate(paths.MYPAGE)}>더보기</Button>
              </ButtonWrapper>
            </Body>
          ) : (
            ""
          )}
        </Container>
      ) : (
        <Wrapper>
          <Text>유저 정보를 조회할 수 없습니다.</Text>
        </Wrapper>
      )}
    </>
  );
}

export default UsersMiniProfile;

const Container = styled.div`
  flex-direction: column;
  width: 100%;
  border-radius: 8px;
  background-color: #ffffff7d;
`;

const Header = styled.div`
  height: 240px;
`;

const ImgWrapper = styled.div`
  border-radius: 100px;
  width: 12rem;
  height: 12rem;
  padding: 50px 20px 0 30px;
`;

const UserProfileImg = styled.img`
  border-radius: 100px;
  width: 12em;
  height: 12em;
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
  gap: 2px;
  margin-top: 10px;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.purple1};
  cursor: pointer;
`;

const Title = styled.h1``;

const SubTitle = styled.h2``;

const Text = styled.p`
  &.subInfo {
    color: ${({ theme }) => theme.colors.gray2};
  }
  &.skill {
    width: auto;
    max-width: 94px;
    background-color: ${({ theme }) => theme.colors.blue2};
    padding: 2px 4px;
    border-radius: 12px;
  }
`;
