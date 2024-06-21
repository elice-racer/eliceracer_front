import { ChatRoomUsers } from "../../../services/user";
import { styled } from "styled-components";
import { Checkbox } from "@mui/material";
import { useState } from "react";

interface SelectUserListProps {
  userList: ChatRoomUsers[];
  onChangeGroupMember: (user: ChatRoomUsers, flag: boolean) => void;
}
interface SelectUserProps {
  user: ChatRoomUsers;
  onChangeGroupMember: (user: ChatRoomUsers, flag: boolean) => void;
}

export default function SelectUserList({ userList, onChangeGroupMember }: SelectUserListProps) {
  return (
    <List>
      {userList.map(user => (
        <SelectUser key={user.id} user={user} onChangeGroupMember={onChangeGroupMember} />
      ))}
    </List>
  );
}

function SelectUser({ user, onChangeGroupMember }: SelectUserProps) {
  const [checked, setChecked] = useState(false);
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChangeGroupMember(user, e.target.checked);
  };
  return (
    <StyledCheckedUser key={user.id}>
      <div>[{user.role}]</div>
      <div>{user.realName}</div>
      <Absolute>
        <Checkbox checked={checked} onChange={handleChecked} />
      </Absolute>
    </StyledCheckedUser>
  );
}

const StyledCheckedUser = styled.div`
  display: flex;
  align-items: center;

  padding: 6px 0px;
  position: relative;
`;

const Absolute = styled.div`
  position: absolute;
  right: 0;
`;

const List = styled.div``;
