import styled from "styled-components";
import { imgPaths } from "../../../utils/path";
import { Link } from "react-router-dom";
import { Dimed } from "../../profile/components/SkillsModal";
import { UsersPageInfo } from "../../../services/user";
import ChatNameModal from "./ChatNameModal";
import ReactDom from "react-dom";
import Button from "../../../components/commons/Button";

interface MiniProfileModalProps {
  isModalOpen: boolean;
  chatNameModalOpen: boolean;
  onChagneInput: any;
  onOpenChatName: () => void;
  chatNameInput: string;
  onClose: () => void;
  onCloseChatName: () => void;
  onCreateChat: () => void;
  userdata: UsersPageInfo | undefined;
}
function MiniProfileModal({
  isModalOpen,
  chatNameModalOpen,
  onChagneInput,
  chatNameInput,
  onOpenChatName,
  onClose,
  onCloseChatName,
  onCreateChat,
  userdata,
}: MiniProfileModalProps) {
  const el = document.getElementById("modal") as HTMLElement;

  if (!el) return null;

  return ReactDom.createPortal(
    <>
      <ChatNameModal $isOpen={chatNameModalOpen} onClick={onCreateChat} value={chatNameInput} onChange={onChagneInput} onClose={onCloseChatName} />
      <ModalContainer className={isModalOpen ? "" : "disable"}>
        <CloseBtn onClick={onClose}>Ⅹ</CloseBtn>
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
                <Text className="subInfo">{userdata.role}🏁</Text>
              </Wrapper>
              {userdata.comment ? <Text>{userdata.comment}</Text> : <Text>안녕하세요. {userdata.realName}입니다.</Text>}
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
                  <Text>등록된 기술 스택이 없습니다.</Text>
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
              {/* <Button onClick={() => navigate(paths.USERS_PAGE)}>더보기</Button> */}
              {userdata.id && (
                <Button id={userdata.id} onClick={onOpenChatName} className="chat-start">
                  {`${userdata.realName}님과 1 : 1 채팅`}
                </Button>
              )}
            </ButtonWrapper>
          </Body>
        ) : (
          ""
        )}
      </ModalContainer>
      <Dimed className={isModalOpen ? "" : "disable"} onClick={onClose} />
    </>,
    el
  );
}

export default MiniProfileModal;

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 700px;
  height: 600px;
  z-index: 8888;
  border-radius: 10px;
  background-color: #fff;

  &.disable {
    display: none;
  }
  padding: 24px 20px;

  @media ${({ theme }) => theme.device.mobileL} {
    height: 100%;
    border-radius: 0px;
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  cursor: pointer;
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
  gap: 2px;
  margin-top: 10px;

  .chat-start {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100% !important;
    height: 32px !important;
    background-color: ${({ theme }) => theme.colors.purple3} !important;
    cursor: pointer !important;
  }
`;

// const Button = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   height: 32px;
//   background-color: ${({ theme }) => theme.colors.purple1};
//   cursor: pointer;
// `;

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
