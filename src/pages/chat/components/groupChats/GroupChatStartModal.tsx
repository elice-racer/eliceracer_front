import { ChatRoomUsers, UsersPageInfo } from "../../../../services/user";
import { Dimed } from "../../../profile/components/SkillsModal";
import { styled } from "styled-components";
import SelectUserList from "../SelectUserList";
import { IoCloseSharp } from "react-icons/io5";
import { IconButton } from "@mui/material";
import Button from "../../../../components/commons/Button";

interface GropChatStartModalProps {
  currentUser: UsersPageInfo;
  userList: ChatRoomUsers[];
  groupchatMember: ChatRoomUsers[];
  onClose: () => void;
  isOpen: boolean;
  onChangeGroupMember: (user: ChatRoomUsers, flag: boolean) => void;
  onCreateGroupChat: (userList: ChatRoomUsers[], chatName: string) => void;
}

export default function GroupChatStartModal({
  currentUser,
  userList,
  groupchatMember,
  onClose,
  isOpen,
  onChangeGroupMember,
  onCreateGroupChat,
}: GropChatStartModalProps) {
  const handleCreateChatRoom = () => {
    onCreateGroupChat(groupchatMember, `${currentUser.realName}님외 ${groupchatMember.length}명`);
    onClose();
  };

  return (
    <>
      <ModalContainer $isOpen={isOpen}>
        <Relative>
          <IconButton className="close-button" onClick={onClose}>
            <IoCloseSharp />
          </IconButton>
          <Title>초대할 친구</Title>
          <ScrollWrapper>
            {groupchatMember.map(user => (
              <Badge key={user.id}>{user.realName}</Badge>
            ))}
          </ScrollWrapper>
          <Wrapper>
            <Title>친구 목록</Title>
            <UserScrollWrapper>
              <SelectUserList userList={userList} onChangeGroupMember={onChangeGroupMember} />
            </UserScrollWrapper>
          </Wrapper>
        </Relative>
        <Button className="create-chat-button" onClick={handleCreateChatRoom}>
          채팅방 생성하기
        </Button>
      </ModalContainer>
      <Dimed className={isOpen ? "" : "disable"} onClick={onClose} />
    </>
  );
}

const ModalContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 540px;
  height: 600px;
  z-index: 8888;
  border-radius: 10px;

  background-color: #fff;

  border: 1px solid #333;

  &.disable {
    display: none;
  }
  padding: 24px 20px;

  @media ${({ theme }) => theme.device.mobileL} {
    height: 100%;
    border-radius: 0px;
  }

  .create-chat-button {
    margin-top: 12px !important;
  }
`;

const Relative = styled.div`
  position: relative;
  width: 100%;

  .close-button {
    position: absolute;
    right: 0;
    top: -12px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ScrollWrapper = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  gap: 4px;
  border: 1px solid #dbdbdb;
  padding: 4px;
`;

const UserScrollWrapper = styled.div`
  height: 300px;
  overflow-y: scroll;

  @media ${({ theme }) => theme.device.mobileL} {
    height: 480px;
  }

  border: 1px solid #dbdbdb;
`;

const Badge = styled.p`
  min-width: 60px;
  padding: 0 4px;
  height: 24px;

  border: 1px solid #333;
  display: flex;
  justify-content: center;

  border-radius: 14px;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 1.5rem;

  margin: 12px 0;
`;
