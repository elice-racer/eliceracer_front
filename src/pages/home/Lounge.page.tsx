import styled from "styled-components";
import UsersList from "../chat/components/UsersList";
import { paths } from "../../utils/path";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { useEffect, useState } from "react";
import { AxiosChat } from "../../services/chat";
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

  const [projectsInfo, setProjectsInfo] = useState<ProjectInfo[]>([]);
  const [projectId, setProjectId] = useState<string>("decdcebb-2039-417c-9aca-3a5a381b1013");
  const [searchUser, setSearchUser] = useState("");

  const [officeHours, setOfficeHours] = useState<OfficehourProps[]>([]);
  const [chatNameInput, setChatNameInput] = useState("");

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
    } catch (e: any) {
      setError(e.response.data.message);
      setLoading(false);
    }
  };

  /** 프로젝트 조회 */
  const fetchGetProjectIdInfo = async () => {
    setLoading(true);
    try {
      if (!myInfo) return;
      if (!myInfo.track?.cardinalNo) return;
      const { trackName, cardinalNo } = myInfo?.track;

      const res = await AxiosProject.getCardinalsProjects({ trackName, cardinalNo });
      if (res.statusCode === 200) {
        if (res.data) {
          setProjectsInfo(res.data);
          setProjectId(res.data[0].id);
        }
        setLoading(false);
      }
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      setError(e.response.data.message);
    }
  };

  /** 전체 오피스아워 조회 */
  const fetchOfficehourProject = async () => {
    if (!projectId) return;
    try {
      const res = await AxiosOffieHour.getProjectAllOfficehour(projectId);
      if (res.status === 200) setOfficeHours(res.data);
      setLoading(false);
    } catch (e: any) {
      setError(e.response.data.message);
      setLoading(false);
    }
  };

  /** 유저 리스트 조회 */
  const fetchGetUsersList = async () => {
    try {
      const res = await AxiosUser.getChatUsersList();
      if (res.statusCode === 200) setUsers(res.data || []);
    } catch (e: any) {
      setError(e.response.data.message);
      if (e.response.status === 404) {
        try {
          const res = await AxiosUser.getAllUsers();
          setUsers(res.data || []);
        } catch (e: any) {
          setError(e.response.data.message);
        }
      }
    }
  };

  /** 친구 검색 */
  const fetchSearchUserList = async () => {
    try {
      const res = await AxiosUser.getSearchUsersRealName(searchUser);
      if (res.status === 200) {
        setUsers(res.data.data);
      }
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  /** 유저간 채팅 시작 */
  const handleStartUsersChat = async (userId: string, chatName: string) => {
    try {
      const res = await AxiosChat.createUsersChat({ userIds: [userId], chatName: chatName });
      console.log(res);
      if (res.status === 201) {
        alert(`채팅방이 생성되었습니다! `);
        setIsModalOpen(false);

        navigate(`${paths.CHAT_HOME}/${res.data.data.id}`);
      }
    } catch (e: any) {
      if (e.response.status === 409) {
        alert("이미 생성된 채팅방이 존재합니다.");
      }
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

  const handleChageChatNameInput = (e: any) => setChatNameInput(e.target.value);

  useEffect(() => {
    // 레이서가 아닐 경우 아무것도 없이 검색을 하면 전체 검색 불가
    if (searchUser.length === 0) {
      if (myInfo?.role === "RACER") fetchGetUsersList();
    }
  }, [searchUser]);

  useEffect(() => {
    fetchOfficehourProject();
    if (myInfo?.role === "RACER") {
      fetchGetUsersList();
    }
    if (myInfo?.role !== "RACER") {
      fetchSearchUserList();
    }
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
        <Wrapper>
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
            <UserListWrapper>
              {myInfo && <UsersList users={users} myInfo={myInfo} error={error} onOpenMiniProfile={handleOpenMiniProfile} />}
            </UserListWrapper>
          </Section>
        </Wrapper>
      </Container>
    </>
  );
}

export default Lounge;

const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 0 48px;

  padding-bottom: 48px;

  box-sizing: border-box;

  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
    padding: 0 24px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 24px;
  height: 100%;
  width: 100%;
  @media ${({ theme }) => theme.device.tablet} {
    flex-direction: column;
    padding: 0 24px;
  }
  @media ${({ theme }) => theme.device.mobileL} {
    flex-direction: column;
    padding: 0 24px;
  }
`;

const Section = styled.div`
  width: 100%;

  .chat-home {
    width: 100%;
    height: 48px !important;

    margin-bottom: 12px;
  }
`;

const UserListWrapper = styled.div`
  height: calc(100% - 130px);
  overflow-y: scroll;
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
