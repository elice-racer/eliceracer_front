import "./App.css";
import { paths } from "./utils/path";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { IntroLayout, Layout } from "./layout/Layout";
import { AdminRouter } from "./routes/AdminRouter";

// hooks
import { useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";

//router
import { ProtectedRoute } from "./routes/ProtectedRoute";

// page
import Intro from "./pages/intro/Intro.page";
import Login from "./pages/login/LogIn.page";

import CreateAdmin from "./pages/login/CreateAdmin.Page";
import CreateAccount from "./pages/login/CreateAccount.page";

import FindId from "./pages/login/FindId.page";
import FindPW from "./pages/login/FindPW.page";

import Home from "./pages/home/Home.page";
import ChatList from "./pages/chat/ChatList.page";
import Menu from "./pages/menu/Menu.page";
import MyPage from "./pages/mypage/MyPage.page";
import Settings from "./pages/settings/Settings.page";

// 관리자 page
import AdminMain from "./pages/admin/adminMain/AdminMain.page";
import AdminAddFile from "./pages/admin/manageUsers/AdminAddFile.page";
import AdminSearchUser from "./pages/admin/manageUsers/AdminSearchUser.page";

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
import { useRecoilState } from "recoil";
import { loadingAtom } from "./recoil/LoadingAtom";
import { tokenAtom } from "./recoil/TokenAtom";

const router = createBrowserRouter([
  {
    path: "/hello",
    element: <IntroLayout />,
    children: [
      { path: paths.LOGIN, element: <Login /> },
      { path: paths.INTRO, element: <Intro /> },
      { path: paths.CREATE_USER, element: <CreateAccount /> },
      { path: paths.CREATE_ADMIN, element: <CreateAdmin /> },
      { path: paths.FIND_ID, element: <FindId /> },
      { path: paths.FIND_PW, element: <FindPW /> },
    ],
  },
  {
    path: "",
    element: <ProtectedRoute element={<Layout />} />,
    children: [
      { path: paths.HOME, element: <Home /> },
      { path: paths.CHAT_LIST, element: <ChatList /> },
      { path: paths.CHAT_ROOM, element: <ChatList /> },
      { path: paths.USERS_PAGE, element: <ChatList /> },
      { path: paths.SETTINGS, element: <Settings /> },
    ],
  },
  {
    path: "/user",
    element: <ProtectedRoute element={<Layout />} />,
    children: [
      { path: paths.MENU, element: <Menu /> },
      { path: paths.MYPAGE, element: <MyPage /> },
      { path: paths.OFFICE_HOUR_SCHEDULE, element: <MyPage /> },
      { path: paths.MY_ALERT, element: <MyPage /> },
      { path: paths.MY_PROJECT_LIST, element: <MyPage /> },
      { path: paths.SETTINGS, element: <Settings /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminRouter />,
    children: [
      { path: paths.ADMIN, element: <AdminMain /> },

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
    ],
  },
]);

function App() {
  const [isLoading, setLoading] = useRecoilState(loadingAtom);
  const [, setToken] = useRecoilState(tokenAtom);

  const init = async () => {
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const access_token = localStorage.getItem("userToken");
    setToken(access_token);
  }, []);

  return (
    <GlobalThemeProvider>
      {isLoading && <LoadingScreen />}
      <RouterProvider router={router} />
    </GlobalThemeProvider>
  );
}

export default App;
