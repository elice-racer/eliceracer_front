import styled from "styled-components";
import ProfileImg from "../../profile/components/ProfileImg";
import { ChatRoomUsers } from "../../../servies/user";

interface ChatRoomUsersProps {
  users?: ChatRoomUsers[] | undefined;
  onOpenMiniProfile: (userId: string | null) => void;
}
function ChatRoomUsersList({ users, onOpenMiniProfile }: ChatRoomUsersProps) {
  return (
    <Container>
      {/* <TitleWrapper>
        <Title>참여 인원</Title>
      </TitleWrapper> */}
      <UsersListWrapper>
        {users ? (
          users.map(user => (
            <UserWrapper key={user.id} onClick={() => onOpenMiniProfile(user.id)}>
              <ProfileImg />
              <NameWrapper>
                {user.track && <Text>{`[${user.track.trackName}${user.track.cardinalNo}]`}</Text>}
                {user.role === "ADMIN" && <Text className={user.role}>[매니저]</Text>}
                {user.role === "COACH" && <Text className={user.role}>[코치]</Text>}
                <Text className={user.role}>{user.realName || "이름없음"}</Text>
              </NameWrapper>
              <CommentWrapper>
                <Text>{user.comment}</Text>
              </CommentWrapper>
            </UserWrapper>
          ))
        ) : (
          <Wrapper>
            <Text className="info">친구가 존재하지 않습니다.</Text>
          </Wrapper>
        )}
      </UsersListWrapper>
    </Container>
  );
}

export default ChatRoomUsersList;

const Container = styled.div`
  width: 100%;
  background-color: #fff;
`;

// const TitleWrapper = styled.div`
//   padding: 2px 12px;
//   align-items: center;
//   width: 100%;
//   height: 50px;
//   display: flex;
//   justify-content: space-between;
// `;

// const SubItemWrapper = styled.div``;

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
  display: flex;
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
// const Input = styled.input`
//   width: 30%;
// `;
// const Title = styled.h1`
//   color: ${({ theme }) => theme.colors.gray2};
// `;

const Text = styled.p`
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

// const SearchItem = styled.div`
//   cursor: pointer;
// `;

// const ItemText = styled.p``;
