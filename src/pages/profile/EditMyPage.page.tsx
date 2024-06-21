import styled from "styled-components";
import Button from "../../components/commons/Button";
import { imgPaths, paths } from "../../utils/path";
import { AxiosUser, Skills, UsersPageInfo } from "../../services/user";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EditInput from "./components/EditInput";
import SkillsModal from "./components/SkillsModal";
import SkillBadge from "./components/SkillBadge";
import { loadingAtom } from "../../recoil/LoadingAtom";
import { useSetRecoilState } from "recoil";

export interface SkillProps {
  id: string;
  skillName: string;
}
function EditMyPage() {
  const navigate = useNavigate();

  const setLoading = useSetRecoilState(loadingAtom);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersInfo, setUsersInfo] = useState<UsersPageInfo | undefined | null>(null);
  const [imageFile, setImageFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // 검색어
  const [searchSkillValue, setSearchSkillValue] = useState("");

  // 서버 검색 데이터
  const [searchSkills, setSearchSkills] = useState<Skills[]>([]);

  const [tempSkills, setTempSkills] = useState<string[]>([]);

  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();

  const [skills, setSkills] = useState<string[]>([]);

  const handleRefClick = () => {
    fileRef?.current?.click();
  };

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

  /** 이미지 업로드 */
  const fetchUploadUserImg = async () => {
    const formData = new FormData();
    if (imageFile) {
      formData.append("file", imageFile);
      try {
        const res = await AxiosUser.putUsersProfileImg(formData);
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }
    setLoading(false);
  };

  /** 이미지 화면 로드 */
  const handleChangeImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
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
        const newMypage = res.data.data as UsersPageInfo;
        setUsersInfo(newMypage);
      }
      fetchUploadUserImg();
      navigate(paths.MYPAGE);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const fetchMyInfo = async () => {
      const res = await AxiosUser.getMyPage();

      setUsersInfo(res.data);
      setSkills(res.data?.skills.map(skill => skill.skillName) || []);
      setTempSkills(res.data?.skills.map(skill => skill.skillName) || []);
      if (res.data?.profileImage) {
        setPreviewImage(res.data?.profileImage);
      }
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
    <>
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
      <Container>
        <TitleWrapper>
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
            <Button onClick={handleClick}>저장하기</Button>
          </BtnWrapper>
        </TitleWrapper>
        <SectionWrapper>
          <LeftSection>
            <ImgWrapper onClick={handleRefClick}>
              {previewImage ? <Img src={previewImage} /> : <Img src={imgPaths.DEFAULT_PROFILE_IMG} alt="기본이미지" />}
            </ImgWrapper>
            프로필 이미지를 등록하시려면 상단 이미지를 클릭해주세요!
            <Input type="file" accept="image/jpg, image/jpeg, image/png" ref={fileRef} onChange={handleChangeImageFile} />
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
              <EditInput onChange={onChangeForm} value={usersInfo?.comment || ""} placeholder="본인을 한 줄로 소개한다면?" name="comment" />
            </ItemWrapper>
            <ItemWrapper>
              <SubTitle>Email</SubTitle>
              <Text>{usersInfo?.email || "이메일 인증 후 등록 가능합니다."}</Text>
            </ItemWrapper>
            <ItemWrapper>
              <SubTitle>연락처</SubTitle>
              <Text className="sun-info">{usersInfo?.phoneNumber || "핸드폰 번호 인증 후 등록 가능합니다."}</Text>
            </ItemWrapper>
            {usersInfo?.teams[0]?.teamName && (
              <ItemWrapper>
                <SubTitle>팀</SubTitle>
                {usersInfo.teams.map(team => (
                  <TeamWrapper key={team.id} onClick={() => team.gitlab}>
                    <Text className="sun-info">{team.teamNumber}</Text>
                    <Text>{team.teamName}</Text>
                  </TeamWrapper>
                ))}
              </ItemWrapper>
            )}
          </LeftSection>
          <RightSection>
            <ItemWrapper>
              <SubTitle>Position</SubTitle>
              <EditInput onChange={onChangeForm} value={usersInfo?.position || ""} placeholder="포지션을 입력해주세요" name="position" />
            </ItemWrapper>
            <ItemWrapper>
              <SubTitle>My Git</SubTitle>
              <EditInput onChange={onChangeForm} value={usersInfo?.github || ""} placeholder="GitHub 또는 Gitlab url을 추가해주세요." name="github" />
            </ItemWrapper>

            <ItemWrapper>
              <SubTitle>Blog | Velog | T Story</SubTitle>
              <EditInput onChange={onChangeForm} value={usersInfo?.blog || ""} placeholder="블로그 url을 추가해주세요." name="blog" />
            </ItemWrapper>

            <ItemWrapper>
              <SubTitle>SNS</SubTitle>
              <EditInput onChange={onChangeForm} value={usersInfo?.sns || ""} placeholder="sns 계정 url을 추가해주세요." name="sns" />
            </ItemWrapper>
            <ItemWrapper>
              <SubTitleWrapper>
                <TextWrapper>
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
              <Wrapper>
                {skills?.map(skill => (
                  <SkillBadge key={skill} skillName={skill} />
                ))}
              </Wrapper>
            </ItemWrapper>
            <ItemWrapper>
              <SubTitleWrapper>
                <TextWrapper>
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
            </ItemWrapper>
            <ItemWrapper>
              <SubTitleWrapper>
                <TextWrapper>
                  <SubTitle>나의 TMI</SubTitle>
                </TextWrapper>
              </SubTitleWrapper>
              <TMIBox>
                <TextArea value={usersInfo?.tmi || ""} onChange={onChangeTextArea} name="tmi" />
              </TMIBox>
            </ItemWrapper>
          </RightSection>
        </SectionWrapper>
      </Container>
    </>
  );
}
export default EditMyPage;

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

const Input = styled.input`
  visibility: "hidden";
  display: none;
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

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
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
