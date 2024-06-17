import styled from "styled-components";

// component
import SkillBadge from "./components/SkillBadge";

// paths
import { imgPaths } from "../../utils/path";

// api
import { AxiosUser, UsersPageInfo } from "../../services/user";

// hooks
import { useEffect, useState } from "react";

// router
import { useParams } from "react-router-dom";
import { loadingAtom } from "../../recoil/LoadingAtom";
import { useSetRecoilState } from "recoil";

function UsersPage() {
  const { userId } = useParams();

  const setLoading = useSetRecoilState(loadingAtom);
  if (!userId) return;

  const [usersInfo, setUsersInfo] = useState<UsersPageInfo | null>();

  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const id = userId;
      const res = await AxiosUser.getUsersPage(id);
      if (res.statusCode === 200) setUsersInfo(res.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [userId]);

  return (
    <Container>
      <TitleWrapper>
        <TextWrapper>
          {usersInfo?.position ? (
            <Title>
              {usersInfo?.position} : {usersInfo?.realName}
            </Title>
          ) : (
            <Title>{usersInfo?.realName}님의 페이지</Title>
          )}
        </TextWrapper>
      </TitleWrapper>
      <SectionWrapper>
        <LeftSection>
          <ImgWrapper>
            {" "}
            {usersInfo?.profileImage ? (
              <Img src={usersInfo.profileImage} alt="유저 이미지" />
            ) : (
              <Img src={imgPaths.DEFAULT_PROFILE_IMG} alt="기본 이미지" />
            )}
          </ImgWrapper>
          <RoleWrapper>
            {usersInfo?.track && (
              <Text className="sun-info">
                {usersInfo.track.trackName}
                {usersInfo.track.cardinalNo}
              </Text>
            )}
            {usersInfo?.role ? (
              <Text>
                {usersInfo?.role} {usersInfo?.realName}🏁
              </Text>
            ) : (
              <Text>환영합니다! {usersInfo?.realName && `${usersInfo?.realName}님`}</Text>
            )}
          </RoleWrapper>
          <ItemWrapper>
            <SubTitle>한줄 소개</SubTitle>
            <Text>{usersInfo?.comment}</Text>
          </ItemWrapper>
          {usersInfo?.teams[0]?.teamName && (
            <ItemWrapper>
              <SubTitle>팀</SubTitle>
              {usersInfo.teams.map(team => (
                <TeamWrapper onClick={() => team.gitlab}>
                  <Text className="sun-info">{team.teamNumber}</Text>
                  <Text>{team.teamName}</Text>
                </TeamWrapper>
              ))}
            </ItemWrapper>
          )}
        </LeftSection>
        <RightSection>
          <ItemWrapper>
            <SubTitle>My Git</SubTitle>
            {usersInfo?.blog ? <Text>{usersInfo.blog}</Text> : <Text className="sun-info">등록된 Git 주소가 없습니다.</Text>}
          </ItemWrapper>
          <ItemWrapper>
            <SubTitle>Blog</SubTitle>
            {usersInfo?.blog ? <Text>{usersInfo.blog}</Text> : <Text className="sun-info">등록된 블로그가 없습니다.</Text>}
          </ItemWrapper>
          <ItemWrapper>
            <SubTitle>SNS</SubTitle>
            {usersInfo?.sns ? <Text>{usersInfo.sns}</Text> : <Text className="sun-info">등록된 sns가 없습니다.</Text>}
          </ItemWrapper>
          <SubTitleWrapper>
            <TextWrapper className="sub-title">
              <SubTitle>기술</SubTitle>
            </TextWrapper>
          </SubTitleWrapper>
          <Wrapper>
            {usersInfo?.skills.length === 0 ? (
              <Text>등록된 기술 스택이 없습니다.</Text>
            ) : (
              usersInfo?.skills?.map(skill => <SkillBadge key={skill.id} skillName={skill.skillName} />)
            )}
          </Wrapper>
          <ItemWrapper>
            <SubTitleWrapper>
              <TextWrapper>
                <SubTitle>소개</SubTitle>
              </TextWrapper>
            </SubTitleWrapper>
            <DescriptBox>
              <Text>{usersInfo?.description}</Text>
            </DescriptBox>
          </ItemWrapper>
          <ItemWrapper>
            <SubTitleWrapper>
              <TextWrapper>
                <SubTitle>나의 TMI</SubTitle>
              </TextWrapper>
            </SubTitleWrapper>
            <TMIBox>
              <Text>{usersInfo?.tmi}</Text>
            </TMIBox>
          </ItemWrapper>
        </RightSection>
      </SectionWrapper>
    </Container>
  );
}
export default UsersPage;

const Container = styled.div`
  display: flex;
  padding: 0 20px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: end;
  gap: 12px;
  width: 100%;
  height: 50px;
`;

const SectionWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  @media ${({ theme }) => theme.device.mobileL} {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  width: 36%;
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.device.mobileL} {
    width: 100%;
  }
`;

const RightSection = styled.div`
  width: 64%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  @media ${({ theme }) => theme.device.mobileL} {
    width: 100%;
  }
`;

const ImgWrapper = styled.label`
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 30px 0 20px 0;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4px;
`;

const TeamWrapper = styled.div`
  display: flex;
  gap: 2px;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.gray2};
  font-size: large;
  font-weight: 900;
`;

const SubTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 8px;
  width: 100%;
  height: 30px;
`;

const TMIBox = styled.div`
  width: 100%;
  height: 200px;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.gray1};
`;

const SubTitle = styled.h2``;

const Text = styled.p`
  &.sun-info {
    color: ${({ theme }) => theme.colors.gray2};
  }
`;

const RoleWrapper = styled.div`
  margin: 0 10px;
  display: flex;
`;

const Img = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
  object-position: center center;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 12px;

  width: 100%;
  min-height: 60px;

  gap: 4px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.gray1};
`;

const DescriptBox = styled.div`
  border-radius: 6px;
  padding: 12px;
  width: 100%;
  height: 250px;
  border: 1px solid ${({ theme }) => theme.colors.gray1};
`;
