import "./App.css";
import { paths } from "./utils/path";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AdminLayout, IntroLayout, Layout } from "./layout/Layout";

// hooks
import { useEffect } from "react";
import LoadingScreen from "./components/LoadingScreen";

// page
import { ProtectedRoute } from "./routes/ProtectedRoute";
import Intro from "./pages/intro/Intro.page";
import CreateAdmin from "./pages/login/CreateAdmin.Page";
import Login from "./pages/login/LogIn.page";
import Home from "./pages/home/Home.page";
import CreateAccount from "./pages/login/CreateAccount.page";
import ChatList from "./pages/chat/ChatList.page";
import Menu from "./pages/menu/Menu.page";
import MyPage from "./pages/mypage/MyPage.page";
import Settings from "./pages/settings/Settings.page";
import AdminMain from "./pages/admin/adminMain/AdminMain.page";
import TestAddFile from "./pages/admin/manageUsers/TestAddFile.page";

// styled
import GlobalThemeProvider from "./styles/GlobalThemeProvider";
import { useRecoilState } from "recoil";
import { loadingAtom } from "./recoil/LoadingAtom";
import AdminAddNotice from "./pages/admin/adminNotice/AdminAddNotice.page";
import AdminAddFile from "./pages/admin/manageUsers/AdminAddFile.page";
import AdminNotice from "./pages/admin/adminNotice/AdminNotice.page";
import AdminOfficeHour from "./pages/admin/adminOfficeHour/AdminOfficeHour.page";
import AdminAlert from "./pages/admin/AdminAlert.page";
import AdminProject from "./pages/admin/AdminProject.page";
import AdminSearchUser from "./pages/admin/manageUsers/AdminSearchUser.page";
import AdminSettingsChat from "./pages/admin/AdminSettingsChat";
import FindId from "./pages/login/FindId.page";
import FindPW from "./pages/login/FindPW.page";

// recoil

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
    // element: <ProtectedRoute element={<Layout />} />,
    element: <Layout />,
    children: [
      { path: paths.HOME, element: <Home /> },
      { path: paths.CHAT_LIST, element: <ChatList /> },
      { path: paths.CHAT_ROOM, element: <ChatList /> },
      { path: paths.MENU, element: <Menu /> },
      { path: paths.MYPAGE, element: <MyPage /> },
      { path: paths.SETTINGS, element: <Settings /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: paths.ADMIN, element: <AdminMain /> },

      { path: paths.ADD_USERS, element: <AdminAddFile /> },
      { path: "/admin/test", element: <TestAddFile /> },
      { path: paths.ADMIN_SEARCH_USERS, element: <AdminSearchUser /> },

      { path: paths.ADMIN_SETTINGS_CHAT, element: <AdminSettingsChat /> },

      { path: paths.ADMIN_NOTICE_LIST, element: <AdminNotice /> },
      { path: paths.ADMIN_ADD_NOTICE, element: <AdminAddNotice /> },

      { path: paths.OFFICE_HOUR, element: <AdminOfficeHour /> },

      { path: paths.ALERT, element: <AdminAlert /> },

      { path: paths.USERS_PROJECTS, element: <AdminProject /> },
    ],
  },
]);

function App() {
  const [isLoading, setLoading] = useRecoilState(loadingAtom);
  const [token, setToken] = useRecoilState(tokenAtom);

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
