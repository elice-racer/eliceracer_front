import styled from "styled-components";
import EmptyImage from "../../../../components/commons/EmptyImage";
import ProfileImg from "../../../profile/components/ProfileImg";
import { ChatRoomUsers } from "../../../../services/user";
import { Dimed } from "../../../profile/components/SkillsModal";

interface SelectUsersModalProps {
  onOpen: boolean;
  onClose: () => void;
  onChange: (e: any) => void;
  onInviteUsers: () => Promise<void>;
  onSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClickSearch: () => Promise<void>;
  searchUser: string;
  userList?: ChatRoomUsers[];
}
function SelectUsersModal({ onOpen, onClose, onChange, onSearch, onClickSearch, searchUser, onInviteUsers, userList }: SelectUsersModalProps) {
  return (
    <>
      <ModalContainer className={onOpen ? "" : "disable"}>
        <TitleWrapper>
          <Title>초대할 멤버를 검색해 선택해주세요!</Title>
          <CloseBtn onClick={onClose}>Ⅹ</CloseBtn>
        </TitleWrapper>
        <SearchWrapper>
          <Input type="text" placeholder="유저를 검색해주세요" value={searchUser} onChange={onChange} onKeyUp={onSearch} />
          <SearchIcon onClick={onClickSearch}>🔎</SearchIcon>
        </SearchWrapper>

        <SelectedUserWrapper>
          <SelectedUsers></SelectedUsers>
          <Button onClick={onInviteUsers}>초대하기</Button>
        </SelectedUserWrapper>
        {!userList ? (
          <EmptyImage message="멤버가 존재하지 않습니다." />
        ) : (
          <>
            {userList.map(user => (
              <UserWrapper key={user.id} onClick={() => {}}>
                <ProfileImg />
                <NameWrapper>
                  {user.track ? (
                    <Text>{`[${user.track.trackName}${user.track.cardinalNo}]`}</Text>
                  ) : (
                    <>
                      {user.role === "RACER" && <Text className={user.role}>[레이서]</Text>}
                      {user.role === "ADMIN" && <Text className={user.role}>[매니저]</Text>}
                      {user.role === "COACH" && <Text className={user.role}>[코치]</Text>}
                    </>
                  )}
                  <Text>{user.realName || "이름없음"}</Text>
                </NameWrapper>
                <CommentWrapper>
                  <Text>{user.comment}</Text>
                </CommentWrapper>
              </UserWrapper>
            ))}
          </>
        )}
      </ModalContainer>
      <Dimed className={onOpen ? "" : "disable"} onClick={onClose} />
    </>
  );
}

export default SelectUsersModal;

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
    height: 100vh;
    border-radius: 0px;
  }
`;

const Title = styled.h1``;

const CloseBtn = styled.div`
  cursor: pointer;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SelectedUserWrapper = styled.div``;

const SelectedUsers = styled.div`
  width: 100%;
`;

const SearchWrapper = styled.div`
  width: 100%;
  padding: 12px;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray1};
  height: 36px;
`;

const SearchIcon = styled.p`
  position: absolute;
  top: 50%;
  right: 12px;

  transform: translateY(-50%);
  font-size: 14px;

  cursor: pointer;
`;

const Button = styled.div``;

const CommentWrapper = styled.div``;

const Text = styled.p``;

const UserWrapper = styled.div`
  border: red solid 1px;
  padding: 2px 12px;
  width: 100%;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 4px;
`;

const NameWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 2px;
`;
