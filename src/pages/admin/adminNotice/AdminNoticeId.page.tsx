import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AxiosNotice, Notice } from "../../../servies/notice";
import { useEffect, useState } from "react";
import { paths } from "../../../utils/path";

function AdminNoticeId() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [notice, setNotice] = useState<Notice | null>();
  const fetchGetNoticeId = async () => {
    try {
      const noticeId = id;
      const res = await AxiosNotice.getNoticeId(noticeId);
      if (res.statusCode === 200) setNotice(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchDeleteNotice = async () => {
    try {
      const noticeId = id;
      const res = await AxiosNotice.deleteNotice(noticeId);
      if (res.data.statusCode === 200) {
        alert("삭제되었습니다");
        navigate(paths.ADMIN_NOTICE_LIST);
      }
    } catch (e: any) {
      if (e.response.status === 403) alert(e.response.data.message);
      console.error(e);
    }
  };

  useEffect(() => {
    fetchGetNoticeId();
  }, []);

  return (
    <Container>
      <NoticeWrapper>
        <Header>
          <Link to={`${paths.ADMIN_NOTICE_LIST}`}>
            <Title>공지</Title>
          </Link>
          <Link to={`${paths.ADMIN_NOTICE_LIST}/update/${id}`}>
            <AddBtn>공지 수정</AddBtn>
          </Link>
          <DelBtn onClick={() => fetchDeleteNotice()}>삭제</DelBtn>
        </Header>
        <TitleWrapper>
          <Wrapper>
            <Text className="title">{notice?.title}</Text>
            <Text className="author">{notice?.user.realName ? notice?.user.realName : "관리자"}</Text>
          </Wrapper>
          <Wrapper>
            <Flex>
              <Text className="date">작성일 || {notice?.createdAt.toString().split("T")[0]}</Text>
              <Text className="date">{notice?.createdAt.toString().split("T")[1].split(".")[0]}</Text>
            </Flex>
            <Flex>
              <Text className="date">수정일 || {notice?.updatedAt.toString().split("T")[0]}</Text>
              <Text className="date">{notice?.updatedAt.toString().split("T")[1].split(".")[0]}</Text>
            </Flex>
          </Wrapper>
        </TitleWrapper>

        <Wrapper>
          <ContentWrapper>
            <Text>{notice?.content}</Text>
          </ContentWrapper>
        </Wrapper>
      </NoticeWrapper>
    </Container>
  );
}

export default AdminNoticeId;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const NoticeWrapper = styled.div`
  width: 80%;
`;
const Header = styled.div`
  display: flex;
  border-bottom: solid 2px ${({ theme }) => theme.colors.purple2};
  align-items: center;
  padding: 10px;
  gap: 12px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  display: inline-block;
  white-space: normal;
  overflow: hidden;
  padding: 12px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.purple1};
`;

const Wrapper = styled.div``;
const Flex = styled.div`
  display: flex;
  gap: 6px;
`;

const ContentWrapper = styled.div`
  padding: 12px;
`;

const Title = styled.h1`
  font-size: 1.4em;
  &:hover {
    color: ${({ theme }) => theme.colors.purple3};
  }
`;

const Text = styled.p`
  &.index {
    width: 28px;
    text-align: center;
  }
  &.title {
    width: 100%;
    display: inline-block;
    font-size: 1.4em;
    text-align: start;
    white-space: normal;
    text-overflow: ellipsis;
  }
  &.author {
    text-align: start;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &.date {
    color: ${({ theme }) => theme.colors.gray2};
  }
`;

const AddBtn = styled.div`
  color: ${({ theme }) => theme.colors.purple3};
  text-align: center;
  padding: 2px 5px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.purple2};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.purple2};
    color: #fff;
  }
`;

const DelBtn = styled.div`
  color: tomato;
  text-align: center;
  padding: 2px 5px;
  border-radius: 6px;
  border: 1px solid tomato;
  &:hover {
    background-color: tomato;
    color: #fff;
  }
`;
