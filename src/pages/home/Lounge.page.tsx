import styled from "styled-components";
import UsersList from "../chat/components/UsersList";
import { paths } from "../../utils/path";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserAtom } from "../../recoil/UserAtom";
import { useEffect, useState } from "react";
import { AxiosChat, Chats } from "../../servies/chat";
import { AxiosUser, UsersInfo } from "../../servies/user";
import UrlDashboard from "./components/UrlDashboard";
import { AxiosProject, ProjectInfo } from "../../servies/projects";
import { loadingAtom } from "../../recoil/LoadingAtom";
import MiniProfileModal from "../chat/components/MiniProfileModal";
import { AxiosOffieHour, OfficehourProps } from "../../servies/officehour";

import Button from "../../components/commons/Button";
import OfficeHourWeekly from "../../components/officehour/OfficehourWeekly";

function Lounge() {
  const navigate = useNavigate();
  const myInfo = useRecoilValue(currentUserAtom);

  const [userInfo, setUsetInfo] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setLoading = useSetRecoilState(loadingAtom);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<UsersInfo[]>([]);
  const [_chatsList, setChatList] = useState<Chats[]>();
  const [projectsInfo, setProjectsInfo] = useState<ProjectInfo[]>([]);

  const [searchUser, setSearchUser] = useState("");

  const [officeHours, setOfficeHours] = useState<OfficehourProps[]>([]);

  /** 미니프로필창 열기 */
  const handleOpenMiniProfile = (userId: string | null) => {
    if (!userId) return alert("유저 프로필을 확인할 수 없습니다.");
    fetchUserInfo(userId);
    setIsModalOpen(true);
  };

  /** 전체 오피스아워 조회 */
  const fetchOfficehourProject = async () => {
    try {
      const res = await AxiosOffieHour.getProjectAllOfficehour("ab98d368-a71a-48da-9ce9-6382042a4686");
      if (res.status === 200) {
        setOfficeHours(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  /** 팀 오피스아워 조회 */
  const fetchOfficehourTeams = async () => {
    try {
      const res = await AxiosOffieHour.getTeamOfficehour("a13124e8-0563-4f93-80f9-3e13af0f7c72");
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  /** 유저 미니프로필 조회 */
  const fetchUserInfo = async (id: string) => {
    try {
      const res = await AxiosUser.getUsersPage(id);
      if (res.statusCode === 200) setUsetInfo(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  /** 프로젝트 조회 */
  const fetchGetProjectIdInfo = async () => {
    setLoading(true);
    try {
      if (!myInfo?.track?.cardinalNo) return;
      const { trackName, cardinalNo } = myInfo?.track;
      const res = await AxiosProject.getCardinalsProjects({ trackName, cardinalNo });
      if (res.statusCode === 200) {
        if (res.data) setProjectsInfo(res.data);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  /** 유저 리스트 조회 */
  const fetchGetUsersList = async () => {
    try {
      const res = await AxiosUser.getChatUsersList();
      if (res.status === 200) setUsers(res.data.data);
    } catch (e: any) {
      console.error(e);
      setError(e.response.data.message);
    }
  };

  const fetchSearchUserList = async () => {
    try {
      const res = await AxiosUser.getSearchUser(searchUser);

      if (res.status === 200) {
        setUsers(res.data.data);
      }
    } catch (e: any) {
      console.log(e.response);
    }
  };

  /** 채팅 목록 조회 */
  const fetchGetChatList = async () => {
    setLoading(true);
    try {
      const res = await AxiosChat.getChats();
      if (res.statusCode === 200) setChatList(res.data);
      setLoading(false);
    } catch (e: any) {
      console.error(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchUser.length === 0) {
      fetchGetUsersList();
    }
  }, [searchUser]);

  useEffect(() => {
    fetchGetChatList();
    fetchGetProjectIdInfo();
    fetchOfficehourProject();
    fetchOfficehourTeams();
    if (myInfo?.role === "RACER") fetchGetUsersList();
  }, []);

  useEffect(() => {
    if (myInfo?.role === "RACER") fetchGetUsersList();
    // todo 관리자, 코치 채팅룸 조회 api 연결
  }, [myInfo?.role]);

  return (
    <>
      <MiniProfileModal isModalOpen={isModalOpen} userData={userInfo} onClose={() => setIsModalOpen(false)} />

      <Container>
        <Section>
          <Button onClick={() => navigate(paths.CHAT_HOME)} className="chat-home">
            <Text>채팅홈 바로가기</Text>
          </Button>
          <UrlDashboard projectUrls={projectsInfo} />
          <OfficeHourWeekly officehours={officeHours} />
        </Section>
        <Section>
          <TitleWrapper>
            <Title>Team Elice</Title>
            <SubItemWrapper>
              <Input
                type="text"
                placeholder="유저를 검색해주세요"
                value={searchUser}
                onChange={e => setSearchUser(e.target.value)}
                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    fetchSearchUserList();
                  }
                }}
              />
              <SearchIcon onClick={fetchSearchUserList}>🔎</SearchIcon>
            </SubItemWrapper>
          </TitleWrapper>
          <UsersList users={users} myInfo={myInfo} error={error} onOpenMiniProfile={handleOpenMiniProfile} />
        </Section>
      </Container>
    </>
  );
}

export default Lounge;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 12px;

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
  }

  padding: 0 24px;
`;

const Section = styled.div`
  width: 100%;

  .chat-home {
    width: 100%;
    height: 48px !important;

    margin-bottom: 12px;
  }
`;

// const Button2 = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   height: 48px;
//   background-color: ${({ theme }) => theme.colors.purple1};
//   padding: 3px 5px;
//   margin: 6px 0;
//   border-radius: 8px;
//   cursor: pointer;
//   &:hover {
//     color: #fff;
//     background-color: ${({ theme }) => theme.colors.purple2};
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   }
// `;

const Text = styled.p`
  text-align: center;
  font-size: 1.2em;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray3};
`;

const TitleWrapper = styled.div`
  padding: 2px 12px;
  align-items: center;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  margin-bottom: 24px;
`;

const SubItemWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;

  border: 1px solid ${({ theme }) => theme.colors.gray1};

  height: 36px;
`;
const Title = styled.h1`
  color: ${({ theme }) => theme.colors.gray2};
`;

const SearchIcon = styled.p`
  position: absolute;
  top: 50%;
  right: 12px;

  transform: translateY(-50%);
  font-size: 14px;

  cursor: pointer;
`;
