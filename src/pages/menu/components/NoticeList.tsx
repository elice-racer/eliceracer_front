import styled from "styled-components";
import { Notice } from "../../../servies/notice";
import NoticeDetailModal from "./NoticeDetailModal";
import { useState, useRef, useEffect } from "react";
import EmptyImage from "../../../components/commons/EmptyImage";

interface NoticesProps {
  notices: Notice[];
  fetchPagination: () => void;
}
function NoticeList({ notices, fetchPagination }: NoticesProps) {
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);

  const [noticeId, setNoticeId] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);

  const noticesWrapperRef = useRef<HTMLDivElement>(null);

  const handleClickNoticeItem = (id: string) => {
    setNoticeId(id);
    setIsNoticeModalOpen(true);
  };

  const handleCloseModal = () => {
    setNoticeId(null);
    setIsNoticeModalOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchPagination();
        }
      },
      {
        root: noticesWrapperRef.current,
        threshold: 0.5,
      }
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, []);
  return (
    <Container>
      <Flex>
        <TitleWrapper>
          <Title>공지사항🌍</Title>
        </TitleWrapper>
        <Wrapper>
          <NoticesWrapper ref={noticesWrapperRef}>
            {notices.length === 0 ? (
              <EmptyWrapper>
                <EmptyImage />
                <Text>등록된 공지가 없습니다.</Text>
              </EmptyWrapper>
            ) : (
              <>
                {notices.map((notice: Notice, index) => (
                  <NoticeItem key={notice.id} onClick={() => handleClickNoticeItem(notice.id)}>
                    <Text className="index">{index + 1}</Text>
                    <Text className="title">{notice.title}</Text>
                    <Text className="author">{notice.user.realName || "관리자"}</Text>
                    <DateWrapper>
                      <Text className="date">{notice.createdAt.toString().split("T")[0]}</Text>
                      <Text className="date">{notice.createdAt.toString().split("T")[1].split(".")[0]}</Text>
                    </DateWrapper>
                  </NoticeItem>
                ))}
              </>
            )}
            <ScrollBottom ref={bottomRef} />
          </NoticesWrapper>
        </Wrapper>
      </Flex>
      <NoticeDetailModal isOpen={isNoticeModalOpen} onClose={handleCloseModal} noticeId={noticeId} />
    </Container>
  );
}

export default NoticeList;

const EmptyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  width: 100%;
`;

const ScrollBottom = styled.div`
  width: 100%;
  height: 2px;

  background-color: blue;
`;

const Flex = styled.div``;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 36px;

  background-color: ${({ theme }) => theme.colors.purple1};
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  padding-left: 12px;
`;

const Wrapper = styled.div``;

const NoticesWrapper = styled.div`
  padding: 10px 8px;

  height: 100px;

  overflow-y: scroll;

  margin-bottom: 24px;

  border: 1px solid red;
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
