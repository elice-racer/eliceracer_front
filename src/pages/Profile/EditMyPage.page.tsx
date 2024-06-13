import styled from "styled-components";
import Btn from "../../components/commons/Btn";
import { imgPaths, paths } from "../../utils/path";
import { AxiosUser, Skills, UsersInfo } from "../../servies/user";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EditInput from "./components/EditInput";
import SkillsModal from "./components/SkillsModal";
import SkillBadge from "./components/SkillBadge";
import { loadingAtom } from "../../recoil/LoadingAtom";
import { useSetRecoilState } from "recoil";

function EditMyPage() {
  const navigate = useNavigate();

  const setLoading = useSetRecoilState(loadingAtom);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersInfo, setUsersInfo] = useState<UsersInfo | undefined | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  // 검색어
  const [searchSkillValue, setSearchSkillValue] = useState("");

  // 서버 검색 데이터
  const [searchSkills, setSearchSkills] = useState<Skills[]>([]);

  const [tempSkills, setTempSkills] = useState<string[]>([]);

  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);

  const [skills, setSkills] = useState<string[]>([]);

  const onChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!usersInfo) return;
    const { name, value } = e.target;
    setUsersInfo({ ...usersInfo, [name]: value });
  };

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!usersInfo) return;
    const { name, value } = e.target;
    setUsersInfo({ ...usersInfo, [name]: value });
  };

  /** 검색 스킬을 미리보기에 추가하기 */
  const onAddTempSkill = (skillName: string) => {
    const findSkill = skills.find(skill => skill === skillName);
    const findTempSkill = tempSkills.find(skill => skill == skillName);

    if (findSkill || findTempSkill) return;

    setTempSkills(tempSkills.concat(skillName));
    setSearchSkillValue("");
  };

  const onDeleteTempSkill = (skillName: string) => {
    setTempSkills(tempSkills.filter(skill => skill !== skillName));
  };

  /** 검색어 받아오기 */
  const fetchSearchSkills = async () => {
    try {
      const res = await AxiosUser.getUsersSkills(searchSkillValue);
      if (res.status === 200) {
        setSearchSkills(res.data.data);
      }
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  /** 스킬 추가하기 */
  const fetchAddSkills = async () => {
    setLoading(true);
    try {
      const res = await AxiosUser.putUsersSkills(tempSkills);

      if (res.status === 200) {
        setSkills(res.data.data.map((skill: Skills) => skill.skillName));
      }
      setLoading(false);
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const handleClick = async () => {
    try {
      if (!usersInfo) return;
      const { comment, realName, position, description, github, blog, sns, tmi } = usersInfo;
      const res = await AxiosUser.patchMyInfo({
        comment,
        realName,
        position,
        description,
        github,
        blog,
        sns,
        tmi,
      });

      if (res.status === 200) {
        const newMypage = res.data.data as UsersInfo;
        setUsersInfo(newMypage);
      }
      navigate(paths.MYPAGE);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchMyInfo = async () => {
      const res = await AxiosUser.getMyInfo();
      setUsersInfo(res.data);
      setSkills(res.data?.skills.map(skill => skill.skillName) || []);
      setTempSkills(res.data?.skills.map(skill => skill.skillName) || []);
    };
    fetchMyInfo();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = "auto";
      setSearchSkillValue("");
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (searchSkillValue !== "") {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      const timeout = setTimeout(() => {
        fetchSearchSkills();
      }, 300);

      setDebounceTimeout(timeout);
    } else {
      setSearchSkills([]);
    }
  }, [searchSkillValue]);

  useEffect(() => {}, [tempSkills]);

  return (
    <Container>
      <SkillsModal
        searchValue={searchSkillValue}
        onChangeValue={e => setSearchSkillValue(e.target.value)}
        isModalOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTempSkills(skills);
        }}
        showSkills={tempSkills}
        searchSkills={searchSkills}
        onAddSkill={fetchAddSkills}
        onAddTempSkill={onAddTempSkill}
        onDeleteTempSkill={onDeleteTempSkill}
        ref={inputRef}
      />
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
              {usersInfo?.track && (
                <Text className="sun-info">
                  {usersInfo.track.trackName}
                  {usersInfo.track.cardinalNo} |
                </Text>
              )}
            </RoleWrapper>
            <ItemWrapper>
              <SubTitle>Email</SubTitle>
              <Text>{usersInfo?.email || "이메일 인증 후 등록가능합니다."}</Text>
            </ItemWrapper>
            <ItemWrapper>
              <SubTitle>연락처</SubTitle>
              <Text className="sun-info">연락처는 본인만 확인가능합니다.</Text>
              <Text>{usersInfo?.phoneNumber}</Text>
            </ItemWrapper>
          </ProfileWrapper>
          <UserInfoWrapper>
            <ItemWrapper>
              <SubTitle>한줄 소개</SubTitle>
              <EditInput onChange={onChangeForm} value={usersInfo?.comment || ""} placeholder="나를 한 줄로 표현해주세요." name="comment" />
            </ItemWrapper>

            <ItemWrapper>
              <SubTitle>Blog</SubTitle>
              <EditInput onChange={onChangeForm} value={usersInfo?.blog || ""} placeholder="블로그 url을 추가해주세요." name="blog" />
            </ItemWrapper>
            <ItemWrapper>
              <SubTitle>Github</SubTitle>
              <EditInput onChange={onChangeForm} value={usersInfo?.github || ""} placeholder="깃허브 url을 추가해주세요." name="github" />
            </ItemWrapper>
            <ItemWrapper>
              <SubTitle>position</SubTitle>
              <EditInput onChange={onChangeForm} value={usersInfo?.position || ""} placeholder="포지션을 입력해주세요" name="position" />
            </ItemWrapper>
            <ItemWrapper>
              <SubTitle>SNS</SubTitle>
              <EditInput onChange={onChangeForm} value={usersInfo?.sns || ""} placeholder="sns 계정 url을 추가해주세요." name="sns" />
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
          <SKillWrapper>
            {skills?.map(item => (
              <SkillBadge key={item} skillName={item} />
            ))}
          </SKillWrapper>
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
            <TextArea
              value={usersInfo?.description || ""}
              onChange={onChangeTextArea}
              name="description"
              placeholder="자유롭게 작성해주세요. (ex : MBTI, 목표하는 개발자의 모습 등등"
            />
          </DescriptBox>
        </>
        <SubTitleWrapper>
          <TextWrapper className="sub-title">
            <SubTitle>나의 TMI</SubTitle>
          </TextWrapper>
        </SubTitleWrapper>
        <TMIBox>
          <TextArea value={usersInfo?.tmi || ""} onChange={onChangeTextArea} name="tmi" />
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

const TMIBox = styled.div`
  width: 590px;
  height: 200px;
  padding: 12px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.gray1};
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray1};

  border: none;
  padding: 12px;
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

const SKillWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 590px;
  min-height: 60px;

  gap: 4px;
  padding-left: 12px;

  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.gray1};
`;

const DescriptBox = styled.div`
  border-radius: 6px;
  padding: 12px;
  width: 590px;
  height: 250px;
  background-color: ${({ theme }) => theme.colors.gray1};
`;
