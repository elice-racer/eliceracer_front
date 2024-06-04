import { styled } from "styled-components";

const GetUsers = () => {
  return (
    <Container>
      <Wrapper>
        {/* 유저 정보가 없으면 이미지 파일이 보이게!! */}
        <Img src="" alt="파일을 먼저 등록해주세요." />
      </Wrapper>
    </Container>
  );
};
export default GetUsers;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 80vw;
  height: 300px;
  background-color: ${({ theme }) => theme.colors.gray1};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 230px;
`;
