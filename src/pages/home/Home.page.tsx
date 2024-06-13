import styled from "styled-components";
import ChatList from "../chat/components/ChatList";
import UsersList from "../chat/components/UsersList";
import { paths } from "../../utils/path";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentUserAtom } from "../../recoil/UserAtom";
import { useEffect, useState } from "react";
import { AxiosChat, Chats } from "../../servies/chat";
import { AxiosUser } from "../../servies/user";
import InfoBoard from "./components/InfoBoard";
import { AxiosProject, ProjectInfo } from "../../servies/projects";
import { loadingAtom } from "../../recoil/LoadingAtom";
import MiniProfileModal from "../chat/components/MiniProfileModal";
import { AxiosOffieHour } from "../../servies/officehour";

function Home() {
  const navigate = useNavigate();
  const myInfo = useRecoilValue(currentUserAtom);

  const [userInfo, setUsetInfo] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setLoading = useSetRecoilState(loadingAtom);
  const [error, setError] = useState("");
  const [users, setUsers] = useState();
  const [chatsList, setChatList] = useState<Chats[]>();
  const [projectsInfo, setProjectsInfo] = useState<ProjectInfo[]>([]);

  const handleClick = (e: any) => {
    console.dir(e.target.id);

    if (!e.target.id) return alert("유저 프로필을 확인할 수 없습니다.");
    fetchUserInfo(e.target.id);
    setIsModalOpen(true);
  };

  /** 프로젝트 오피스아워 조회 */
  const fetchOfficehourProject = async () => {
    try {
      const res = await AxiosOffieHour.getProjectOfficehour("8ab92d20-9835-4bc8-9f17-1da291343b82");
      console.log(res);
    } catch (e) {
      console.error(e);
    }
  };

  /** 팀 오피스아워 조회 */
  const fetchOfficehourTeams = async () => {
    try {
      const res = await AxiosOffieHour.getTeamOfficehour("f41806f5-aec4-4758-b6ce-3dcbb6e7f59e");
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
      <MiniProfileModal
        isModalOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        userData={userInfo}
      />
      <Container>
        <Section>
          <UsersList users={users} myInfo={myInfo} error={error} onClick={handleClick} />
        </Section>
        <Section>
          <Button onClick={() => navigate(paths.CHAT_HOME)}>
            <Text>채팅홈 바로가기</Text>
          </Button>
          <InfoBoard projectsInfo={projectsInfo} />
        </Section>
        <Section>
          <ChatList chatsList={chatsList} error={error} />
        </Section>
      </Container>
    </>
  );
}

export default Home;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 4px;
`;

const Section = styled.div`
  width: 100%;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 34px;
  background-color: ${({ theme }) => theme.colors.purple1};
  padding: 3px 5px;
  margin: 6px 0;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.purple2};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Text = styled.p`
  text-align: center;
  font-size: 1.2em;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray3};
`;
