import styled from "styled-components";
import UsersList from "../chat/components/UsersList";
import { paths } from "../../utils/path";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { useEffect, useState } from "react";
import { AxiosChat, Chats } from "../../services/chat";
import { AxiosUser, ChatRoomUsers, UsersPageInfo } from "../../services/user";
import UrlDashboard from "./components/UrlDashboard";
import { AxiosProject, ProjectInfo } from "../../services/projects";
import { loadingAtom } from "../../recoil/LoadingAtom";
import MiniProfileModal from "../chat/components/MiniProfileModal";
import { AxiosOffieHour, OfficehourProps } from "../../services/officehour";

import Button from "../../components/commons/Button";
import OfficeHourWeekly from "../../components/officehour/OfficehourWeekly";
import { currentUserAtom } from "../../recoil/UserAtom";

function Lounge() {
  const navigate = useNavigate();
  const setLoading = useSetRecoilState(loadingAtom);
  const myInfo = useRecoilValue(currentUserAtom);
  const [error, setError] = useState("");

  /** 미니 프로필 */
  const [miniProfile, setMiniProfile] = useState<UsersPageInfo>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatNameModalOpen, setChatNameModalOpen] = useState(false);

  /** 친구 목록 */
  const [users, setUsers] = useState<ChatRoomUsers[]>([]);

  /** 채팅 리스트 */
  const [_chatsList, setChatList] = useState<Chats[]>();
  const [projectsInfo, setProjectsInfo] = useState<ProjectInfo[]>([]);
  const [projectId, setProjectId] = useState<string>("decdcebb-2039-417c-9aca-3a5a381b1013");
  const [searchUser, setSearchUser] = useState("");

  const [officeHours, setOfficeHours] = useState<OfficehourProps[]>([]);

  /** 미니프로필창 열기 */
  const handleOpenMiniProfile = (userId: string | null) => {
    if (!userId) return alert("유저 프로필을 확인할 수 없습니다.");
    fetchUserInfo(userId);
    setIsModalOpen(true);
  };

  /** 유저 미니프로필 조회 */
  const fetchUserInfo = async (id: string) => {
    try {
      const res = await AxiosUser.getUsersPage(id);
      if (res.statusCode === 200) setMiniProfile(res.data);
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
      console.log(res);
      if (res.statusCode === 200) {
        if (res.data) {
          setProjectsInfo(res.data);
          setProjectId(res.data[0].id);
        }
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.error(e);
    }
  };

  /** 전체 오피스아워 조회 */
  const fetchOfficehourProject = async () => {
    if (!projectId) return;
    try {
      const res = await AxiosOffieHour.getProjectAllOfficehour(projectId);
      console.log(res);
      if (res.status === 200) setOfficeHours(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  /** 유저 리스트 조회 */
  const fetchGetUsersList = async () => {
    try {
      const res = await AxiosUser.getChatUsersList();
      if (res.statusCode === 200) setUsers(res.data || []);
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

  /** 유저간 채팅 시작 */
  const handleStartUsersChat = async (userId: string, chatName: string) => {
    try {
      const res = await AxiosChat.createUsersChat({ userIds: [userId], chatName: chatName });

      if (res.status === 201) {
        alert(`채팅방이 생성되었습니다! `);
        setIsModalOpen(false);
        fetchGetChatList();
        navigate(`${paths.CHAT_HOME}/${res.data.data.id}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setChatNameModalOpen(false);
  };

  const handleCloseChatNameModal = () => {
    setChatNameModalOpen(false);
  };
  const handleCreateChat = () => {
    if (!miniProfile) return;
    if (chatNameInput.trim() === "") return;
    if (chatNameInput.length >= 15) alert("채팅방 이름이 너무 깁니다.");

    setChatNameModalOpen(false);

    if (handleStartUsersChat && miniProfile.id) {
      handleStartUsersChat(miniProfile.id, chatNameInput);
      setChatNameInput("");
    }
  };
  const [chatNameInput, setChatNameInput] = useState("");
  const handleChageChatNameInput = (e: any) => setChatNameInput(e.target.value);
  useEffect(() => {
    if (searchUser.length === 0) {
      if (myInfo?.role === "RACER") fetchGetUsersList();
    }
  }, [searchUser]);

  useEffect(() => {
    fetchGetChatList();
    fetchOfficehourProject();
    if (myInfo?.role === "RACER") fetchGetUsersList();
  }, []);

  useEffect(() => {
    fetchGetProjectIdInfo();
  }, []);

  useEffect(() => {
    if (myInfo?.role === "RACER") fetchGetUsersList();
  }, [myInfo?.role]);

  return (
    <>
      <MiniProfileModal
        isModalOpen={isModalOpen}
        chatNameModalOpen={chatNameModalOpen}
        onOpenChatName={() => setChatNameModalOpen(true)}
        chatNameInput={chatNameInput}
        onChagneInput={handleChageChatNameInput}
        onClose={handleCloseModal}
        userdata={miniProfile}
        onCreateChat={handleCreateChat}
        onCloseChatName={handleCloseChatNameModal}
      />

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
