import styled from "styled-components";
import { Notices } from "../../../servies/notice";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../utils/path";

interface NoticesProps {
  notices: Notices[] | undefined;
}
function NoticeList({ notices }: NoticesProps) {
  const navigate = useNavigate();
  return (
    <Container>
      <Flex>
        <TitleWrapper>
          <Title>공지</Title>
        </TitleWrapper>
        <Wrapper>
          <NoticesWrapper>
            {notices ? (
              notices.map((notice, index) => (
                <NoticeItem key={notice.id} onClick={() => navigate(`${paths.NOTICE_LIST}/${notice.id}`)}>
                  <Text className="index">{index + 1}</Text>
                  <Text className="title">{notice.title}</Text>
                  <Text className="author">{notice.user.realName || "관리자"}</Text>
                  <DateWrapper>
                    <Text className="date">{notice.createdAt.toString().split("T")[0]}</Text>
                    <Text className="date">{notice.createdAt.toString().split("T")[1].split(".")[0]}</Text>
                  </DateWrapper>
                </NoticeItem>
              ))
            ) : (
              <Text>등록된 공지가 없습니다.</Text>
            )}
          </NoticesWrapper>
        </Wrapper>
      </Flex>
    </Container>
  );
}

export default NoticeList;

const Container = styled.div`
  width: 100%;
`;

const Flex = styled.div``;

const TitleWrapper = styled.div`
  margin: 0 6px;
  padding: 0 6px;
  display: flex;
  align-items: center;
  height: 36px;
  border-bottom: solid 2px ${({ theme }) => theme.colors.blue2};
`;

const Title = styled.h1`
  font-size: 1.4em;
`;

const Wrapper = styled.div``;

const NoticesWrapper = styled.div`
  padding: 10px 8px;
`;

const Text = styled.p`
  &.index {
    width: 28px;
    text-align: center;
    color: ${({ theme }) => theme.colors.gray2};
  }
  &.title {
    width: 36%;
    text-align: start;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &.author {
    width: 15%;
    text-align: start;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &.date {
    color: ${({ theme }) => theme.colors.gray2};
  }
`;
const DateWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

const NoticeItem = styled.div`
  height: 32px;
  padding: 6px;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
