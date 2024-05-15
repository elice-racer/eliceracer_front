import "./App.css";
import { paths } from "./utils/path";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home/Home.page";
import LogIn from "./pages/login/LogIn.page";
import CreateAccount from "./pages/login/CreateAccount.page";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Intro from "./pages/intro/Intro.page";
import CreateAdmin from "./pages/login/CreateAdmin.Page";
const router = createBrowserRouter([
  {
    path: paths.HOME,
    element: <Layout />,
    children: [{ path: "", element: <Home /> }],
  },
  { path: "/intro", element: <Intro /> },
  { path: "/login", element: <LogIn /> },
  { path: "/create-account", element: <CreateAccount /> },
  { path: "/create-admin", element: <CreateAdmin /> },
]);
function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </>
  );
}

export default App;

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: #242424;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
`;
