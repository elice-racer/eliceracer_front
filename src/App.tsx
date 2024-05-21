import "./App.css";
import { paths } from "./utils/path";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { IntroLayout, Layout } from "./layout/Layout";

// hooks
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";

// page
import { ProtectedRoute } from "./routes/ProtectedRoute";
import Intro from "./pages/intro/Intro.page";
import CreateAdmin from "./pages/login/CreateAdmin.Page";
import Login from "./pages/login/LogIn.page";
import Home from "./pages/home/Home.page";
import CreateAccount from "./pages/login/CreateAccount.page";

// styled
import GlobalThemeProvider from "./styles/GlobalThemeProvider";
import { useRecoilState } from "recoil";
import { loadingAtom } from "./recoil/LoadingAtom";

const router = createBrowserRouter([
  {
    path: "/hello",
    element: <IntroLayout />,
    children: [
      { path: paths.LOGIN, element: <Login /> },
      { path: paths.INTRO, element: <Intro /> },
      { path: paths.CREATE_USER, element: <CreateAccount /> },
      { path: paths.CREATE_ADMIN, element: <CreateAdmin /> },
    ],
  },
  {
    path: "",
    element: <Layout />,
    children: [{ path: paths.HOME, element: <ProtectedRoute element={<Home />} /> }],
  },
]);

function App() {
  // recoil
  const [isLoading, setLoading] = useRecoilState(loadingAtom);

  const init = async () => {
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    localStorage.getItem("user");
  }, []);

  return (
    <GlobalThemeProvider>
      {isLoading && <LoadingScreen />}
      <RouterProvider router={router} />
    </GlobalThemeProvider>
  );
}

export default App;
