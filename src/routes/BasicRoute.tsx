import { Outlet } from "react-router-dom";
import styled from "styled-components";
import IntroHeader from "../layout/IntroHeader";

const BasicRoute = () => {
  return (
    <Container>
      <IntroHeader />
      <Outlet />
    </Container>
  );
};

export default BasicRoute;

const Container = styled.div`
  position: relative;
  width: 100dvw;
  height: 100%;
`;
