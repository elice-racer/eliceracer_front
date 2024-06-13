import { useEffect, useState } from "react";

import styled from "styled-components";

// components
import UsersMiniProfile from "../../components/user/UsersMiniProfile";
import NoticeList from "./components/NoticeList";
import MyTrackInfo from "./components/MyTrackInfo";
import OfficeHourWeekly from "../../components/officehour/OfficehourWeekly";
import CheckedVersion from "../settings/components/CheckedVersion";

// recoil
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../recoil/UserAtom";

// api
import { AxiosNotice, Notice } from "../../servies/notice";
import { AxiosUser, UsersInfo } from "../../servies/user";

// todo 오늘날짜 기준으로 올라온 공지면 new 배찌 달아주기
function MenuHome() {
  const userInfo = useRecoilValue(currentUserAtom);
  const [_userId, setUserId] = useState<string | null>(null);
  const [userdata, setUserdata] = useState<UsersInfo>();
  const myTrackInfo = "";
  const myProjectInfo = {
    gitlab: "",
    projectNotion: "",
    teamNotion: "",
  };
  const [quote, setQuote] = useState({ quote: "", author: "" });

  const [notices, setNotices] = useState<Notice[]>([]);

  /** 마이페이지 정보 가져오기 */
  const fetchMyPage = async () => {
    if (userInfo) {
      setUserId(userInfo.id);
    }
    try {
      const res = await AxiosUser.getMyPage();
      if (res.statusCode === 200) setUserdata(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  /** 개발자 격언 들고오기 */
  const fetchQuote = async () => {
    try {
      const res = await fetch("/quotes.json");
      const data = await res.json();
      const randomIndex = Math.floor(Math.random() * data.quotes.length);
      setQuote(data.quotes[randomIndex]);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  /** 공지사항 들고오기 */
  const fetchNotices = async () => {
    try {
      const res = await AxiosNotice.getNoticeList();
      console.log(res);
      if (!res.data) return;
      if (res.statusCode === 200) setNotices(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchNotices();
    fetchMyPage();
    fetchQuote();
  }, []);
  return (
    <Container>
      <MainSection>
        <TitleWrapper>
          <Title>{userdata?.realName}님, 환영합니다!</Title>
          <QuotesWrapper>
            <SubTitle>📚 개발자 격언 모음</SubTitle>
            <Text className="info">프로젝트 하다 지칠 때 새로고침해서 읽어보기!</Text>
            <Text>{quote.quote}</Text>
          </QuotesWrapper>
        </TitleWrapper>
        <MyTrackInfo myTrackInfo={myTrackInfo} myProjectInfo={myProjectInfo} />
        <OfficeHourWeekly officehours={[]} />

        {/* <UsersMenu /> */}
      </MainSection>
      <SideSection>
        <NoticeList notices={notices} fetchPagination={() => {}} />
        <CheckedVersion />
      </SideSection>
      <SideSection>
        <UsersMiniProfile userdata={userdata} />
      </SideSection>
    </Container>
  );
}
export default MenuHome;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 6px;

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
  }
`;

const SideSection = styled.div`
  width: 100%;
`;

const MainSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const TitleWrapper = styled.div`
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  height: 140px;
  max-height: 200px;

  border: 1px solid ${({ theme }) => theme.colors.gray1};
`;

const QuotesWrapper = styled.div`
  width: 86%;
  height: 88px;
  max-height: 94px;
`;

const Title = styled.h1`
  font-size: 1.3rem;
`;

const SubTitle = styled.h2`
  font-size: 1.2rem;
`;
const Text = styled.p`
  &.info {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.gray2};
  }
`;
