import styled from "styled-components";

function AdminNoticeList() {
  return (
    <Container>
      <TitleBar>
        <Title>공지</Title>
        <Text className="purple">공지 등록</Text>
      </TitleBar>
      <NoticeListWrapper></NoticeListWrapper>
    </Container>
  );
}

export default AdminNoticeList;

const Container = styled.div`
  width: 100%;
`;

const TitleBar = styled.div``;

const Title = styled.h1``;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.purple3};
`;

const NoticeListWrapper = styled.div``;
