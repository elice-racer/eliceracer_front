import styled from "styled-components";

function AdminEditNotice() {
  return (
    <Container>
      <Flex>
        <TitleBar>
          <Title>공지 수정</Title>
          <SubmitBtn onClick={() => {}}>
            <Text>수정 완료</Text>
          </SubmitBtn>
        </TitleBar>
        <InputsWrapper>
          <Input onChange={() => {}} type="text" name="title" value="{noticeData?.title}" placeholder="제목" />
          <TextArea onChange={() => {}} name="content" value="{noticeData?.content}" placeholder="내용" />
        </InputsWrapper>
        <Text className="error">{}</Text>
      </Flex>
    </Container>
  );
}

export default AdminEditNotice;

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const Flex = styled.div`
  width: 60vw;
`;

const TitleBar = styled.div`
  display: flex;
  gap: 6px;
  border-bottom: solid 2px ${({ theme }) => theme.colors.purple2};
  padding: 10px;
`;

const Title = styled.h1`
  font-size: 1.4rem;
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SubmitBtn = styled.button`
  border-color: ${({ theme }) => theme.colors.purple2};
  width: 80px;
  height: 30px;
  border-radius: 6px;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.purple3};
  &.error {
    color: tomato;
  }
`;

const Input = styled.input`
  margin-top: 6px;
  background-color: ${({ theme }) => theme.colors.gray1};
  border: none;
  padding: 12px;
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray1};

  border: none;
  padding: 12px;
`;
