import styled from "styled-components";

function UsersMiniProfile() {
  return <Container>UserProfile</Container>;
}

export default UsersMiniProfile;

const Container = styled.div`
  width: 300px;
  height: 600px;
  background-color: ${({ theme }) => theme.colors.puple1};
`;
