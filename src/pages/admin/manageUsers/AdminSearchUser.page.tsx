import styled from "styled-components";

function AdminSearchUser() {
  return (
    <Container>
      <Wrapper>
        <TitleBar>
          <Title>트랙 및 레이서 조회</Title>
        </TitleBar>
        <SelectOptionWrapper>
          <Input></Input>
        </SelectOptionWrapper>

        <SeachedListWrapper></SeachedListWrapper>
      </Wrapper>
    </Container>
  );
}

export default AdminSearchUser;

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 68vw;
`;

const TitleBar = styled.div`
  display: flex;
  border-bottom: solid 2px ${({ theme }) => theme.colors.purple2};
  align-items: center;
  padding: 10px;
  gap: 12px;
`;
const Title = styled.h1`
  font-size: 1.4rem;
`;
const SelectOptionWrapper = styled.div``;

const Input = styled.input``;
const SeachedListWrapper = styled.div``;
