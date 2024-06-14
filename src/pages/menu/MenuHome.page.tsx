import { useEffect, useState } from "react";

import styled from "styled-components";

// components
import UsersMiniProfile from "../../components/user/UsersMiniProfile";
import NoticeList from "./components/NoticeList";
import MyTrackInfo from "./components/MyTrackInfo";
import OfficeHourWeekly from "../../components/officehour/OfficehourWeekly";
import CheckedVersion from "../settings/components/CheckedVersion";

// recoil
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserAtom } from "../../recoil/UserAtom";

// api
import { AxiosNotice, Notice } from "../../services/notice";
import { AxiosUser, UsersPageInfo } from "../../services/user";
import { loadingAtom } from "../../recoil/LoadingAtom";
import { AxiosProject } from "../../services/projects";
import { AxiosOffieHour, OfficehourProps } from "../../services/officehour";

// todo 오늘날짜 기준으로 올라온 공지면 new 배찌 달아주기
function MenuHome() {
  const setLoading = useSetRecoilState(loadingAtom);

  const userInfo = useRecoilValue(currentUserAtom);
  const [_userId, setUserId] = useState<string | null>(null);
  const [userdata, setUserdata] = useState<UsersPageInfo>();

  // todo 노션 받으면 여기 넣기~~
  const myTrackInfo = {
    track: "AI 11",
    notion: "https://aitrack.elice.io/tracks/4879/info",
  };
  const myProjectInfo = {
    gitlab: "https://kdt-gitlab.elice.io/ai_track/class_11/web_project",
    projectNotion: "https://www.notion.so/elice-track/I-9c6f09a0ffc54218a7b0f8d6415a790f",
    teamNotion: "https://www.notion.so/elice-track/I-600f6f4dbb9144149a58dba9e18ef6e7",
  };
  const [quote, setQuote] = useState({ quote: "", author: "" });
  const [projectId, setProjectId] = useState<string>("decdcebb-2039-417c-9aca-3a5a381b1013");
  const [notices, setNotices] = useState<Notice[]>([]);
  const [officeHours, setOfficeHours] = useState<OfficehourProps[]>([]);

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

  const fetchGetProjectIdInfo = async () => {
    try {
      if (!userInfo?.track?.cardinalNo) return;
      setLoading(true);
      const { trackName, cardinalNo } = userInfo?.track;
      const res = await AxiosProject.getCardinalsProjects({ trackName, cardinalNo });
      if (res.statusCode === 200) {
        if (res.data) {
          setProjectId(res.data[0].id);
          setLoading(false);
        }
        setLoading(false);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
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
      if (!res.data) return;
      if (res.statusCode === 200) setNotices(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  /** 전체 오피스아워 조회 */
  const fetchOfficehourProject = async () => {
    if (!projectId) return setProjectId("decdcebb-2039-417c-9aca-3a5a381b1013");
    try {
      const res = await AxiosOffieHour.getProjectAllOfficehour(projectId);
      if (res.status === 200) setOfficeHours(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchNotices();
    fetchMyPage();
    fetchQuote();
    setLoading(false);
    fetchOfficehourProject();
  }, []);

  useEffect(() => {
    fetchGetProjectIdInfo();
  }, [userInfo]);

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
        <NoticeList notices={notices} fetchPagination={() => {}} />

        <MyTrackInfo myTrackInfo={myTrackInfo} myProjectInfo={myProjectInfo} />
      </MainSection>
      <SideSection>
        <OfficeHourWeekly officehours={officeHours} />

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
