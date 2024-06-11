import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { paths } from "../../../utils/path";
import { AxiosNotice, Notices } from "../../../servies/notice";
import { useEffect, useState } from "react";

function AdminNoticeList() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<Notices[]>();
  const fetchGetNoticeList = async () => {
    const res = await AxiosNotice.getNoticeList(1, 10);
    if (res.statusCode === 200) {
      setNotices(res.data);
    }
  };

  const handleClickNotice = (id: string | undefined) => {
    navigate(`${paths.ADMIN_NOTICE_LIST}/${id}`);
  };

  useEffect(() => {
    fetchGetNoticeList();
  }, []);

  return (
    <Container>
      <NoticeWrapper>
        <TitleWrapper>
          <Title>공지</Title>
          <Link to={paths.ADMIN_ADD_NOTICE}>
            <AddBtn>공지 등록</AddBtn>
          </Link>
        </TitleWrapper>
        <NoticeListWrapper>
          {notices?.map((notice, index) => (
            <NoticeItem key={notice.id} onClick={() => handleClickNotice(notice.id)}>
              <Text className="index">{index + 1}</Text>
              <Text className="title">{notice.title}</Text>
              <Text className="author">{notice.user.realName || "관리자"}</Text>
              <DateWrapper>
                <Text className="date">{notice.createdAt.toString().split("T")[0]}</Text>
                <Text className="date">{notice.createdAt.toString().split("T")[1].split(".")[0]}</Text>
              </DateWrapper>
            </NoticeItem>
          ))}
        </NoticeListWrapper>
      </NoticeWrapper>
    </Container>
  );
}

export default AdminNoticeList;

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const NoticeWrapper = styled.div`
  width: 60vw;
`;
const TitleWrapper = styled.div`
  display: flex;
  border-bottom: solid 2px ${({ theme }) => theme.colors.purple2};
  align-items: center;
  padding: 10px;
  gap: 12px;
`;

const Title = styled.h1``;

const Text = styled.p`
  &.index {
    width: 28px;
    text-align: center;
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
const AddBtn = styled.div`
  color: ${({ theme }) => theme.colors.purple3};
  text-align: center;
  padding: 2px 5px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.purple2};
`;
const NoticeListWrapper = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 3px;
  flex-direction: column;
`;

const NoticeItem = styled.div`
  padding: 6px;
  display: flex;
  justify-content: space-between;
  gap: 5px;
  cursor: pointer;
`;
