import styled from "styled-components";
import ChatList from "../chat/components/ChatList";
import UsersList from "../chat/components/UsersList";
import { paths } from "../../utils/path";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { currentUserAtom } from "../../recoil/UserAtom";
import { useEffect, useState } from "react";
import { AxiosChat, Chats } from "../../servies/chat";
import { AxiosUser } from "../../servies/user";
import InfoBoard from "./components/InfoBoard";
import { AxiosProject, ProjectInfo } from "../../servies/projects";

function Home() {
  const navigate = useNavigate();
  const myInfo = useRecoilValue(currentUserAtom);

  const [error, setError] = useState("");
  const [users, setUsers] = useState();
  const [chatsList, setChatList] = useState<Chats[]>();

  const [projectsInfo, setProjectsInfo] = useState<ProjectInfo[]>([]);

  /** 프로젝트 조회 */
  const fetchGetProjectIdInfo = async () => {
    try {
      if (!myInfo?.track?.cardinalNo) return;
      const { trackName, cardinalNo } = myInfo?.track;
      const res = await AxiosProject.getCardinalsProjects({ trackName, cardinalNo });
      if (res.statusCode === 200) {
        console.log(res);
        if (res.data) setProjectsInfo(res.data);
      }
    } catch (e) {
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
    try {
      const res = await AxiosChat.getChats();
      if (res.statusCode === 200) setChatList(res.data);
    } catch (e: any) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchGetChatList();
    fetchGetProjectIdInfo();
  }, []);

  useEffect(() => {
    if (myInfo?.role === "RACER") fetchGetUsersList();
    // todo 관리자, 코치 채팅룸 조회 api 연결
  }, [myInfo?.role]);

  return (
    <Container>
      <Section>
        <UsersList users={users} myInfo={myInfo} error={error} />
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
