import { useState } from "react";
import styled from "styled-components";
import { UsersInfo } from "../../../servies/user";
import ProfileImg from "../../Profile/components/ProfileImg";

interface UsersListProps {
  users: UsersInfo[] | undefined;
  myInfo: UsersInfo | undefined;
}
function UsersList({ users, myInfo }: UsersListProps) {
  const [isClick, setIsClick] = useState(false);

  return (
    <Container>
      <TitleWrapper>
        <Title>Team Elice</Title>
        <SubItemWrapper>
          <Item
            onClick={prev => {
              setIsClick(!prev);
            }}
          >
            {isClick ? <Input /> : <ItemText>검색 🔎</ItemText>}
          </Item>
        </SubItemWrapper>
      </TitleWrapper>
      <UsersListWrapper>
        <UserWrapper key={myInfo?.id} onClick={() => {}}>
          <ProfileImg />
          <NameWrapper>
            {myInfo?.track ? <Text>{`[${myInfo?.track}]`}</Text> : ""}
            <Text className={myInfo?.role}>{myInfo?.realName || "이름없음"}</Text>
          </NameWrapper>
          <CommentWrapper>
            <Text>{myInfo?.comment}</Text>
          </CommentWrapper>
        </UserWrapper>
        {users?.map(user => (
          <UserWrapper key={user.id} onClick={() => {}}>
            <ProfileImg />
            <NameWrapper>
              {user.track ? <Text>{`[${user.track}]`}</Text> : ""}
              <Text className={user.role}>{user.realName || "이름없음"}</Text>
            </NameWrapper>
            <CommentWrapper>
              <Text>{user.comment}</Text>
            </CommentWrapper>
          </UserWrapper>
        ))}
      </UsersListWrapper>
    </Container>
  );
}

export default UsersList;

const Container = styled.div`
  width: 100%;
`;

const TitleWrapper = styled.div`
  padding: 2px 12px;
  align-items: center;
  width: 500px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  border: red solid 1px;
`;

const SubItemWrapper = styled.div``;

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
  border: red solid 1px;
`;

const NameWrapper = styled.div`
  width: 160px;
  white-space: break-spaces;
  overflow: hidden;
`;

const CommentWrapper = styled.div`
  width: 50%;
  white-space: break-spaces;
  overflow: hidden;
`;
const Input = styled.input`
  width: 30%;
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.colors.gray2};
`;

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
`;
const Item = styled.div``;

const ItemText = styled.p``;
