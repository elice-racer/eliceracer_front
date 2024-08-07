import "./App.css";
import "./utils/fcm.js";

import { paths } from "./utils/path";

import { SocketContext, socket, socketConfig } from "./context/SocketContext";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AdminRoute } from "./routes/AdminRoute";

// hooks
import { useEffect } from "react";

// common components
import LoadingScreen from "./components/commons/Loading";
import Snackbar from "./components/commons/Snackbar";

//router
import { ProtectedRoute } from "./routes/ProtectedRoute";

// page
import Intro from "./pages/intro/Intro.page";
import Login from "./pages/login/LogIn.page";

import CreateAdmin from "./pages/login/CreateAdmin.Page";
import CreateAccount from "./pages/login/CreateAccount.page";

import FindId from "./pages/login/FindId.page";
import FindPW from "./pages/login/FindPW.page";

import Lounge from "./pages/home/Lounge.page";
import ChatHome from "./pages/chat/ChatHome.page";
import MenuHome from "./pages/menu/MenuHome.page";
import MyPage from "./pages/profile/MyPage.page";
import OfficeHour from "./pages/officeHour/OfficeHour.page";
import Settings from "./pages/settings/Settings.page";

// 관리자 page
import AdminMain from "./pages/admin/adminMain/AdminMain.page";
import AdminAddFile from "./pages/admin/administrateUsers/AdminAddFile.page.js";
import AdminSearchUser from "./pages/admin/administrateUsers/AdminSearchUser.page.js";

// 관리자 공지 page
import AdminNoticeList from "./pages/admin/adminNotice/AdminNoticeList.page";
import AdminNoticeId from "./pages/admin/adminNotice/AdminNoticeId.page";
import AdminEditNotice from "./pages/admin/adminNotice/AdminEditNotice.page";
import AdminAddNotice from "./pages/admin/adminNotice/AdminAddNotice.page";

import AdminSettingsChat from "./pages/admin/AdminSettingsChat";

import AdminOfficeHour from "./pages/admin/adminOfficeHour/AdminOfficeHour.page";
import AdminAlert from "./pages/admin/AdminAlert.page";
import AdminProject from "./pages/admin/AdminProject.page";

// styled
import GlobalThemeProvider from "./styles/GlobalThemeProvider";

// recoil
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { loadingAtom } from "./recoil/LoadingAtom";
import { tokenAtom } from "./recoil/TokenAtom";
import { snackbarAtom } from "./recoil/SnackbarAtom";

// page
import MyAlert from "./pages/alert/MyAlert.Page";
import AboutProjects from "./pages/projects/AboutProjects.page";
import UsersPage from "./pages/profile/UsersPage.page";
import ChatRoom from "./pages/chat/ChatRoom.page";
import NoticeList from "./pages/notice/NoticeList.page";
import EditMyPage from "./pages/profile/EditMyPage.page";
import BasicRoute from "./routes/BasicRoute";
import Notfound from "./pages/404/Notfound.page";
import SuccessCreateUsers from "./pages/login/SuccessCreateUsers.page";
import AdminProjectDetail from "./pages/admin/AdminProjectDetail.page";
import SuccessAuthEmail from "./pages/redirects/SuccessAuthEmail.page";
import AdministrateTracks from "./pages/admin/administrateTracks/AdministrateTracks.page.js";
import DevInfo from "./pages/DevInfo.page.js";

const router = createBrowserRouter([
  { path: "", element: <DevInfo /> },
  {
    path: "",
    element: <ProtectedRoute />,
    children: [
      { path: paths.HOME, element: <Lounge /> },
      { path: paths.CHAT_HOME, element: <ChatHome /> },
      { path: paths.CHAT_ROOM, element: <ChatRoom /> },
      { path: paths.USERS_PAGE_ID, element: <UsersPage /> },
    ],
  },
  {
    path: "/auth",
    element: <BasicRoute />,
    children: [
      { path: paths.LOGIN, element: <Login /> },
      { path: paths.INTRO, element: <Intro /> },
      { path: paths.CREATE_USER, element: <CreateAccount /> },
      { path: paths.CREATE_ADMIN, element: <CreateAdmin /> },
      { path: paths.FIND_ID, element: <FindId /> },
      { path: paths.FIND_PW, element: <FindPW /> },
      { path: paths.SUCCESS_USER, element: <SuccessCreateUsers /> },
      { path: paths.SUCCESS_AUTH_EMAIL, element: <SuccessAuthEmail /> },
    ],
  },
  {
    path: "/user",
    element: <ProtectedRoute />,
    children: [
      { path: paths.MENU, element: <MenuHome /> },
      { path: paths.MYPAGE, element: <MyPage /> },
      { path: paths.EDIT_MYPAGE, element: <EditMyPage /> },
      { path: paths.NOTICE_LIST, element: <NoticeList /> },
      { path: paths.OFFICE_HOUR_SCHEDULE, element: <OfficeHour /> },
      { path: paths.MY_ALERT, element: <MyAlert /> },
      { path: paths.MY_PROJECT_LIST, element: <AboutProjects /> },
      { path: paths.SETTINGS, element: <Settings /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoute />,
    children: [
      { path: paths.ADMIN, element: <AdminMain /> },
      { path: paths.TRACKS_SETTINGS, element: <AdministrateTracks /> },
      { path: paths.ADD_USERS, element: <AdminAddFile /> },
      { path: paths.ADMIN_SEARCH_USERS, element: <AdminSearchUser /> },

      { path: paths.ADMIN_SETTINGS_CHAT, element: <AdminSettingsChat /> },

      { path: paths.ADMIN_NOTICE_LIST, element: <AdminNoticeList /> },
      { path: paths.ADMIN_NOTICE_ID, element: <AdminNoticeId /> },
      { path: paths.ADMIN_ADD_NOTICE, element: <AdminAddNotice /> },
      { path: paths.ADMIN_UPDATE_NOTICE, element: <AdminEditNotice /> },

      { path: paths.OFFICE_HOUR, element: <AdminOfficeHour /> },

      { path: paths.ALERT, element: <AdminAlert /> },

      { path: paths.ADMIN_PROJECTS, element: <AdminProject /> },
      { path: paths.ADMIN_PROJECTS_DETAIL, element: <AdminProjectDetail /> },
      { path: paths.UPDATE_OFFICE_HOUR, element: <AdminOfficeHour /> },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

function App() {
  console.log("------현재 업데이트 기간입니다.-----");
  const setToken = useSetRecoilState(tokenAtom);
  const [isLoading, setLoading] = useRecoilState(loadingAtom);

  const snackbar = useRecoilValue(snackbarAtom);

  useEffect(() => {
    socketConfig();

    return () => {
      socket.disconnect();
      setLoading(false);
    };
  }, []);

  useEffect(() => {
    const access_token = localStorage.getItem("userToken");
    setToken(access_token);
  }, []);

  return (
    <GlobalThemeProvider>
      <SocketContext.Provider value={socket}>
        {isLoading && <LoadingScreen isLoading={isLoading} onClose={() => setLoading(false)} />}
        <RouterProvider router={router} />
        <Snackbar open={snackbar.open} message={snackbar.message} />
      </SocketContext.Provider>
    </GlobalThemeProvider>
  );
}

export default App;
