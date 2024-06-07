import styled from "styled-components";
import Btn from "../../components/commons/Btn";
import { imgPaths, paths } from "../../utils/path";
import { AxiosUser, UsersInfo } from "../../servies/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditInput from "./components/EditInput";
import SkillsModal from "./components/SkillsModal";
import { useRecoilState } from "recoil";
import modalState from "../../recoil/Modal";

function EditMyPage() {
  const navigate = useNavigate();

  const [, setIsModalOpen] = useRecoilState(modalState);
  const [usersInfo, setUsersInfo] = useState<UsersInfo | null>();
  const [updateInfo, setUpdateInfo] = useState({
    id: null,
    email: null,
    username: null,
    realName: "",
    phoneNumber: null,
    comment: null,
    position: null,
    github: null,
    blog: null,
    sns: null,
    description: null,
    role: "",
    skill: null,
    status: 0,
    track: null,
    teams: null,
    tmi: null,
  });

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateInfo(userInfo => ({ ...userInfo, [name]: value }));
  };

  const handleClick = async (e: any) => {
    e.preventDefault();

    try {
      await AxiosUser.patchMyInfo(updateInfo);
      navigate(paths.MYPAGE);
      console.log("업데이트 완료!");
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchMyInfo = async () => {
      const res = await AxiosUser.getMyInfo();
      setUsersInfo(res);
    };
    fetchMyInfo();
  }, []);

  return (
    <Container>
      <SkillsModal />
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
          <Btn children="저장하기" onClick={handleClick} />
        </BtnWrapper>
      </Header>
      <Wrapper>
        <BasicInfoWrapper>
          <ProfileWrapper>
            <ImgWrapper>{<Img src={imgPaths.DEFAULT_PROFILE_IMG} alt="기본이미지" />}</ImgWrapper>
            <Input type="file" accept=".jpg, .jpeg, .png" />
            <RoleWrapper>
              {usersInfo?.role ? <Text>{usersInfo?.role}🏁</Text> : <Text>환영합니다! {usersInfo?.realName && `${usersInfo?.realName}님`}</Text>}
              {usersInfo?.track && <Text>{usersInfo.track}</Text>}
            </RoleWrapper>
          </ProfileWrapper>
          <UserInfoWrapper>
            <ItemWrapper>
              <SubTitle>한줄 소개</SubTitle>
              <EditInput onChnage={onChangeForm} data={usersInfo?.comment} placeholder="나를 한 줄로 표현해주세요." />
            </ItemWrapper>
            <ItemWrapper>
              <SubTitle>Email</SubTitle>
              <EditInput onChnage={onChangeForm} data={usersInfo?.email} placeholder="이메일을 입력해주세요." />
            </ItemWrapper>
            <ItemWrapper>
              <SubTitle>Blog</SubTitle>
              <EditInput onChnage={onChangeForm} data={usersInfo?.blog} placeholder="블로그 url을 추가해주세요." />
            </ItemWrapper>
            <ItemWrapper>
              <SubTitle>SNS</SubTitle>
              <EditInput onChnage={onChangeForm} data={usersInfo?.sns} placeholder="sns 계정 url을 추가해주세요." />
            </ItemWrapper>
            <ItemWrapper>
              <SubTitle>연락처</SubTitle>
              <Text className="sun-info">연락처는 본인만 확인가능합니다.</Text>
              {usersInfo?.phoneNumber ? <Text>{usersInfo?.phoneNumber}</Text> : <Text className="sub-info">전화 번호를 등록해주세요.</Text>}
            </ItemWrapper>
          </UserInfoWrapper>
        </BasicInfoWrapper>
        <>
          <SubTitleWrapper>
            <TextWrapper className="sub-title">
              <SubTitle>보유 기술 스택</SubTitle>
            </TextWrapper>
            <AddSkillBtn
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              기술스택 추가하기
            </AddSkillBtn>
          </SubTitleWrapper>
          <AchievBox>
            {usersInfo?.skill?.map(item => (
              <Text>{item}</Text>
            ))}
          </AchievBox>
        </>
        <>
          <SubTitleWrapper>
            <TextWrapper className="sub-title">
              <SubTitle>업적</SubTitle>
            </TextWrapper>
          </SubTitleWrapper>
          <AchievBox></AchievBox>
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
export default EditMyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 470px;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: end;
  gap: 12px;
  width: 590px;
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
  gap: 8px;
  width: 590px;
  height: 30px;
  border-bottom: 1px soild ${({ theme }) => theme.colors.gray2};
`;

const SubTitle = styled.h2``;

const AddSkillBtn = styled.button`
  padding: 2px 5px;
  border: 1px solid ${({ theme }) => theme.colors.blue2};
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.blue3};
  background-color: ${({ theme }) => theme.colors.blue1};
  cursor: pointer;
`;

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
  width: 200px;
  background-color: ${({ theme }) => theme.colors.gray1};
`;

const RoleWrapper = styled.div`
  margin: 0 10px;
  display: flex;
`;

const Input = styled.input`
  display: none;
`;

const ImgWrapper = styled.label`
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
  background-color: ${({ theme }) => theme.colors.gray1};
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
  background-color: ${({ theme }) => theme.colors.gray1};
`;

const TMIBox = styled.div`
  width: 590px;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.gray1};
`;

const DescriptBox = styled.div`
  border-radius: 6px;
  padding: 12px;
  width: 590px;
  height: 250px;
  background-color: ${({ theme }) => theme.colors.gray1};
`;
