import "./App.css";
import { paths } from "./utils/path";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/home/Home.page";
import LogIn from "./routes/login/LogIn.page";
import CreateAccount from "./routes/login/CreateAccount.page";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
const router = createBrowserRouter([
  {
    path: paths.HOME,
    element: <Layout />,
    children: [{ path: "", element: <Home /> }],
  },
  { path: "/login", element: <LogIn /> },
  { path: "/create-account", element: <CreateAccount /> },
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
    background-color:  black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }
`;
