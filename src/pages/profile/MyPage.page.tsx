import styled from "styled-components";

// component

import Button from "../../components/commons/Button";

import SkillBadge from "./components/SkillBadge";

// paths
import { imgPaths, paths } from "../../utils/path";

// api
import { AxiosUser, UsersPageInfo } from "../../servies/user";

// hooks
import { useEffect, useState } from "react";

// router
import { useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();
  const [usersInfo, setUsersInfo] = useState<UsersPageInfo | null>();

  const fetchMyInfo = async () => {
    try {
      const res = await AxiosUser.getMyPage();
      if (res.statusCode === 200) setUsersInfo(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMyInfo();
  }, []);

  return (
    <Container>
      <Header>
        <TextWrapper>
          {usersInfo?.position ? (
            <Title>
              {usersInfo?.position} : {usersInfo?.realName}
            </Title>
          ) : (
            <Title>내 정보</Title>
          )}
        </TextWrapper>
        <BtnWrapper>
          <Button onClick={() => navigate(paths.EDIT_MYPAGE)}>수정하기</Button>
        </BtnWrapper>
      </Header>
      <Wrapper>
        <BasicInfoWrapper>
          <ProfileWrapper>
            <ImgWrapper>{<Img src={imgPaths.DEFAULT_PROFILE_IMG} alt="기본이미지" />}</ImgWrapper>
            <RoleWrapper>
              {usersInfo?.track && (
                <Text className="sun-info">
                  {usersInfo.track.trackName}
                  {usersInfo.track.cardinalNo} |
                </Text>
              )}
              {usersInfo?.role ? <Text> {usersInfo.role}🏁</Text> : <Text>환영합니다! {usersInfo?.realName && `${usersInfo?.realName}님`}</Text>}
            </RoleWrapper>
          </ProfileWrapper>
          <UserInfoWrapper>
            <ItemWrapper>
              <SubTitle>한줄 소개</SubTitle>
              {usersInfo?.comment ? <Text>{usersInfo.comment}</Text> : <Text className="sun-info">한 줄 소개를 입력해주세요.</Text>}
            </ItemWrapper>
            <ItemWrapper>
              <SubTitle>Email</SubTitle>
              {usersInfo?.email ? <Text>{usersInfo.email}</Text> : <Text className="sun-info">이메일을 입력해주세요.</Text>}
            </ItemWrapper>
            <ItemWrapper>
              <SubTitle>Blog</SubTitle>
              {usersInfo?.blog ? <Text>{usersInfo.blog}</Text> : <Text className="sun-info">블로그를 등록해주세요.</Text>}
            </ItemWrapper>
            <ItemWrapper>
              <SubTitle>SNS</SubTitle>
              {usersInfo?.sns ? <Text>{usersInfo.sns}</Text> : <Text className="sun-info">나를 소개할 sns을 등록해주세요.</Text>}
            </ItemWrapper>
            <ItemWrapper>
              <SubTitle>연락처</SubTitle>
              {usersInfo?.phoneNumber ? <Text>{usersInfo.phoneNumber}</Text> : <Text className="sun-info">핸드폰 번호를 등록해주세요.</Text>}
            </ItemWrapper>
          </UserInfoWrapper>
        </BasicInfoWrapper>
        <>
          <SubTitleWrapper>
            <TextWrapper className="sub-title">
              <SubTitle>기술</SubTitle>
            </TextWrapper>
          </SubTitleWrapper>
          <SKillWrapper>
            {usersInfo?.skills?.map(item => (
              <SkillBadge key={item.id} skillName={item.skillName} />
            ))}
          </SKillWrapper>
        </>
        <>
          <SubTitleWrapper>
            <TextWrapper className="sub-title">
              <SubTitle>업적</SubTitle>
            </TextWrapper>
          </SubTitleWrapper>
          <AchievBox>
            <Text>성실한 엘리서</Text>
          </AchievBox>
        </>
        <>
          <SubTitleWrapper>
            <TextWrapper className="sub-title">
              <SubTitle>소개</SubTitle>
            </TextWrapper>
          </SubTitleWrapper>
          <DescriptBox>
            {usersInfo?.description ? (
              <Text>{usersInfo?.description}</Text>
            ) : (
              <Text>자유롭게 작성해주세요. (ex : MBTI, 목표하는 개발자의 모습 등등)</Text>
            )}
          </DescriptBox>
        </>
        <TextWrapper className="sub-title">
          <SubTitle>나의 TMI</SubTitle>
        </TextWrapper>
        <TMIBox>
          <Text></Text>
        </TMIBox>
      </Wrapper>
    </Container>
  );
}
export default MyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: end;
  gap: 12px;
  width: 100%;
  height: 50px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &.sub-title {
    margin-left: 10px;
  }
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
  width: 100%;
  height: 30px;
  border-bottom: 1px soild ${({ theme }) => theme.colors.gray2};
`;

const SubTitle = styled.h2``;

const Text = styled.p`
  &.sun-info {
    color: ${({ theme }) => theme.colors.gray2};
  }
`;
const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BasicInfoWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ProfileWrapper = styled.div`
  border-radius: 8px;
  padding: 10px;
  width: 30%;
  border: 1px solid ${({ theme }) => theme.colors.gray1};
`;

const RoleWrapper = styled.div`
  margin: 0 10px;
  display: flex;
`;

const ImgWrapper = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  padding: 30px 0 20px 0;
`;

const Img = styled.img`
  width: 160px;
  height: 160px;
  object-fit: cover;
  object-position: center center;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-radius: 8px;
  padding: 16px;
  width: 380px;
  height: 300px;
  border: 1px solid ${({ theme }) => theme.colors.gray1};
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const AchievBox = styled.div`
  padding: 12px;
  border-radius: 6px;
  width: 590px;
  height: 60px;
  border: 1px solid ${({ theme }) => theme.colors.gray1};
`;

const SKillWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  min-height: 60px;
  border: 1px solid ${({ theme }) => theme.colors.gray1};

  align-items: center;
  gap: 4px;
  padding-left: 12px;
`;

const TMIBox = styled.div`
  width: 590px;
  height: 200px;
  border: 1px solid ${({ theme }) => theme.colors.gray1};
`;

const DescriptBox = styled.div`
  border-radius: 6px;
  padding: 12px;
  width: 590px;
  height: 250px;
  border: 1px solid ${({ theme }) => theme.colors.gray1};
`;