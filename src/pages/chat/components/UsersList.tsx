import styled from "styled-components";
import { ChatRoomUsers } from "../../../services/user";
import ProfileImg from "../../profile/components/ProfileImg";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../utils/path";
import EmptyImage from "../../../components/commons/EmptyImage";

interface UsersListProps {
  users: ChatRoomUsers[];
  myInfo: ChatRoomUsers;
  error?: string;
  onOpenMiniProfile: (userId: string | null) => void;
}

interface MyInfoProps {
  myInfo: ChatRoomUsers;
}

function MyInfo({ myInfo }: MyInfoProps) {
  const navigator = useNavigate();

  return (
    <UserWrapper onClick={() => navigator(paths.MENU)}>
      <ProfileImg userImg={myInfo?.profileImage} />
      <NameWrapper>
        {myInfo?.track?.trackName ? (
          <Text>{`[${myInfo?.track.trackName}${myInfo?.track.cardinalNo}]`}</Text>
        ) : (
          <Text className={myInfo?.role}>[{myInfo?.role}]</Text>
        )}
        <Text className={myInfo?.role}>{myInfo?.realName || "이름없음"}</Text>
      </NameWrapper>
      <CommentWrapper>
        <Text>{myInfo?.comment}</Text>
      </CommentWrapper>
    </UserWrapper>
  );
}

function UsersList({ users, myInfo, onOpenMiniProfile }: UsersListProps) {
  const getRoleType = (role: string) => {
    if (role === "RACER") return "레이서";
    else if (role === "ADMIN") return "매니저";
    else if (role === "COACH") return "코치";
  };
  return (
    <Container>
      <UsersListWrapper>
        <MyInfo myInfo={myInfo} />

        {users.length === 0 ? (
          <EmptyImage message="친구가 존재하지 않습니다." />
        ) : (
          <>
            {users.map(user => (
              <UserWrapper key={user.id} onClick={() => onOpenMiniProfile(user.id)}>
                <ProfileImg userImg={user?.profileImage} />
                <NameWrapper>
                  {user.track ? (
                    <Text>{`[${user.track.trackName}${user.track.cardinalNo}]`}</Text>
                  ) : (
                    <Text className={user.role}>[{getRoleType(user.role)}]</Text>
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
      </UsersListWrapper>
    </Container>
  );
}

export default UsersList;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const UsersListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const UserWrapper = styled.div`
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 12px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const NameWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const CommentWrapper = styled.div`
  width: 50%;
  white-space: break-spaces;
  overflow: hidden;
`;

const Text = styled.p`
  z-index: -999;
  &.ADMIN {
    color: green;
  }
  &.RACER {
    color: ${({ theme }) => theme.colors.purple2};
  }
  &.COACH {
    color: orange;
  }
  &.error {
    color: tomato;
  }
  &.info {
    color: ${({ theme }) => theme.colors.gray2};
  }
`;
