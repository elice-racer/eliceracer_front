import { ChatRoomUsers, UsersPageInfo } from "../../../../services/user";

import { styled } from "styled-components";
import SelectUserList from "../SelectUserList";

import Button from "../../../../components/commons/Button";
import Modal from "../../../../components/commons/Modal";

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
    onCreateGroupChat(groupchatMember, `${currentUser.realName}, ${groupchatMember.map(user => `${user.realName},`)}`);
    onClose();
  };

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} width="540px" height="680px">
        <Relative>
          <TitleWrapper>
            <Title>초대할 친구</Title>{" "}
            <Button className="create-chat-button" onClick={handleCreateChatRoom}>
              채팅 시작하기
            </Button>
          </TitleWrapper>
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
      </Modal>
    </>
  );
}

const TitleWrapper = styled.div`
  width: 100%;

  padding-top: 4px;

  display: flex;
  justify-content: space-between;
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
