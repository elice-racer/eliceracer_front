import styled from "styled-components";

interface SearchInputProps {
  searchUser: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onKeyUp: React.KeyboardEventHandler<HTMLInputElement>;
  onFetchSearchUserList: React.MouseEventHandler<HTMLParagraphElement>;
}
function SearchInput({ searchUser, onChange, onKeyUp, onFetchSearchUserList }: SearchInputProps) {
  return (
    <SearchWrapper>
      <Input type="text" placeholder="유저를 검색해주세요" value={searchUser} onChange={onChange} onKeyUp={onKeyUp} />
      <SearchIcon onClick={onFetchSearchUserList}>🔎</SearchIcon>
    </SearchWrapper>
  );
}

export default SearchInput;

const SearchWrapper = styled.div`
  width: 100%;
  padding: 12px;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray1};
  height: 36px;
  padding: 4px 12px;
`;

const SearchIcon = styled.p`
  position: absolute;
  top: 50%;
  right: 24px;

  transform: translateY(-50%);
  font-size: 14px;

  cursor: pointer;
`;
