import styled from "styled-components";
import { UsersInfo } from "../../../servies/user";
import ProfileImg from "../../Profile/components/ProfileImg";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../utils/path";
import EmptyImage from "../../../components/commons/EmptyImage";

interface UsersListProps {
  users: UsersInfo[];
  myInfo: UsersInfo | null | undefined;
  error?: string;
  onOpenMiniProfile: (userId: string | null) => void;
}
function UsersList({ users, myInfo, error, onOpenMiniProfile }: UsersListProps) {
  const navigator = useNavigate();

  return (
    <Container>
      <UsersListWrapper>
        <UserWrapper key={myInfo?.id} onClick={() => navigator(paths.MENU)}>
          <ProfileImg />
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
        {error && <Text className="error">Error...</Text>}

        {users.length === 0 ? (
          <Wrapper>
            <EmptyImage />
            <Text className="info">친구가 존재하지 않습니다.</Text>
          </Wrapper>
        ) : (
          <>
            {users.map(user => (
              <UserWrapper key={user.id} id={user.id ? user.id : ""} onClick={() => onOpenMiniProfile(user.id || null)}>
                <ProfileImg />
                <NameWrapper>
                  {user.track && <Text>{`[${user.track.trackName}${user.track.cardinalNo}]`}</Text>}
                  {user.role === "ADMIN" && <Text className={user.role}>[매니저]</Text>}
                  {user.role === "COACH" && <Text className={user.role}>[코치]</Text>}
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

const Wrapper = styled.div`
  height: 80px;
  margin-top: 34px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
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
